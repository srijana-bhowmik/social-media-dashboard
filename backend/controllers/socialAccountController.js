const db = require("../config/db");


//add social account
const addSocialAccount = (req, res) => {
    const { platform, account_name } = req.body;

    // Validation
    if (!platform || !account_name) {
        return res.status(400).json({
            message: "Platform and account name are required"
        });
    }

    const user_id = req.user.id;

    db.query(
        "INSERT INTO social_accounts (user_id, platform, account_name) VALUES (?, ?, ?)",
        [user_id, platform, account_name],
        (err, result) => {

            if (err) {

                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({
                        message: "Social account already exists"
                    });
                }

                console.error(err);

                return res.status(500).json({
                    message: "Database error"
                });
            }

            res.status(201).json({
                message: "Social account added successfully"
            });
        }
    );
};

//get social accounts for a user
const getSocialAccounts = (req, res) => {

    const user_id = req.user.id;

    db.query(
        "SELECT * FROM social_accounts WHERE user_id = ?",
        [user_id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }

            res.status(200).json(result);
        }
    );
};

const deleteSocialAccount = (req, res) => {

    const { id } = req.params;

    db.query(
        "DELETE FROM social_metrics WHERE account_id = ?",
        [id],
        (err) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Database error"
                });
            }

            db.query(
                "DELETE FROM social_accounts WHERE id = ?",
                [id],
                (err) => {

                    if (err) {
                        console.error(err);

                        return res.status(500).json({
                            message: "Database error"
                        });
                    }

                    res.status(200).json({
                        message: "Account deleted successfully"
                    });
                }
            );
        }
    );
};

const syncAccount = (req, res) => {

    const { id } = req.params;

    db.query(
        `SELECT *
         FROM social_metrics
         WHERE account_id = ?
         ORDER BY recorded_at DESC
         LIMIT 1`,
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }

            let followers = 500;
            let likes = 100;
            let comments = 20;
            let shares = 5;

            if (result.length > 0) {

                followers =
                    result[0].followers +
                    Math.floor(Math.random() * 50) + 10;

                likes =
                    result[0].likes_count +
                    Math.floor(Math.random() * 30) + 5;

                comments =
                    result[0].comments_count +
                    Math.floor(Math.random() * 10) + 1;

                shares =
                    result[0].shares_count +
                    Math.floor(Math.random() * 5) + 1;
            }

            db.query(
                `INSERT INTO social_metrics
                (account_id, followers,
                 likes_count, comments_count,
                 shares_count)
                VALUES (?, ?, ?, ?, ?)`,
                [
                    id,
                    followers,
                    likes,
                    comments,
                    shares
                ],
                (err2, result2) => {

                    if (err2) {
                        return res.status(500).json({
                            message: "Database error"
                        });
                    }

                    res.status(200).json({
                        message: "Account synced successfully"
                    });
                }
            );
        }
    );
};


module.exports = {
    addSocialAccount,
    getSocialAccounts,
    deleteSocialAccount,
    syncAccount
};