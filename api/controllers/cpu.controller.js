const cpuService = require("../services/cpu.service");

exports.getCpuUsage = async (req, res) => {
  try {
    const usage = await cpuService.fetchCpuUsage();
    res.json({ usage });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch CPU usage" });
  }
};

exports.getCpuInfo = async (req, res) => {
  try {
    const info = await cpuService.getCpuInfo();
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch CPU info" });
  }
};
