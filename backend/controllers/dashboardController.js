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

const getUserAccounts=(req,res)=>{
    const user_id=req.user.id;
    db.query(
        `SELECT * FROM social_accounts
         WHERE user_id = ?`,
        [user_id],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }
            res.status(200).json(result);
        }
    )
}

const getPlatformComparison=(req,res)=>{
    const user_is=req.user.id;
     const query = `
        SELECT
            sa.platform,
            sm.followers
        FROM social_accounts sa
        JOIN social_metrics sm
            ON sa.id = sm.account_id
        WHERE sa.user_id = ?
        AND sm.id = (
            SELECT id
            FROM social_metrics
            WHERE account_id = sa.id
            ORDER BY recorded_at DESC
            LIMIT 1
        )
    `;
    db.query(query, [user_is], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }
        res.status(200).json(result);
    })

}

const getLikesDistribution = (req, res) => {

    const user_id = req.user.id;

    const query = `
        SELECT
            sa.platform,
            sm.likes_count
        FROM social_accounts sa
        JOIN social_metrics sm
            ON sa.id = sm.account_id
        WHERE sa.user_id = ?
        AND sm.id = (
            SELECT id
            FROM social_metrics
            WHERE account_id = sa.id
            ORDER BY recorded_at DESC
            LIMIT 1
        )
    `;

    db.query(query, [user_id], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database error"
            });
        }

        res.status(200).json(result);
    });
};

module.exports = {
    getDashboardSummary,
    getUserAccounts,
    getPlatformComparison,
    getLikesDistribution
};