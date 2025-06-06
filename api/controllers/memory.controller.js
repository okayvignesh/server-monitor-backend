const memoryService = require("../services/memory.service");

exports.getMemoryUsage = async (req, res) => {
  try {
    const usage = await memoryService.fetchMemoryUsage();
    res.json({ usage });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch CPU usage" });
  }
};
