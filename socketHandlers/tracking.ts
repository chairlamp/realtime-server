import { Server, Socket } from 'socket.io';

export function registerTrackingHandlers(io: Server, socket: Socket) {
  const driverId = socket.handshake.auth?.driverId;

  if (!driverId) {
    console.warn('❌ Unauthorized connection attempt. No driverId.');
    socket.emit('unauthorized', { message: 'Missing driverId' });
    socket.disconnect();
    return;
  }

  console.log(`✅ Driver connected: ${driverId} via socket ${socket.id}`);

  socket.on('driverLocation', ({ coords }: { coords: { lat: number; lng: number } }) => {
    if (!coords || typeof coords.lat !== 'number' || typeof coords.lng !== 'number') {
      console.warn(`⚠️ Invalid location data from ${driverId}`);
      return;
    }

    console.log(`📍 Location update from ${driverId}:`, coords);

    // OPTIONAL: Emit only to subscribers of this driver
    io.emit('driverLocation', {
      driverId,
      coords,
    });
  });

  socket.on('disconnect', (reason) => {
    console.log(`❌ Driver ${driverId} disconnected. Reason: ${reason}`);
  });
}
