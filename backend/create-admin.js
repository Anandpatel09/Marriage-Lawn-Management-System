import bcrypt from "bcrypt";
import pool from "./src/config/db.js";
import dotenv from "dotenv";

dotenv.config();

const createAdmin = async () => {
    try {
        const firstName = "Admin";
        const lastName = "User";
        const email = "admin@dmllawns.in";
        const mobile = "9919799529";
        const city = "Sultanpur";
        const password = "Admin@12345";

        const passwordHash = await bcrypt.hash(password, 12);

        const [result] = await pool.execute(
            `INSERT INTO users
            (first_name, last_name, email, mobile, city, password_hash, role, is_verified)
            VALUES (?, ?, ?, ?, ?, ?, 'admin', TRUE)`,
            [
                firstName,
                lastName,
                email,
                mobile,
                city,
                passwordHash,
            ]
        );

        console.log("Admin created successfully!");
        console.log("Admin ID:", result.insertId);
        console.log("Email:", email);

    } catch (error) {
        console.error("Error creating admin:", error);
    } finally {
        await pool.end();
    }
};

createAdmin();