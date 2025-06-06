const express = require("express");
const router = express.Router();
const serverController = require("../controllers/server.controller");

router.get("/info", serverController.getServerInfo);
router.get("/uptime", serverController.getUptimeAndTimezone);
router.get("/location", serverController.getLocation);

module.exports = router;
