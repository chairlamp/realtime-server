export const registerTrackingHandlers = (io: any, socket: any) => {
  socket.on('joinDriverRoom', (driverId: string) => {
    socket.join(`driver:${driverId}`);
  });

  socket.on('driverLocationUpdate', ({ driverId, coords }: { driverId: string; coords: { lat: number; lng: number } }) => {
    io.to(`driver:${driverId}`).emit('driverLocation', { coords });
  });

  socket.on('joinOrderTrackingRoom', (orderId: string) => {
    socket.join(`tracking:${orderId}`);
  });

  socket.on('updateOrderDriverLocation', ({ orderId, coords }: { orderId: string; coords: { lat: number; lng: number } }) => {
    io.to(`tracking:${orderId}`).emit('driverLocationUpdate', { coords });
  });
};
