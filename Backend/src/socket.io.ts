import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer, Socket } from 'socket.io';
import mongoose from 'mongoose';
import { User, Message } from './models';

// Create Express application
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

// TypeScript interface for socket data
interface RequestData {
  sender: string;
  receiver: string;
}

interface ResponseData {
  requestId: string;
  response: 'accepted' | 'rejected';
}

// Handle socket.io connections
io.on('connection', (socket: Socket) => {
  console.log('A user connected');

  // Handle request sending
  socket.on('send-request', (data: RequestData) => {
    io.emit('new-request', data); // Broadcast to all connected clients
  });

  // Handle request responses
  socket.on('response', (data: ResponseData) => {
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
