import { useEffect, useRef } from "react";

const useFinnhubWebSocket = (symbol, onDataUpdate) => {
  // Store candle data in a ref to persist between renders and avoid unnecessary re-renders
  const candleMapRef = useRef({});

  useEffect(() => {
    // Checks if the market is currently open
    const isMarketOpen = () => {
      const now = new Date();
      const day = now.getUTCDay();
      // Market is closed on weekends (0 = Sunday, 6 = Saturday)
      if (day === 0 || day === 6) return false;

      // Convert current time to Eastern Time (ET) - US market timezone
      const options = {
        timeZone: "America/New_York",
        hour: "numeric",
        minute: "numeric",
      };
      const etTime = new Date().toLocaleTimeString("en-US", options);
      const [hours, minutes] = etTime.split(":").map(Number);

      // Market hours: 9:30 AM - 4:00 PM ET
      const isOpen = hours >= 9 && hours < 16 && (hours !== 9 || minutes >= 30);
      return isOpen;
    };

    let socket;
    let marketCheckInterval;
    // Queue to store messages if socket isn't ready yet
    const messageQueue = [];

    /**
     * Establishes WebSocket connection to Finnhub API
     */
    const connectWebSocket = () => {
      if (!isMarketOpen()) return;

      // Create WebSocket connection with API key
      socket = new WebSocket(
        `wss://ws.finnhub.io?token=${import.meta.env.VITE_FINNHUB_API_KEY}`
      );

      // When connection is established
      socket.addEventListener("open", () => {
        console.log("WebSocket connected");
        // Send any queued messages
        while (messageQueue.length > 0) {
          const msg = messageQueue.shift();
          socket.send(msg);
        }
        // Subscribe to the specified stock symbol
        socket.send(JSON.stringify({ type: "subscribe", symbol }));
      });

      // Process incoming messages from WebSocket
      socket.addEventListener("message", (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "trade") {
          // Process each trade in the data array
          data.data.forEach((trade) => {
            // Convert milliseconds to seconds
            const timestamp = Math.floor(trade.t / 1000);
            // Round down to the nearest minute (60 seconds)
            const minute = Math.floor(timestamp / 60) * 60;

            // Create a new candle if one doesn't exist for this minute
            if (!candleMapRef.current[minute]) {
              candleMapRef.current[minute] = {
                time: minute,
                open: trade.p,
                high: trade.p,
                low: trade.p,
                close: trade.p,
              };
            } else {
              // Update existing candle with new trade data
              const candle = candleMapRef.current[minute];
              candle.high = Math.max(candle.high, trade.p); // Update high if new price is higher
              candle.low = Math.min(candle.low, trade.p); // Update low if new price is lower
              candle.close = trade.p; // Always update close with most recent price
            }

            // Send the updated candle to the callback function
            onDataUpdate(candleMapRef.current[minute]);
          });
        }
      });

      // Handle WebSocket errors
      socket.addEventListener("error", (error) => {
        console.error("WebSocket error:", error);
      });

      // Handle WebSocket disconnection
      socket.addEventListener("close", () => {
        console.log("WebSocket disconnected");
      });

      // Check market status every minute and close connection if market closes
      marketCheckInterval = setInterval(() => {
        if (!isMarketOpen() && socket) {
          socket.close();
        }
      }, 60000); // 60000ms = 1 minute
    };

    // Only connect if market is open
    if (isMarketOpen()) {
      console.log("connectWebSocket()");
      connectWebSocket();
    }

    // Cleanup function to run when component unmounts or dependencies change
    return () => {
      // If socket is open, unsubscribe and close it
      if (socket?.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "unsubscribe", symbol }));
        socket.close();
      }
      // Clear the market check interval
      clearInterval(marketCheckInterval);
    };
  }, [symbol, onDataUpdate]); // Re-run effect if symbol or callback changes
};

export default useFinnhubWebSocket;
