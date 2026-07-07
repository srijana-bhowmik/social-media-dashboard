// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//     host: "smtp-relay.brevo.com",
//     port: 587,
//     secure: false,
//     auth: {
//         user: process.env.BREVO_USER,
//         pass: process.env.BREVO_PASS
//     }
// }); 

// const sendVerificationEmail = async (to, subject, html) => {
//     try {
//         console.log("Attempting email to:", to);

//         const info = await transporter.sendMail({
//             from: `"Social Dashboard" <${process.env.BREVO_USER}>`,
//             to,
//             subject,
//             html
//         });

//         console.log("Email sent:", info.messageId);
//     } catch (error) {
//         console.log("Email error:", error);
//     }
// };

// module.exports = {
//     sendVerificationEmail
// };

const brevo = require("@getbrevo/brevo");

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
);

const sendVerificationEmail = async (
    to,
    subject,
    html
) => {
    try {

        await apiInstance.sendTransacEmail({
            sender: {
                email: process.env.BREVO_USER,
                name: "Social Dashboard"
            },

            to: [
                {
                    email: to
                }
            ],

            subject,
            htmlContent: html
        });

        console.log("Email sent to:", to);

    } catch (error) {

        console.log(
            "Brevo API error:",
            error.response?.body || error.message
        );
    }
};

module.exports = {
    sendVerificationEmail
};