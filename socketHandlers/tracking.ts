import { Server, Socket } from 'socket.io';

export function registerTrackingHandlers(io: Server, socket: Socket) {
  const driverName = socket.handshake.auth?.driverName;

  if (!driverName) {
    console.warn('❌ Unauthorized connection attempt. No driverName.');
    socket.emit('unauthorized', { message: 'Missing driverName' });
    socket.disconnect();
    return;
  }

  console.log(`✅ Driver connected: ${driverName} via socket ${socket.id}`);

  socket.on('driverLocation', ({ coords }: { coords: { lat: number; lng: number } }) => {
    if (!coords || typeof coords.lat !== 'number' || typeof coords.lng !== 'number') {
      console.warn(`⚠️ Invalid location data from ${driverName}`);
      return;
    }

    console.log(`📍 Location update from ${driverName}:`, coords);

    io.emit('driverLocation', {
      driverName,
      coords,
    });
  });

  socket.on('disconnect', (reason: any) => {
    console.log(`❌ Driver ${driverName} disconnected. Reason: ${reason}`);
  });
}
