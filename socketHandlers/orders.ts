export const registerOrderHandlers = (io: any, socket: any) => {
  socket.on('joinOrderRoom', (orderId: string) => {
    socket.join(`order:${orderId}`);
  });

  socket.on('updateOrderStatus', ({ orderId, status }: { orderId: string; status: string }) => {
    io.to(`order:${orderId}`).emit('orderStatusUpdated', { orderId, status });
  });
};
