 
const axios = require("axios");

const sendVerificationEmail = async (
    to,
    subject,
    html
) => {
    try {

        const response = await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: {
                    name: "Social Dashboard",
                    email: process.env.BREVO_USER
                },
                to: [
                    {
                        email: to
                    }
                ],
                subject,
                htmlContent: html
            },
            {
                headers: {
                    "api-key": process.env.BREVO_API_KEY,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("Email sent to:", to);
        console.log(response.data);

    } catch (error) {

        console.log(
            "Brevo API error:",
            error.response?.data || error.message
        );
    }
};

module.exports = {
    sendVerificationEmail
};