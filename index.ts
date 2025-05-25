import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import dotenv from 'dotenv';
import { registerTrackingHandlers } from './socketHandlers/tracking';

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', // 🔒 Lock down in production
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket: Socket) => {
  console.log('Client connected:', socket.id);

  registerTrackingHandlers(io, socket); // ← Use your modular handler

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.SOCKET_PORT || 4000;
server.listen(PORT, () => {
  console.log(`Socket server running on port ${PORT}`);
});
