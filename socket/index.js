const { Server } = require("socket.io");
const cpuHandler = require("./handlers/cpu.handler");
const memoryHandler = require("./handlers/memory.handler");

function setupSocket(server) {
  try {    
    const io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
  
    io.on("connection", (socket) => {
      console.log("🔌 Client connected:", socket.id);
  
      cpuHandler(socket);
      memoryHandler(socket);
  
      socket.on("disconnect", () => {
        console.log("❌ Client disconnected:", socket.id);
      });
    });
  } catch (error) {
    console.log(error)
  }
}

module.exports = { setupSocket };
