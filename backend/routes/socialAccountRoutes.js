const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const { addSocialAccount,getSocialAccounts,deleteSocialAccount,syncAccount } = require("../controllers/socialAccountController");
const authorizeRoles = require("../middleware/roleMiddleware");

router.post( "/add", verifyToken,authorizeRoles("admin"), addSocialAccount );
router.get( "/all", verifyToken, getSocialAccounts );
router.delete( "/:id", verifyToken,authorizeRoles("admin"), deleteSocialAccount );
router.post("/sync/:id", verifyToken,authorizeRoles("admin"), syncAccount);

module.exports = router;