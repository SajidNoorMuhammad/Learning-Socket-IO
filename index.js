const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const app = express();
const { Server } = require("socket.io");

const server = createServer(app);
const io = new Server(server);
const PORT = 5000;

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.emit("hello", "world");

io.on("connection", (socket) => {
  socket.broadcast.emit("hi");
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message " + msg);
  });
});

server.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
