import nodemailer from 'nodemailer';

// Create transporter (configure with your email service)
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail', // or your email service
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

export const sendPasswordResetEmail = async (email, resetToken) => {
    const transporter = createTransporter();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request - GreenFit',
        html: `
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #10b981;">GreenFit</h1>
                </div>

                <h2 style="color: #333;">Password Reset Request</h2>

                <p>Hello,</p>

                <p>We received a request to reset your password for your GreenFit account. If you didn't make this request, you can safely ignore this email.</p>

                <p>To reset your password, click the button below:</p>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetUrl}"
                       style="background-color: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                        Reset Password
                    </a>
                </div>

                <p>Or copy and paste this link into your browser:</p>
                <p style="word-break: break-all; color: #10b981;">${resetUrl}</p>

                <p><strong>This link will expire in 1 hour for security reasons.</strong></p>

                <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">

                <p style="color: #666; font-size: 14px;">
                    If you're having trouble clicking the button, copy and paste the URL above into your web browser.
                </p>

                <p style="color: #666; font-size: 14px;">
                    Best regards,<br>
                    The GreenFit Team
                </p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error('Email sending error:', error);
        return { success: false, error: error.message };
    }
};
