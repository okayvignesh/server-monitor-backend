const express = require("express");
const router = express.Router();
const dockerController = require("../controllers/docker.controller");

router.use("/containers", dockerController.getAllContainers);

module.exports = router;
