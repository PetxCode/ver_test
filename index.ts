import http from "node:http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";

const port: number = 3011;
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  // Custom event example
  socket.on("message", (msg) => {
    console.log("Message received:", msg);
    io.emit("message", "gready"); // Send back to all clients
  });

  socket.on("count", (res) => {
    io.emit("count", res);
  });

  socket.on("reset", (res) => {
    io.emit("reset", res);
  });

  socket.on("clear", (res) => {
    io.emit("clear", res);
  });
});

server.listen(process.env.PORT || port, () => {
  console.clear();

  console.log(`Server is running on port ${port}`);
});

module.exports = app;
