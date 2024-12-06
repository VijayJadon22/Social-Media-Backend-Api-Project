import nodemailer from "nodemailer";

// Load environment variables
const email = process.env.USER;
const password = process.env.EMAIL_KEY;

async function sendEmailForOTPVerification(userEmail, otp) {
    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Using Gmail as the service
        auth: {
            user: "vijayjadon2two@gmail.com",
            pass: "qpopxivllizbkdfv"
        }
    });

    // Email options
    const mailOptions = {
        from: "vijayjadon2two@gmail.com",
        to: userEmail,
        subject: "Password reset OTP",
        text: `Your OTP to reset password is ${otp}. It will be valid only for 5 minutes.`
    };

    // Send email
    let info = await transporter.sendMail(mailOptions);

    // console.log('Message sent: %s', info.messageId);
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    console.log("Email sent successfully");
}

// Example usage:
// sendEmailForOTPVerification('recipient@example.com', '123456');

export { sendEmailForOTPVerification };
