import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import crypto from "crypto";


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
        const { email, password } = req.body;

        // 1. Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        // 2. Find user
        const [users] = await pool.execute(
            `SELECT 
        id,
        first_name,
        last_name,
        email,
        password_hash,
        role,
        is_verified
       FROM users
       WHERE email = ?`,
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const user = users[0];

        // // 3. Check email verification
        // if (!user.is_verified) {
        //     return res.status(403).json({
        //         message: "Please verify your email first",
        //     });
        // }

        // 4. Compare password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // 5. Create access token
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

        // 6. Create refresh token
        const refreshToken = jwt.sign(
            {
                userId: user.id,
            },
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: "7d",
            }
        );

        // 7. Hash refresh token before storing it
        const refreshTokenHash = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");

        // 8. Save session
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
                req.ip,
            ]
        );

        // 9. Put refresh token in HttpOnly cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // 10. Send response
        return res.status(200).json({
            message: "Login successful",

            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role,
            },

            accessToken,
        });

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};