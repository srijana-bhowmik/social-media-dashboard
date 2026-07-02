const express = require("express");
const router = express.Router();

const { register, login , verifyOTP, resendOTP, facebookLogin, facebookCallback } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
// router.get("/instagram", instagramLogin);
// router.get("/instagram/callback", instagramCallback);
router.get("/facebook", facebookLogin);
router.get("/facebook/callback", facebookCallback);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);

module.exports = router;