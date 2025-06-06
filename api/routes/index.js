const express = require("express");
const router = express.Router();

const cpuRoutes = require("./cpu.routes");
const memoryRoutes = require("./memory.routes");
const serverRoutes = require("./server.routes");
const pingRoutes = require("./ping.routes");

router.use("/cpu", cpuRoutes);
router.use("/server", serverRoutes);
router.use("/memory", memoryRoutes);
router.use("/ping", pingRoutes);

module.exports = router;