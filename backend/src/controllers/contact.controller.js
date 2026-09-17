import pool from "../config/db.js";
import { sendEnquiryEmail } from "../services/email.service.js";

export const sendEnquiry = async (req, res) => {
    try {
        const {
            name,
            mobile,
            email,
            date,
            message,
        } = req.body;

        // Validation
        if (!name || !mobile || !email || !message) {
            return res.status(400).json({
                message: "Name, mobile, email and message are required",
            });
        }

        // Save enquiry in MySQL
     
        const [result] = await pool.execute(
            `INSERT INTO enquiries
    (name, mobile, email, booking_date, message)
    VALUES (?, ?, ?, ?, ?)`,
            [
                name.trim(),
                mobile.trim(),
                email.trim(),
                date || null,
                message.trim(),
            ]
        );

        // Send email without making the client wait
        sendEnquiryEmail({
            name,
            mobile,
            email,
            date,
            message,
        }).catch((error) => {
            console.error("Enquiry email failed:", error);
        });

        return res.status(201).json({
            message: "Enquiry submitted successfully",
            enquiryId: result.insertId,
        });


    } catch (error) {
        console.error("Enquiry error:", error);

        return res.status(500).json({
            message: "Failed to submit enquiry",
        });
    }
};


//create an API to show all enquiries  
/// use it when Admin pannel is created 

export const getAllEnquiries = async (req, res) => {
    try {
        const [enquiries] = await pool.execute(
            `SELECT
                id,
                name,
                mobile,
                email,
                booking_date,
                message,
                created_at
             FROM enquiries
             ORDER BY created_at DESC`
        );

        return res.status(200).json({
            enquiries,
        });

    } catch (error) {
        console.error("Get enquiries error:", error);

        return res.status(500).json({
            message: "Failed to fetch enquiries",
        });
    }
};