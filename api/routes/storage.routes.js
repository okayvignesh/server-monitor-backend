const express = require("express");
const router = express.Router();
const storageController = require("../controllers/storage.controller");

router.use("/info", storageController.getStorageInfo);


module.exports = router;