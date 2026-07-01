const cron = require("node-cron");
const axios = require("axios");
const db = require("../config/db");

const FB_API_BASE = "https://graph.facebook.com/v25.0";

const syncFacebookMetrics = () => {
    cron.schedule("*/1 * * * *", async () => {
        console.log("Running Facebook sync job...");

        db.query(
            "SELECT * FROM social_accounts WHERE platform = 'facebook'",
            async (err, accounts) => {

                if (err) {
                    console.error("DB error:", err);
                    return;
                }

                for (const account of accounts) {
                    try {

                        const {
                            page_id,
                            access_token,
                            id: account_id
                        } = account;

                        if (!page_id || !access_token) {
                            continue;
                        }

                        const pageRes = await axios.get(
                            `${FB_API_BASE}/${page_id}?fields=followers_count,fan_count&access_token=${access_token}`
                        );

                        const followers =
                            pageRes.data.followers_count || 0;

                        const likes =
                            pageRes.data.fan_count || 0;

                        db.query(
                            `INSERT INTO social_metrics
                            (account_id, followers, likes_count, comments_count, shares_count)
                            VALUES (?, ?, ?, ?, ?)`,
                            [
                                account_id,
                                followers,
                                likes,
                                0,
                                0
                            ]
                        );

                        console.log("Facebook synced:", {
                            account_id,
                            followers,
                            likes
                        });

                    } catch (apiErr) {
                        console.error(
                            "Facebook sync error:",
                            apiErr.response?.data || apiErr.message
                        );
                    }
                }
            }
        );
    });
};

module.exports = syncFacebookMetrics;