const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

// const { addMetrics, getMetricsByAccount, fetchAndStoreInstagramMetrics} = require("../controllers/metricsController");
const { getMetricsByAccount, fetchAndStoreInstagramMetrics} = require("../controllers/metricsController");

// router.post("/add",verifyToken,addMetrics);
router.get("/:accountId", verifyToken, getMetricsByAccount);
router.post("/instagram/fetch",verifyToken,fetchAndStoreInstagramMetrics);

module.exports = router;