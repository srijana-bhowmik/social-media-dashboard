const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS
    }
});

const sendVerificationEmail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: `"Social Dashboard" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html
        });

        console.log(" Email sent to:", to);
    } catch (error) {
        console.log("Email error:", error.message);
    }
};

module.exports = {
    sendVerificationEmail
};