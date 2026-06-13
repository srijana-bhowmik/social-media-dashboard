const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const { addMetrics, getMetricsByAccount} = require("../controllers/metricsController");

router.post("/add",verifyToken,addMetrics);
router.get("/:accountId", verifyToken, getMetricsByAccount);

module.exports = router;