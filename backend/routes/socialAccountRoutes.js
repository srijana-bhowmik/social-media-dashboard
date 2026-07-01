const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const { addSocialAccount,getSocialAccounts,deleteSocialAccount } = require("../controllers/socialAccountController");
const authorizeRoles = require("../middleware/roleMiddleware");

router.post( "/add", verifyToken,  addSocialAccount );
router.get( "/all", verifyToken, getSocialAccounts );
router.delete( "/delete/:id", verifyToken, deleteSocialAccount );
// router.post("/sync/:id",  syncAccount);

module.exports = router;