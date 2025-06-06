const si = require("systeminformation");

module.exports = function cpuHandler(socket) {
  const interval = setInterval(async () => {
    try {
      const cpuLoad = await si.currentLoad();
      socket.emit("cpuStats", {
        usage: cpuLoad.currentLoad.toFixed(2),
      });
    } catch (err) {
      console.error("Error sending CPU stats:", err);
    }
  }, 1000);

  socket.on("disconnect", () => clearInterval(interval));
};
