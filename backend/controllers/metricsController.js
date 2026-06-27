const db = require("../config/db");

const addMetrics = (req, res) => {

const { account_id, followers, likes_count, comments_count,shares_count} = req.body;

    if ( !account_id || followers == null ||likes_count == null ||comments_count == null ||shares_count == null) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    db.query( `INSERT INTO social_metrics (account_id, followers, likes_count, comments_count, shares_count) VALUES (?, ?, ?, ?, ?)`,
        [
            account_id,
            followers,
            likes_count,
            comments_count,
            shares_count
        ],
        (err, result) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Database error"
                });
            }

            res.status(201).json({
                message: "Metrics added successfully"
            });
        }
    );
};

const getMetricsByAccount = (req, res) => {

    const { accountId } = req.params;

    db.query(
        `SELECT * FROM social_metrics WHERE account_id = ? ORDER BY recorded_at ASC`,
        [accountId],
        (err, result) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Database error"
                });
            }

            res.status(200).json(result);
        }
    );
};

module.exports = {
    addMetrics,
    getMetricsByAccount
};