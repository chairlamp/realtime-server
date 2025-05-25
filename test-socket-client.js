const { io } = require("socket.io-client");

// Add your driverId here
const driverId = "driver_abc_123"; // Ideally unique per driver

const socket = io("wss://realtime-server-production-c92a.up.railway.app", {
  transports: ["websocket"],
  auth: {
    driverId, // ✅ Sent to server
  },
});

socket.on("connect", () => {
  console.log("✅ Connected to socket server:", socket.id);
  console.log("👤 Driver ID used:", driverId); // ✅ Log what you sent
});
