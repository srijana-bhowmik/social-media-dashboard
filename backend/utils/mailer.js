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
transporter.verify(function (error, success) {
    if (error) {
        console.log("SMTP Verify Error:", error);
    } else {
        console.log("SMTP Server is ready");
    }
});

const sendVerificationEmail = async (to, subject, html) => {
    try {
        console.log("Attempting email to:", to);

        const info = await transporter.sendMail({
            from: `"Social Dashboard" <${process.env.BREVO_USER}>`,
            to,
            subject,
            html
        });

        console.log("Email sent:", info.messageId);
    } catch (error) {
        console.log("Email error:", error);
    }
};

module.exports = {
    sendVerificationEmail
};