const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const { getDashboardSummary } = require("../controllers/dashboardController");

router.get(
    "/summary",
    verifyToken,
    getDashboardSummary
);

module.exports = router;