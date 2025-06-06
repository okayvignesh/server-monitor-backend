function startBackend() {
  const express = require("express");
  const cors = require("cors");
  const app = express();
  const http = require('http');
  const routes = require("./api/routes");
  const { setupSocket } = require("./socket/index");
  const PORT = process.env.PORT || 4002;
  

  const server = http.createServer(app);
  setupSocket(server); // attach socket to server

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Basic route
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to the API" });
  });

  app.use("/api", routes);

  server.listen(PORT, () => {
    console.log(`🟢 Backend API running on http://localhost:${PORT}`);
  });
}

startBackend();

module.exports = startBackend;
