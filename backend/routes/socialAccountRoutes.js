const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const { addSocialAccount,getSocialAccounts } = require("../controllers/socialAccountController");

router.post( "/add", verifyToken, addSocialAccount );
router.get( "/all", verifyToken, getSocialAccounts );

module.exports = router;