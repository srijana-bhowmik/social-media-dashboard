const cron = require("node-cron");
const axios = require("axios");
const db = require("../config/db");

const syncTwitterMetrics = () => {

    cron.schedule("*/1 * * * *", async () => {

        console.log("🐦 Running Twitter sync job...");

        db.query(
            "SELECT * FROM social_accounts WHERE platform = 'twitter'",
            async (err, accounts) => {

                if (err) {
                    console.error("DB error:", err);
                    return;
                }

                for (const account of accounts) { 
                    try { 
                        const {
                            access_token,
                            twitter_id,
                            id: account_id
                        } = account;
                        console.log("TWITTER ACCOUNT:");
                        console.log(account);
                        const profileRes = await axios.get(
                            "https://api.twitter.com/2/users/me",
                            {
                                headers: {
                                    Authorization: `Bearer ${access_token}`
                                },
                                params: {
                                    "user.fields": "public_metrics"
                                }
                            }
                        ); 

                        const metrics =
                            profileRes.data.data.public_metrics;
                        const followers =
                            metrics.followers_count || 0;
  
                        db.query(
                            `INSERT INTO social_metrics
                            (account_id, followers, likes_count, comments_count, shares_count)
                            VALUES (?, ?, ?, ?, ?)`,
                            [
                                account_id,
                                followers,
                                0,
                                0,
                                0
                            ]
                        ); 

                    } catch (apiErr) {

                        console.error(
                            "Twitter sync error:",
                            apiErr.response?.data ||
                            apiErr.message
                        );
                    }
                }
            }
        );
    });
};

module.exports = syncTwitterMetrics;