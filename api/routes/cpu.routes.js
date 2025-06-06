const express = require('express');
const router = express.Router();
const cpuController = require('../controllers/cpu.controller');

router.get('/usage', cpuController.getCpuUsage);
router.get('/info', cpuController.getCpuInfo);

module.exports = router;