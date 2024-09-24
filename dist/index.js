"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = __importDefault(require("node:http"));
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const port = 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = node_http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
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
server.listen(port, () => {
    console.clear();
    console.log(`Server is running on port ${port}`);
});
module.exports = app;
