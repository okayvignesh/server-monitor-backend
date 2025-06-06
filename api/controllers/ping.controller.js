const { exec } = require("child_process");

exports.pingHost = (req, res) => {
  const { host } = req.query;
  if (!host) {
    return res.status(400).json({ error: "Host parameter is required" });
  }

  const sanitizedHost = host.replace(/[^a-zA-Z0-9\.\-]/g, "");

  const pingCommand =
    process.platform === "win32"
      ? `ping -n 4 ${sanitizedHost}`
      : `ping -c 4 ${sanitizedHost}`;

  exec(pingCommand, (error, stdout, stderr) => {
    if (error) {
      return res
        .status(500)
        .json({ success: false, error: `Ping failed: ${stderr || error.message}` });
    }
    res.json({ success: true, result: stdout });
  });
};
