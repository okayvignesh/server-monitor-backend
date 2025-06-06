const serverService = require("../services/server.service");

exports.getServerInfo = async (req, res) => {
  try {
    const info = await serverService.getServerInfo();
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Server info" });
  }
};

exports.getUptimeAndTimezone = async (req, res) => {
  try {
    const info = await serverService.getUptimeAndTimezone();
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Uptime/Timezone info" });
  }
};

exports.getLocation = async (req, res) => {
  try {
    const info = await serverService.getLocation();
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Uptime/Timezone info" });
  }
};
