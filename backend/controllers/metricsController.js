const db = require("../config/db");

// const addMetrics = (req, res) => {

//     const { account_id, followers, likes_count, comments_count,shares_count} = req.body;

//     if ( !account_id || followers == null ||likes_count == null ||comments_count == null ||shares_count == null) {
//         return res.status(400).json({
//             message: "All fields are required"
//         });
//     }

//     db.query( `INSERT INTO social_metrics (account_id, followers, likes_count, comments_count, shares_count) VALUES (?, ?, ?, ?, ?)`,
//         [
//             account_id,
//             followers,
//             likes_count,
//             comments_count,
//             shares_count
//         ],
//         (err, result) => {

//             if (err) {
//                 console.error(err);

//                 return res.status(500).json({
//                     message: "Database error"
//                 });
//             }

//             res.status(201).json({
//                 message: "Metrics added successfully"
//             });
//         }
//     );
// };

const getMetricsByAccount = (req, res) => {

    const { accountId } = req.params;

    db.query(
        `SELECT * FROM social_metrics WHERE account_id = ? ORDER BY recorded_at DESC `,
        [accountId],
        (err, result) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Database error"
                });
            }

            const formattedResult = result.map(row => ({
                ...row,
                likes_count: row.likes_count ?? "N/A",
                comments_count: row.comments_count ?? "N/A",
                shares_count: row.shares_count ?? "N/A"
            }));

            res.status(200).json(formattedResult);
        }
    );
};


//meta api integration

const axios = require("axios"); 

// const IG_API_BASE = "https://graph.facebook.com/v25.0";

//Fetch from Instagram + store in DB
const fetchAndStoreInstagramMetrics = async (req, res) => {
    try {
        const { account_id, ig_id, access_token, page_id } = req.body;

        if (!account_id || !ig_id || !access_token || !page_id) {
            return res.status(400).json({
                message: "account_id, ig_id, access_token required"
            });
        }

        const pageRes = await axios.get(
            `https://graph.facebook.com/v25.0/me/accounts?access_token=${access_token}`
        );
        const pageData = pageRes.data?.data || [];
        const page = pageData.find(p => p.id === page_id);

        if (!page) {
            return res.status(400).json({
                message: "Page not found in /me/accounts. Check permissions."
            });
        }
        const page_access_token = page.access_token;

        // 1. Profile call
        const profileRes = await axios.get(
            `https://graph.facebook.com/v25.0/${ig_id}?fields=followers_count,media_count&access_token=${page_access_token}`
        );


        // 2. Media call
       const mediaRes = await axios.get(
            `https://graph.facebook.com/v25.0/${ig_id}/media?fields=like_count,comments_count&access_token=${page_access_token}`
        );

        const followers = profileRes.data?.followers_count || 0;

        const posts = mediaRes?.data?.data ?? [];
        let likes = 0;
        let comments = 0;

        for (const post of posts) {
            likes += post?.like_count || 0;
            comments += post?.comments_count || 0;
        }

        // 3. Save DB
        db.query(
            `INSERT INTO social_metrics 
            (account_id, followers, likes_count, comments_count, shares_count) 
            VALUES (?, ?, ?, ?, ?)`,
            [account_id, followers, likes, comments, null],
            (err) => {
                if (err) {
                    return res.status(500).json({ message: "DB error" });
                }

                return res.status(200).json({
                    message: "Live Instagram metrics stored successfully",
                    data: { followers, likes, comments }
                });
            }
        );

    } catch (err) {
        console.error("META ERROR:", err.response?.data || err.message);

        return res.status(500).json({
            message: "Meta API error",
            error: err.response?.data || err.message
        });
    }
};

module.exports = {
    // addMetrics,
    getMetricsByAccount,
    fetchAndStoreInstagramMetrics
}; 