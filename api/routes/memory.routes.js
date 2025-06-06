const express = require("express");
const router = express.Router();
const memoryController = require("../controllers/memory.controller");

router.get("/usage", memoryController.getMemoryUsage);

module.exports = router;
