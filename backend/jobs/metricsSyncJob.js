const cron = require("node-cron");
const axios = require("axios");
const db = require("../config/db");

const IG_API_BASE = "https://graph.facebook.com/v25.0";

const syncInstagramMetrics = () => {
    cron.schedule("*/1 * * * *", async () => {
        console.log("🔄 Running Instagram sync job...");

        try {
            // 1. Get all Instagram accounts from DB
            db.query(
                "SELECT * FROM social_accounts WHERE platform = 'instagram'",
                async (err, accounts) => {
                    if (err) {
                        console.error("DB error:", err);
                        return;
                    }

                    for (const account of accounts) {
                        try {
                            const { ig_id, access_token, page_id, id: account_id } = account;

                            // 2. Get page access token
                            console.log("Using token:", access_token?.slice(0,20));
                            const page_access_token = access_token;

                            // 3. Instagram profile
                            const profileRes = await axios.get(
                                `${IG_API_BASE}/${ig_id}?fields=followers_count,media_count&access_token=${page_access_token}`
                            );

                            // 4. Instagram media
                            const mediaRes = await axios.get(
                                `${IG_API_BASE}/${ig_id}/media?fields=like_count,comments_count&access_token=${page_access_token}`
                            );

                            const followers = profileRes.data.followers_count || 0;

                            let likes = 0;
                            let comments = 0;

                            for (const post of mediaRes.data.data || []) {
                                likes += post.like_count || 0;
                                comments += post.comments_count || 0;
                            }
                            console.log({
                                account_id,
                                followers,
                                likes,
                                comments
                            });
                            // 5. Save snapshot in DB
                            db.query(
                                `INSERT INTO social_metrics 
                                (account_id, followers, likes_count, comments_count, shares_count) 
                                VALUES (?, ?, ?, ?, ?)`,
                                [account_id, followers, likes, comments, 0]
                            );

                        } catch (apiErr) {
                            console.error("IG sync error:", apiErr.response?.data || apiErr.message);
                        }
                    }
                }
            );

        } catch (err) {
            console.error("Cron job error:", err.message);
        }
    });
};

module.exports = syncInstagramMetrics;