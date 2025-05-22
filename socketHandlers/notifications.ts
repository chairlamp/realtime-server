export const registerNotificationHandlers = (io: any, socket: any) => {
  socket.on('subscribeToNotifications', (userId: string) => {
    socket.join(`user:${userId}`);
  });

  socket.on('sendNotification', ({ userId, title, body }: { userId: string; title: string; body: string }) => {
    io.to(`user:${userId}`).emit('notification', { title, body });
  });
};
