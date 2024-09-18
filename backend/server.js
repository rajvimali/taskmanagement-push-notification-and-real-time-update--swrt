// backend/server.js
// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");
// const jwt = require("jsonwebtoken");

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// Secret key for JWT
// const JWT_SECRET = "your_jwt_secret_key";

// Middleware to authenticate Socket.io connections
// io.use((socket, next) => {
//   const token = socket.handshake.query.token; // Get token from the client

//   if (token) {
//     jwt.verify(token, JWT_SECRET, (err, decoded) => {
//       if (err) {
//         console.log("Socket.io authentication error:", err);
//         return next(new Error("Authentication error"));
//       }
// Attach the decoded user to the socket object
//       socket.user = decoded;
//       next();
//     });
//   } else {
//     next(new Error("Authentication error"));
//   }
// });

// Handle Socket.io connections
// io.on("connection", (socket) => {
//   console.log(`User ${socket.user.id} connected`);

//   socket.on("taskUpdated", (data) => {
// Emit the update to all connected clients
//     io.emit("taskUpdated", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });

// io.on("connection", (socket) => {
//   socket.on("taskUpdated", async (task) => {
//     // Broadcast task updates
//     io.emit("taskUpdated", task);

// Send push notification to users involved
//     const fcmToken = "user_fcm_token"; // Fetch the user's FCM token from the database
//     const message = `Task ${task.name} has been updated!`;
//     await sendPushNotification(fcmToken, message);
//   });
// });

// server.listen(5000, () => {
//   console.log("Server running on port 5000");
// });

// ======================================================================

// backend/server.js
const express = require("express");
const http = require("http"); // Needed for Socket.io
const socketIo = require("socket.io");
const jwt = require("jsonwebtoken");
const messaging = require("./controllers/firebaseadmin"); // For sending notifications if needed
const app = express();

// Create an HTTP server for Socket.io
const server = http.createServer(app);
const io = socketIo(server); // Create a Socket.io instance

// JWT Secret for Socket.io Authentication
const JWT_SECRET = "your_jwt_secret_key";

// Middleware to authenticate Socket.io connections using JWT
io.use((socket, next) => {
  const token = socket.handshake.query.token;
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(new Error("Authentication error"));
      }
      socket.user = decoded; // Attach user info to socket
      next();
    });
  } else {
    next(new Error("Authentication error"));
  }
});

// Handle Socket.io connections
io.on("connection", (socket) => {
  console.log("User connected", socket.user.id);

  // Emit task updates to all connected users
  socket.on("taskUpdated", (task) => {
    if (socket.user.id === data.assignedTo) {
      io.emit("taskUpdated", task); // Broadcast task update to all connected clients
    }
  });
  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  // Emit new comment updates to all connected users
  socket.on("newComment", (comment) => {
    io.emit("newComment", comment); // Broadcast new comment to all connected clients
  });

  // Emit new task creation to all connected users
  socket.on("newTask", (task) => {
    io.emit("newTask", task); // Broadcast new task creation to all connected clients
  });
});

// Start the server
server.listen(5000, () => {
  console.log("Server running on port 5000");
});
