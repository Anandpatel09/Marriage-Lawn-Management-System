import bcrypt from "bcrypt";
import pool from "../config/db.js";

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
                message: "Email already registered",
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
