const express = require("express");
const router = express.Router();

const { register, login , facebookLogin, facebookCallback } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
// router.get("/instagram", instagramLogin);
// router.get("/instagram/callback", instagramCallback);
router.get("/facebook", facebookLogin);
router.get("/facebook/callback", facebookCallback);

module.exports = router;