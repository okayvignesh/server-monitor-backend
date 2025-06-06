const dockerService = require("../services/docker.service");

exports.getAllContainers = async (req, res) => {
  try {
    const containers = await dockerService.getAllContainers();
    res.json(containers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch containers data" });
  }
};
