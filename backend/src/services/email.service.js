import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
});

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