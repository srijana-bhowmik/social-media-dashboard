const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const { addSocialAccount,getSocialAccounts,deleteSocialAccount } = require("../controllers/socialAccountController");

router.post( "/add", verifyToken, addSocialAccount );
router.get( "/all", verifyToken, getSocialAccounts );
router.delete( "/:id", verifyToken, deleteSocialAccount );

module.exports = router;