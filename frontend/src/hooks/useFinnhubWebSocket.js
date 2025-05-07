import { useEffect } from "react";

const useFinnhubWebSocket = (symbol, onDataUpdate) => {
  useEffect(() => {
    const isMarketOpen = () => {
      const now = new Date();
      const day = now.getUTCDay();
      if (day === 0 || day === 6) {
        console.log("Market closed: Weekend");
        return false;
      }

      const options = {
        timeZone: "America/New_York",
        hour: "numeric",
        minute: "numeric",
      };
      const etTime = new Date().toLocaleTimeString("en-US", options);
      const [hours, minutes] = etTime.split(":").map(Number);
      const isOpen = hours >= 9 && hours < 16 && (hours !== 9 || minutes >= 30);
      if (!isOpen) {
        console.log(`Market closed: Current ET time ${hours}:${minutes}`);
      }
      return isOpen;
    };

    let socket;
    let marketCheckInterval;
    const messageQueue = [];

    const connectWebSocket = () => {
      if (!isMarketOpen()) return;

      socket = new WebSocket(
        `wss://ws.finnhub.io?token=${import.meta.env.VITE_FINNHUB_API_KEY}`
      );

      socket.addEventListener("open", () => {
        console.log("WebSocket connected");
        while (messageQueue.length > 0) {
          const msg = messageQueue.shift();
          socket.send(msg);
        }
        socket.send(JSON.stringify({ type: "subscribe", symbol }));
      });

      socket.addEventListener("message", (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "trade") {
          const trade = data.data[0];
          const newCandle = {
            time: Math.floor(trade.t / 1000),
            open: trade.p,
            high: trade.p,
            low: trade.p,
            close: trade.p,
          };

          onDataUpdate(newCandle);
        }
      });

      socket.addEventListener("error", (error) => {
        console.error("WebSocket error:", error);
      });

      socket.addEventListener("close", () => {
        console.log("WebSocket disconnected");
      });

      marketCheckInterval = setInterval(() => {
        if (!isMarketOpen() && socket) {
          socket.close();
        }
      }, 60000);
    };

    if (isMarketOpen()) {
      console.log("connectWebSocket()");
      connectWebSocket();
    }

    return () => {
      if (socket) {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ type: "unsubscribe", symbol }));
        } else {
          messageQueue.length = 0;
        }
        socket.close();
      }
      if (marketCheckInterval) {
        clearInterval(marketCheckInterval);
      }
    };
  }, [symbol, onDataUpdate]);
};

export default useFinnhubWebSocket;
