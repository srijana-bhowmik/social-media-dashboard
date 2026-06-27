const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const { getDashboardSummary, getUserAccounts ,getPlatformComparison, getLikesDistribution} = require("../controllers/dashboardController");

router.get(
    "/summary",
    verifyToken,
    getDashboardSummary
);

router.get(
    "/accounts",
    verifyToken,
    getUserAccounts
);

router.get(
    "/platform-comparison",
    verifyToken,
    getPlatformComparison
);

router.get(
    "/likes-distribution",
    verifyToken,
    getLikesDistribution
);

module.exports = router;