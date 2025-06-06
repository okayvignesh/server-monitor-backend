const si = require("systeminformation");

module.exports = function memoryHandler(socket) {
  const interval = setInterval(async () => {
    try {
      const mem = await si.mem();
      socket.emit("memoryStats", {
        total: mem.total,
        used: mem.used,
        free: mem.free,
      });
    } catch (err) {
      console.error("Error sending memory stats:", err);
    }
  }, 1000);

  socket.on("disconnect", () => clearInterval(interval));
};
