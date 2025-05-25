// realtime-server/socketHandlers/tracking.ts
import { Server, Socket } from 'socket.io';

type Coords = {
  lat: number;
  lng: number;
};

export const registerTrackingHandlers = (io: Server, socket: Socket): void => {
  // Listen for driver location updates
  socket.on('driverLocationUpdate', ({ driverId, coords }: { driverId: string; coords: Coords }) => {
    if (!driverId || !coords) {
      console.warn('Malformed location update payload.');
      return;
    }

    console.log(`Driver ${driverId} updated location:`, coords);

    // Broadcast the location update to all connected clients (or handle as needed)
    io.emit('driverLocation', { driverId, coords });
  });
};
