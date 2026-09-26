import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import pool from "../config/db.js";

import { sendPasswordResetEmail } from "../services/email.service.js";

//register api

export const register = async (req, res) => {
    try {
        const { first_name, last_name, email, city, mobile, password } = req.body;

        //1.Check required fields

        if (!first_name || !last_name || !email || !city || !mobile || !password) {
            return res.status(400).jason({
                message: "firstname,lastname,email,city,mobile,password are required"
            })
        }

        //2. Check if user already exists 
        const [existingUsers] = await pool.execute(
            "SELECT id from users where email = ?", [email]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({
                message: "Email already registered ",
            });
        }
        //2. Check if user already exists 
        const [existingUsersMobile] = await pool.execute(
            "SELECT id from users where mobile = ?", [mobile]
        );

        if (existingUsersMobile.length > 0) {
            return res.status(409).json({
                message: "Mobile Number already exists ",
            });
        }

        //3. Hash password

        const passwordHash = await bcrypt.hash(password, 12);

        //4. Insert user

        const [result] = await pool.execute(
            `Insert Into users (first_name, last_name,email,city,password_hash,mobile) VALUES(?,?,?,?,?,?)`, [first_name, last_name, email, city, passwordHash, mobile]
        );

        //5 send response 
        return res.status(201).json({
            message: "User registered successfully",
            userId: result.insertId,
        });

    } catch (error) {
        console.error("Registration error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}



//login api

export const login = async (req, res) => {
    try {
        const {
            email,
            password,
            role,
        } = req.body;

        // ----------------------------------------
        // 1. Validate input
        // ----------------------------------------

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        // ----------------------------------------
        // 2. Find user
        // ----------------------------------------

        const [users] = await pool.execute(
            `SELECT
                id,
                first_name,
                last_name,
                email,
                mobile,
                city,
                password_hash,
                role,
                is_verified
             FROM users
             WHERE email = ?`,
            [email.trim()]
        );

        if (users.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const user = users[0];

        // ----------------------------------------
        // 3. Check selected role
        // ----------------------------------------

        if (role && user.role !== role) {
            return res.status(403).json({
                message: `This account is registered as ${user.role}`,
            });
        }

        // ----------------------------------------
        // 4. Email verification
        // ----------------------------------------

        // Enable this when your email verification
        // system is ready.

        // if (!user.is_verified) {
        //     return res.status(403).json({
        //         message: "Please verify your email first",
        //     });
        // }

        // ----------------------------------------
        // 5. Compare password
        // ----------------------------------------

        const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // ----------------------------------------
        // 6. Create access token
        // ----------------------------------------

        const accessToken = jwt.sign(
            {
                userId: user.id,
                role: user.role,
            },
            process.env.JWT_ACCESS_SECRET,
            {
                expiresIn: "15m",
            }
        );

        // ----------------------------------------
        // 7. Create refresh token
        // ----------------------------------------

        const refreshToken = jwt.sign(
            {
                userId: user.id,
            },
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: "7d",
            }
        );

        // ----------------------------------------
        // 8. Hash refresh token
        // ----------------------------------------

        const refreshTokenHash = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");

        // ----------------------------------------
        // 9. Save session
        // ----------------------------------------

        await pool.execute(
            `INSERT INTO sessions
            (
                user_id,
                refresh_token_hash,
                user_agent,
                ip_address,
                expires_at
            )
            VALUES (?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))`,
            [
                user.id,
                refreshTokenHash,
                req.headers["user-agent"] || null,
                req.ip || null,
            ]
        );

        // ----------------------------------------
        // 10. Set refresh token cookie
        // ----------------------------------------

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure:
                process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge:
                7 * 24 * 60 * 60 * 1000,
        });

        // ----------------------------------------
        // 11. Send response
        // ----------------------------------------

        return res.status(200).json({
            message: "Login successful",

            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                mobile: user.mobile,
                city: user.city,
                role: user.role,
            },

            accessToken,
        });

    } catch (error) {
        console.error(
            "Login error:",
            error
        );

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};


/// logout 

export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        // No refresh token means already logged out
        if (!refreshToken) {
            return res.status(200).json({
                message: "Logout successful",
            });
        }

        const refreshTokenHash = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");

        // Revoke this session
        await pool.execute(
            `UPDATE sessions
       SET revoked = TRUE
       WHERE refresh_token_hash = ?`,
            [refreshTokenHash]
        );

        // Remove refresh token cookie
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.status(200).json({
            message: "Logout successful",
        });
    } catch (error) {
        console.error("Logout error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};


///Reset token for forgotpassword 

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required",
            });
        }

        const [users] = await pool.execute(
            `SELECT id, first_name, email
             FROM users
             WHERE email = ?`,
            [email.trim()]
        );

        if (users.length === 0) {
            return res.status(200).json({
                message:
                    "If an account exists with this email, a password reset link has been sent.",
            });
        }

        const user = users[0];

        // Generate random token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // Hash token before storing it
        const tokenHash = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        // Optional: remove previous unused reset tokens
        await pool.execute(
            `DELETE FROM password_resets
             WHERE user_id = ?`,
            [user.id]
        );

        // Store new token
        await pool.execute(
            `INSERT INTO password_resets
             (user_id, token_hash, expires_at)
             VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 15 MINUTE))`,
            [user.id, tokenHash]
        );

        const resetLink =
            `http://localhost:5173/reset-password?token=${resetToken}`;

        // SEND EMAIL
        await sendPasswordResetEmail(
            user.email,
            user.first_name,
            resetLink
        );

        return res.status(200).json({
            message:
                "If an account exists with this email, a password reset link has been sent.",
        });

    } catch (error) {
        console.error("Forgot password error:", error);

        return res.status(500).json({
            message: "Unable to send password reset email",
        });
    }
};

///Reset Password

export const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            return res.status(400).json({
                message: "Token and password are required",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters",
            });
        }

        const tokenHash = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const [resets] = await pool.execute(
            `SELECT id, user_id
             FROM password_resets
             WHERE token_hash = ?
               AND used = FALSE
               AND expires_at > NOW()
             ORDER BY id DESC
             LIMIT 1`,
            [tokenHash]
        );

        if (resets.length === 0) {
            return res.status(400).json({
                message: "Invalid or expired reset link",
            });
        }

        const reset = resets[0];

        const passwordHash = await bcrypt.hash(password, 12);

        await pool.execute(
            `UPDATE users
             SET password_hash = ?
             WHERE id = ?`,
            [passwordHash, reset.user_id]
        );

        // Mark token as used
        await pool.execute(
            `UPDATE password_resets
             SET used = TRUE
             WHERE id = ?`,
            [reset.id]
        );

        return res.status(200).json({
            message: "Password reset successful. Please login again.",
        });

    } catch (error) {
        console.error("Reset password error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};


// get  me 

export const getMe = async (req, res) => {
    try {
        const userId = req.user.userId;

        const [users] = await pool.execute(
            `SELECT
                id,
                first_name,
                last_name,
                email,
                mobile,
                city,
                role,
                is_verified
             FROM users
             WHERE id = ?`,
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            user: users[0]
        });

    } catch (error) {
        console.error("Get Me error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


//Referesh token  Controller

export const refreshToken = async (req, res) => {
    try {
        // ----------------------------------------
        // 1. Get refresh token from cookie
        // ----------------------------------------

        const refreshToken =
            req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                message:
                    "Refresh token not found",
            });
        }

        // ----------------------------------------
        // 2. Verify refresh token JWT
        // ----------------------------------------

        let decoded;

        try {
            decoded = jwt.verify(
                refreshToken,
                process.env.JWT_REFRESH_SECRET
            );
        } catch (error) {
            if (
                error.name ===
                "TokenExpiredError"
            ) {
                res.clearCookie(
                    "refreshToken"
                );

                return res.status(401).json({
                    message:
                        "Refresh token expired",
                    code: "REFRESH_TOKEN_EXPIRED",
                });
            }

            res.clearCookie(
                "refreshToken"
            );

            return res.status(401).json({
                message:
                    "Invalid refresh token",
                code: "INVALID_REFRESH_TOKEN",
            });
        }

        // ----------------------------------------
        // 3. Hash refresh token
        // ----------------------------------------

        const refreshTokenHash =
            crypto
                .createHash("sha256")
                .update(refreshToken)
                .digest("hex");

        // ----------------------------------------
        // 4. Check session in database
        // ----------------------------------------

        const [sessions] =
            await pool.execute(
                `SELECT
                    s.id,
                    s.user_id,
                    s.expires_at,
                    u.role
                 FROM sessions s
                 INNER JOIN users u
                    ON u.id = s.user_id
                 WHERE s.refresh_token_hash = ?
                   AND s.expires_at > NOW()
                 LIMIT 1`,
                [refreshTokenHash]
            );

        if (sessions.length === 0) {
            res.clearCookie(
                "refreshToken"
            );

            return res.status(401).json({
                message:
                    "Refresh session is invalid or expired",
                code: "INVALID_SESSION",
            });
        }

        const session = sessions[0];

        // ----------------------------------------
        // 5. Make sure token user matches session
        // ----------------------------------------

        if (
            Number(decoded.userId) !==
            Number(session.user_id)
        ) {
            res.clearCookie(
                "refreshToken"
            );

            return res.status(401).json({
                message:
                    "Invalid refresh token",
                code: "INVALID_REFRESH_TOKEN",
            });
        }

        // ----------------------------------------
        // 6. Create NEW access token
        // ----------------------------------------

        const newAccessToken = jwt.sign(
            {
                userId: session.user_id,
                role: session.role,
            },
            process.env.JWT_ACCESS_SECRET,
            {
                expiresIn: "15m",
            }
        );

        // ----------------------------------------
        // 7. Send new access token
        // ----------------------------------------

        return res.status(200).json({
            message:
                "Access token refreshed",
            accessToken: newAccessToken,
        });

    } catch (error) {
        console.error(
            "Refresh token error:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to refresh access token",
        });
    }
};