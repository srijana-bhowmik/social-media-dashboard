const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const axios = require("axios");
const { sendVerificationEmail } = require("../utils/mailer");
const generateOTP = require("../utils/generateOTP");
const crypto=require('crypto');

// Register a new user-- post in postman
//  created API in postman: https://social-media-dashboard-cvh5.onrender.com/api/auth/register
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

    const user = result[0];

    if (user.is_verified) {
        return res.status(400).json({
            message: "User already exists"
        });
    }

    // User exists but not verified
    const otp = generateOTP();
    const expiry = new Date(
        Date.now() + 5 * 60 * 1000
    );

    db.query(
        `UPDATE users
         SET otp = ?, otp_expires = ?
         WHERE email = ?`,
        [otp, expiry, email],
        async (err) => {

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

            return res.status(200).json({
                message: "New OTP sent"
            });
        }
    );

    return;
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

                        sendVerificationEmail(
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
const resendOTP = async (req, res) => {

    try {

        const { email } = req.body;

        const otp = generateOTP();

        const expiry = new Date(
            Date.now() + 5 * 60 * 1000
        );

        db.query(
            `UPDATE users
             SET otp = ?, otp_expires = ?
             WHERE email = ?`,
            [
                otp,
                expiry,
                email
            ],
            async (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                sendVerificationEmail(
                    email,
                    "Verify your account",
                    `
                    <h2>Social Dashboard</h2>
                    <p>Your new OTP is:</p>
                    <h1>${otp}</h1>
                    `
                );

                res.json({
                    message: "OTP resent successfully"
                });
            }
        );

    } catch (error) {

        res.status(500).json(error);
    }
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
        "https://social-media-dashboard-cvh5.onrender.com/api/auth/facebook/callback";

    const scope =
        "pages_show_list,pages_read_engagement,pages_read_user_content,read_insights,business_management";
    const authUrl =
        `https://www.facebook.com/v25.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(
            redirectUri
        )}&scope=${scope}&state=${token}`;

    res.redirect(authUrl);
};


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
                        "https://social-media-dashboard-cvh5.onrender.com/api/auth/facebook/callback",
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
            `SELECT * FROM social_accounts
            WHERE user_id = ?
            AND platform = 'facebook'
            AND page_id = ?`,
            [user_id, pageId],
            (err, rows) => {

                if (err) {
                    return res.status(500).json({
                        message: "Database error"
                    });
                }

                if (rows.length > 0) {

                    db.query(
                        `UPDATE social_accounts
                        SET access_token = ?,
                            account_name = ?,
                            status = 'active'
                        WHERE id = ?`,
                        [
                            pageAccessToken,
                            page.name,
                            rows[0].id
                        ]
                    );

                    db.query(
                        `UPDATE social_accounts
                        SET access_token = ?,
                            account_name = ?,
                            status = 'active'
                        WHERE user_id = ?
                        AND platform = 'instagram'
                        AND ig_id = ?`,
                        [
                            pageAccessToken,
                            username,
                            user_id,
                            igId
                        ]
                    );

                    return res.redirect(
                        "https://social-media-dashboard-six-tan.vercel.app/accounts"
                    );
                }

                // INSERT facebook
                db.query(
                    `INSERT INTO social_accounts
                    (user_id, platform, account_name, page_id, access_token, status)
                    VALUES (?, 'facebook', ?, ?, ?, 'active')`,
                    [
                        user_id,
                        pageName,
                        pageId,
                        pageAccessToken
                    ]
                );
                // INSERT instagram
                db.query(
                    `INSERT INTO social_accounts
                    (user_id, platform, account_name, ig_id,page_id, access_token, status)
                    VALUES (?, 'instagram', ?, ?,?, ?, 'active')`,
                    [
                        user_id,
                        username,
                        igId,
                        pageId,
                        pageAccessToken
                    ]
                );
                return res.redirect( "https://social-media-dashboard-six-tan.vercel.app/accounts");
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

const twitterLogin = async (req, res) => {
    const token = req.query.token;
    const state = jwt.sign(
        {
            token
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "10m"
        }
    );
    const codeVerifier =
        crypto.randomBytes(32).toString("hex");
    const codeChallenge = crypto
        .createHash("sha256")
        .update(codeVerifier)
        .digest("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    res.cookie(
        "twitter_code_verifier",
        codeVerifier,
        {
            httpOnly: true
        }
    );
    const url =
        `https://twitter.com/i/oauth2/authorize` +
        `?response_type=code` +
        `&client_id=${process.env.TWITTER_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(
            process.env.TWITTER_CALLBACK_URL
        )}` +
        `&scope=tweet.read users.read offline.access` +
        `&state=${state}` +
        `&code_challenge=${codeChallenge}` +
        `&code_challenge_method=S256`;
    res.redirect(url);
};

const twitterCallback = async (req, res) => {
    try {

        const { code, state } = req.query;

        const decoded = jwt.verify(
            state,
            process.env.JWT_SECRET
        );

        const token =
            decoded.token;

        const decodedToken =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );

        const user_id =
            decodedToken.id;

        const codeVerifier =
            req.cookies.twitter_code_verifier;

        const tokenRes = await axios.post(
            "https://api.twitter.com/2/oauth2/token",
            new URLSearchParams({
                code,
                grant_type: "authorization_code",
                client_id: process.env.TWITTER_CLIENT_ID,
                redirect_uri: process.env.TWITTER_CALLBACK_URL,
                code_verifier: codeVerifier
            }),
            {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded",
                    Authorization:
                        "Basic " +
                        Buffer.from(
                            `${process.env.TWITTER_CLIENT_ID}:${process.env.TWITTER_CLIENT_SECRET}`
                        ).toString("base64")
                }
            }
        );

        console.log( "TWITTER TOKEN:" );
        console.log(tokenRes.data );
        const accessToken = tokenRes.data.access_token;
        const refreshToken = tokenRes.data.refresh_token;
        // console.log("ACCESS TOKEN SAVED:");
        // console.log(accessToken);
 
        const profileRes =
            await axios.get(
                "https://api.twitter.com/2/users/me",
                {
                    headers: {
                        Authorization:
                            `Bearer ${accessToken}`
                    },
                    params: {
                        "user.fields":
                            "profile_image_url,public_metrics"
                    }
                }
            );
        const twitterId=profileRes.data.data.id;
        const username=profileRes.data.data.username;
        db.query(
            `SELECT * FROM social_accounts
            WHERE user_id = ?
            AND platform = 'twitter'
            AND twitter_id = ?`,
            [user_id, twitterId],
            (err, rows) => {

                if (err) {
                    return res.status(500).json({
                        message: "Database error"
                    });
                }

            if (rows.length > 0) {

                db.query(
                    `UPDATE social_accounts
                    SET access_token = ?,
                        refresh_token = ?,
                        status = 'active'
                    WHERE id = ?`,
                    [
                        accessToken,
                        refreshToken,
                        rows[0].id
                    ],
                    (updateErr) => {

                        if (updateErr) {
                            return res.status(500).json({
                                message: "Database error"
                            });
                        }

                        return res.redirect(
                            "https://social-media-dashboard-six-tan.vercel.app/accounts"
                        );
                    }
                );

                return;
            }

            db.query(
                `INSERT INTO social_accounts
                (user_id, platform, account_name, twitter_id, access_token, refresh_token, status)
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    user_id,
                    "twitter",
                    username,
                    twitterId,
                    accessToken,
                    refreshToken,
                    "active"
                ],
                (err) => { 
                    if (err) {
                        if (err.code === "ER_DUP_ENTRY") {
                            return res.redirect(
                                "https://social-media-dashboard-six-tan.vercel.app/accounts"
                            );
                        }
                        console.log(err);

                        return res.status(500).json({
                            message: "Database error"
                        });
                    }
                    res.redirect(
                        "https://social-media-dashboard-six-tan.vercel.app/accounts"
                    );
                }
            );
        }
    );   
    console.log("TWITTER PROFILE:");
    console.log(profileRes.data); 

    } catch (error) {

        console.log(
            error.response?.data ||
            error.message
        );

        res.status(500).json({
            error:
                error.response?.data ||
                error.message
        });
    }
};


module.exports = {
    register,
    login,
    verifyOTP,
    resendOTP, 
    facebookLogin,
    facebookCallback,
    twitterLogin,
    twitterCallback 
};
