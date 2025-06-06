const express = require("express");
const router = express.Router();

const cpuRoutes = require("./cpu.routes");
const memoryRoutes = require("./memory.routes");
const serverRoutes = require("./server.routes");
const storageRoutes = require("./storage.routes");
const pingRoutes = require("./ping.routes");
const dockerRoutes = require("./docker.routes");

router.use("/cpu", cpuRoutes);
router.use("/server", serverRoutes);
router.use("/memory", memoryRoutes);
router.use("/storage", storageRoutes);
router.use("/ping", pingRoutes);
router.use("/docker", dockerRoutes);

module.exports = router;