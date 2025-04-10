import { Server } from "socket.io";

let io;

export const initWebSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Subscribe to stock updates
    socket.on("subscribe", (symbol) => {
      socket.join(symbol);
      console.log(`${socket.id} subscribed to ${symbol}`);
    });

    // Subscribe to user's personal room (for watchlist)
    socket.on("subscribeUser", (userId) => {
      socket.join(userId);
      console.log(`${socket.id} joined personal room: ${userId}`);
    });

    // Unsubscribe from stock updates
    socket.on("unsubscribe", (symbol) => {
      socket.leave(symbol);
      console.log(`${socket.id} unsubscribed from ${symbol}`);
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};

// ✅ This stays for stock price updates
export const broadcastPriceUpdate = (symbol, data) => {
  try {
    if (!io) throw new Error("WebSocket server not initialized");
    if (!symbol || !data) throw new Error("Invalid broadcast parameters");

    io.to(symbol).emit("priceUpdate", {
      symbol,
      ...data,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("WebSocket broadcast error:", err);
  }
};

// ✅ New function to emit watchlist updates
export const broadcastWatchlistUpdate = (userId, watchlist) => {
  try {
    if (!io) throw new Error("WebSocket server not initialized");
    if (!userId || !watchlist) throw new Error("Invalid broadcast parameters");

    io.to(userId).emit("watchlistUpdated", watchlist);
  } catch (err) {
    console.error("WebSocket watchlist broadcast error:", err);
  }
};
