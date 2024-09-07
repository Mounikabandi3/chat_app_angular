"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
// Create Express application
const app = (0, express_1.default)();
const httpServer = new http_1.Server(app);
const io = new socket_io_1.Server(httpServer);
// Handle socket.io connections
io.on('connection', (socket) => {
    console.log('A user connected');
    // Handle request sending
    socket.on('send-request', (data) => {
        io.emit('new-request', data); // Broadcast to all connected clients
    });
    // Handle request responses
    socket.on('response', (data) => {
        io.emit('request-response', data); // Broadcast to all connected clients
    });
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});
// Start the server
httpServer.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
