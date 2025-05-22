import { Server, Socket } from 'socket.io';
import {
  DriverLocationUpdatePayload,
  OrderTrackingUpdatePayload
} from '../types/socket';

export const registerTrackingHandlers = (io: Server, socket: Socket) => {
  socket.on('joinDriverRoom', (driverId: string) => {
    socket.join(`driver:${driverId}`);
    console.log(`Driver ${driverId} joined room driver:${driverId}`);
  });

  socket.on('driverLocationUpdate', ({ driverId, coords }: DriverLocationUpdatePayload) => {
    io.to(`driver:${driverId}`).emit('driverLocation', { coords });
    console.log(`Location update from driver ${driverId}: ${JSON.stringify(coords)}`);
  });

  socket.on('joinOrderTrackingRoom', (orderId: string) => {
    socket.join(`tracking:${orderId}`);
    console.log(`User joined tracking room tracking:${orderId}`);
  });

  socket.on('updateOrderDriverLocation', ({ orderId, coords }: OrderTrackingUpdatePayload) => {
    io.to(`tracking:${orderId}`).emit('driverLocationUpdate', { coords });
    console.log(`Driver location for order ${orderId} updated: ${JSON.stringify(coords)}`);
  });
};
