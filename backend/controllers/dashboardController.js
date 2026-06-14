const db = require("../config/db");

const getDashboardSummary = (req, res) => {
    const user_id = req.user.id;

    const query = `
        SELECT
            COUNT(DISTINCT sa.id) AS totalAccounts,
            COALESCE(SUM(sm.followers), 0) AS totalFollowers,
            COALESCE(SUM(sm.likes_count), 0) AS totalLikes,
            COALESCE(SUM(sm.comments_count), 0) AS totalComments,
            COALESCE(SUM(sm.shares_count), 0) AS totalShares
        FROM social_accounts sa
        LEFT JOIN social_metrics sm
        ON sa.id = sm.account_id
        WHERE sa.user_id = ?
    `;

    db.query(query, [user_id], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        res.status(200).json(result[0]);
    });
};

module.exports = {
    getDashboardSummary
};