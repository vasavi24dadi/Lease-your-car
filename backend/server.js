require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));
// middleware
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// database
const pool = require("./config/db");

// Store connected users (owner_id -> socket_id)
global.connectedUsers = {};

// Socket.io connection handler
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // User joins with their ID
  socket.on("join", (userId) => {
    socket.join(`user-${userId}`);
    connectedUsers[userId] = socket.id;
    console.log(`User ${userId} joined room user-${userId}`);
  });

  // Disconnect handler
  socket.on("disconnect", () => {
    // Remove user from connectedUsers
    for (let userId in connectedUsers) {
      if (connectedUsers[userId] === socket.id) {
        delete connectedUsers[userId];
        break;
      }
    }
    console.log("User disconnected:", socket.id);
  });
});

// Export io for other modules
app.use((req, res, next) => {
  req.io = io;
  next();
});

// routes (ALL requires FIRST)
const userRoutes = require("./routes/userRoutes");
const carRoutes = require("./routes/carRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const chatRoutes = require("./routes/chatRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const testRoutes = require("./routes/testRoutes");

// base route
app.get("/", (req, res) => {
  res.send("Lease Your Car backend is running!");
});

// use routes (AFTER require)
app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api", testRoutes);

// server
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";
server.listen(PORT, HOST, () => {
  console.log(`Server started on port ${PORT}`);
});
