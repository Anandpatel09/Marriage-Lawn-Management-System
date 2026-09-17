import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
});

// for sending Password Reset link
export const sendPasswordResetEmail = async (
    email,
    firstName,
    resetLink
) => {
    try {
        await transporter.sendMail({
            from: `"Durga Marriage Lawn" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Reset Your Password - Durga Marriage Lawn",

            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">

                    <h2>Password Reset Request</h2>

                    <p>Hello ${firstName},</p>

                    <p>
                        We received a request to reset your password.
                    </p>

                    <p>
                        Click the button below to create a new password:
                    </p>

                    <a
                        href="${resetLink}"
                        style="
                            display: inline-block;
                            padding: 12px 20px;
                            background: #d8a849;
                            color: #000;
                            text-decoration: none;
                            border-radius: 6px;
                            font-weight: bold;
                        "
                    >
                        Reset Password
                    </a>

                    <p style="margin-top: 20px;">
                        This link will expire in 15 minutes.
                    </p>

                    <p>
                        If you did not request this password reset,
                        you can safely ignore this email.
                    </p>

                    <p>
                        Regards,<br/>
                        Durga Marriage Lawn
                    </p>

                </div>
            `,
        });

        console.log("Password reset email sent to:", email);

    } catch (error) {
        console.error("Email sending error:", error);
        throw error;
    }
};



///  Data from Enqury form from Contact page..


// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_APP_PASSWORD,
//     },
// });

export const sendEnquiryEmail = async ({
    name,
    mobile,
    email,
    date,
    message,
}) => {
    await transporter.sendMail({
        from: `"Durga Marriage Lawn Website" <${process.env.EMAIL_USER}>`,

        // YOUR email
        to: process.env.EMAIL_USER,

        // So when you click Reply, it goes to the visitor
        replyTo: email,

        subject: `New Marriage Lawn Enquiry from ${name}`,

        html: `
            <div style="
                font-family: Arial, sans-serif;
                max-width: 650px;
                margin: auto;
                padding: 20px;
                background: #f7f7f7;
            ">

                <div style="
                    background: #17120f;
                    color: white;
                    padding: 20px;
                    border-radius: 10px 10px 0 0;
                ">
                    <h2 style="margin: 0;">
                        New Enquiry - Durga Marriage Lawn
                    </h2>
                </div>

                <div style="
                    background: white;
                    padding: 20px;
                    border-radius: 0 0 10px 10px;
                ">

                    <p>
                        <strong>Name:</strong> ${name}
                    </p>

                    <p>
                        <strong>Mobile:</strong> ${mobile}
                    </p>

                    <p>
                        <strong>Email:</strong> ${email}
                    </p>

                    <p>
                        <strong>Tentative Booking Date:</strong>
                        ${date || "Not provided"}
                    </p>

                    <p>
                        <strong>Message:</strong>
                    </p>

                    <div style="
                        background: #f5f5f5;
                        padding: 15px;
                        border-radius: 8px;
                        white-space: pre-wrap;
                    ">
                        ${message}
                    </div>

                    <hr style="margin: 25px 0;" />

                    <p style="color: #666;">
                        This enquiry was submitted from the
                        Durga Marriage Lawn website.
                    </p>

                </div>

            </div>
        `,
    });
};