const { io } = require("socket.io-client");

const socket = io("wss://realtime-server-production-c92a.up.railway.app", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("✅ Connected to socket server:", socket.id);
});

socket.on("driverLocation", (data) => {
  console.log("📍 Received driver location:", data);
});

socket.on("disconnect", (reason) => {
  console.warn("❌ Disconnected from socket server:", reason);
});

socket.on("connect_error", (error) => {
  console.error("⚠️ Connection error:", error.message);
});
