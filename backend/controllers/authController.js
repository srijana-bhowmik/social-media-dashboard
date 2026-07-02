const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const { sendVerificationEmail } = require("../utils/mailer");
const generateOTP = require("../utils/generateOTP");

// Register a new user-- post in postman
//  created API in postman: http://localhost:3000/api/auth/register
const register = async (req, res) => {      //every new user who registers is a viewer automatically
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                if (result.length > 0) {
                    return res.status(400).json({
                        message: "User already exists"
                    });
                }

                const hashedPassword =
                    await bcrypt.hash(password, 10);
                
                const otp = generateOTP();
                const expiry = new Date(
                    Date.now() + 5 * 60 * 1000
                );
                db.query(
                    "INSERT INTO users(name,email,password,is_verified,otp,otp_expires) VALUES (?, ?, ?, false, ?, ?)",
                    [
                        name,
                        email,
                        hashedPassword,
                        otp,
                        expiry
                    ],
                    async (err, result) => {

                        if (err) {
                            return res.status(500).json(err);
                        }

                        await sendVerificationEmail(
                            email,
                            "Verify your account",
                            `
                            <h2>Welcome to Social Dashboard</h2>
                            <p>Your OTP is:</p>
                            <h1>${otp}</h1>
                            <p>This OTP expires in 5 minutes.</p>
                            `
                        );

                        res.status(201).json({
                            message:
                                "Registration successful. Check your email for OTP."
                        });
                    }
                );
            }
        );

    } catch (error) {
        res.status(500).json(error);
    }
};
//verify the opt after registration 
const verifyOTP = (req, res) => {
    const { email, otp } = req.body;
    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (result.length === 0) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
            const user = result[0];
            if (user.otp !== otp) {
                return res.status(400).json({
                    message: "Invalid OTP"
                });
            }
            if (new Date() > new Date(user.otp_expires)) {
                return res.status(400).json({
                    message: "OTP expired"
                });
            }
            db.query(
                `UPDATE users SET is_verified = true, otp = NULL, otp_expires = NULL WHERE email = ?`,
                [email],
                (err) => {

                    if (err) {
                        return res.status(500).json(err);
                    }

                    res.json({
                        message: "Email verified successfully"
                    });
                }
            );
        }
    );
};




//login
const login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, result) => {        //dataabase returns result, result is an array of users matching the email, should be 0 or 1
            if (err) {
                return res.status(500).json(err);
            }

            if (result.length === 0) {      // no user found with the provided email
                return res.status(400).json({
                    message: "User not found"
                });
            }

            const user = result[0];     // user is the first (and only) user in the result array, which contains the user's data including the hashed password
            if(!user.is_verified) {
                return res.status(403).json({
                    message: "Please verify your email first"
                });
            }
            const isMatch = await bcrypt.compare(        // compare the provided password with the hashed password in the database
                password,
                user.password               //bcrypt hashes the password and compares it to the stored hash, returns true if they match, false otherwise
            );

            if (!isMatch) {
                return res.status(400).json({
                    message: "Invalid credentials"
                });
            }

            const token = jwt.sign(         //backend gives the user a token that they can use to authenticate future requests, the token contains the user's id and role, and is signed with a secret key
                {
                    id: user.id, 
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "7d"
                }
            );

            res.status(200).json({
                message: "Login successful",
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        }
    );
};

// const instagramLogin = (req, res) => {
//   res.send("instagram OAuth coming soon ");
// }

// const instagramCallback = (req, res) => {
//   res.send("instagram callback coming soon ");
// }
const facebookLogin = (req, res) => {

    const { token } = req.query;
    //print token in console
    console.log("token:", token);

    const appId = process.env.META_APP_ID;

    const redirectUri =
        "http://localhost:3000/api/auth/facebook/callback";

    const scope =
        "pages_show_list,pages_read_engagement,pages_read_user_content,read_insights,business_management";
    const authUrl =
        `https://www.facebook.com/v25.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(
            redirectUri
        )}&scope=${scope}&state=${token}`;

    res.redirect(authUrl);
};

const axios = require("axios");
const facebookCallback = async (req, res) => {
    try {
        const { code, state } = req.query;
        console.log("STATE:", state);
        const decoded = jwt.verify(
            state,
            process.env.JWT_SECRET
        );
        const user_id = decoded.id;
        console.log("USER ID:", user_id);

        const tokenRes = await axios.get(
            "https://graph.facebook.com/v25.0/oauth/access_token",
            {
                params: {
                    client_id: process.env.META_APP_ID,
                    client_secret: process.env.META_APP_SECRET,
                    redirect_uri:
                        "http://localhost:3000/api/auth/facebook/callback",
                    code
                }
            }
        );

        console.log("TOKEN RESPONSE:");
        console.log(tokenRes.data);
        const accessToken = tokenRes.data.access_token;
        const pagesRes = await axios.get(
            "https://graph.facebook.com/v25.0/me/accounts",
            {
                params: {
                    access_token: accessToken
                }
            }
        );
        console.log("PAGES:");
        console.log(pagesRes.data);
        // res.json(pagesRes.data);
        const page = pagesRes.data.data[0];

        const pageId = page.id;
        const pageName = page.name;
        const pageAccessToken = page.access_token;
        const igRes = await axios.get(
            `https://graph.facebook.com/v25.0/${pageId}`,
            {
                params: {
                    fields: "instagram_business_account",
                    access_token: pageAccessToken
                }
            }
        );

        console.log("IG RESPONSE:");
        console.log(igRes.data); 
        const igId = igRes.data.instagram_business_account?.id || null;
        const igProfileRes = await axios.get(
            `https://graph.facebook.com/v25.0/${igId}`,
            {
                params: {
                    fields:
                        "username,followers_count,media_count",
                    access_token: pageAccessToken
                }
            }
        );

        console.log("IG PROFILE:");
        console.log(igProfileRes.data);
        const username = igProfileRes.data.username;
        db.query(
            `INSERT INTO social_accounts
            (user_id, platform, account_name, ig_id, access_token, page_id)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                user_id,
                "facebook",
                page.name,
                igId,
                pageAccessToken,
                pageId
            ], 
            (err, result) => {

                if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                        return res.redirect(
                            "http://localhost:5173/accounts"
                        );
                    }

                    return res.status(500).json({
                        message: "Database error"
                    });
                }

                db.query(
                    `INSERT INTO social_accounts
                    (user_id, platform, account_name, ig_id, access_token, page_id)
                    VALUES (?, ?, ?, ?, ?, ?)`,
                    [
                        user_id,
                        "instagram",
                        username,
                        igId,
                        pageAccessToken,
                        pageId
                    ],
                    (igErr) => {

                        if (
                            igErr &&
                            igErr.code !== "ER_DUP_ENTRY"
                        ) {
                            console.log(igErr);
                        }

                        res.redirect(
                            "http://localhost:5173/accounts"
                        );
                    }
                ); 
            }
        );


    } catch (error) {

        console.log(
            error.response?.data || error.message
        );

        res.status(500).json({
            error: error.response?.data || error.message
        });
    }
};


module.exports = {
    register,
    login,
    verifyOTP,
    // instagramLogin,
    // instagramCallback,
    facebookLogin,
    facebookCallback
};
