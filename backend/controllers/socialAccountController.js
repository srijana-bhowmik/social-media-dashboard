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


module.exports = {
    addSocialAccount,
    getSocialAccounts,
    deleteSocialAccount
};