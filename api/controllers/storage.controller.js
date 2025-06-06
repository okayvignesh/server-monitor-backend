const storageService = require("../services/storage.service");

exports.getStorageInfo = async (req, res) => {
  try {
    const info = await storageService.getStorageInfo();
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch storage info" });
  }
};
