const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const { addSocialAccount,getSocialAccounts,deleteSocialAccount } = require("../controllers/socialAccountController");
const authorizeRoles = require("../middleware/roleMiddleware");

router.post( "/add", verifyToken,authorizeRoles("admin"), addSocialAccount );
router.get( "/all", verifyToken, getSocialAccounts );
router.delete( "/:id", verifyToken,authorizeRoles("admin"), deleteSocialAccount );

module.exports = router;