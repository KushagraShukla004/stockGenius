import React, { useEffect, useRef, useState, useCallback } from "react";
import { createChart, CrosshairMode, CandlestickSeries } from "lightweight-charts";
import Loader from "../ui/Loader";
import useFinnhubWebSocket from "@/hooks/useFinnhubWebSocket";

const TradingChart = ({ symbol, interval = "1min" }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candlestickSeriesRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRealtimeUpdate = useCallback((newCandle) => {
    console.log(newCandle);
    if (!candlestickSeriesRef.current) return;

    setData((prevData) => {
      const lastCandle = prevData[prevData.length - 1];

      if (lastCandle && Math.floor(lastCandle.time) === Math.floor(newCandle.time)) {
        // Update existing candle
        const updatedCandle = {
          ...lastCandle,
          high: Math.max(lastCandle.high, newCandle.close),
          low: Math.min(lastCandle.low, newCandle.close),
          close: newCandle.close,
        };
        candlestickSeriesRef.current.update(updatedCandle);
        return [...prevData.slice(0, -1), updatedCandle];
      } else {
        // Add new candle
        candlestickSeriesRef.current.update(newCandle);
        return [...prevData, newCandle];
      }
    });
  }, []);

  // Use the WebSocket hook
  useFinnhubWebSocket(symbol, handleRealtimeUpdate);

  const fetchAlphaVantageData = useCallback(async () => {
    try {
      const res = await fetch(`/api/stocks/${symbol}/candles?interval=${interval}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const raw = await res.json();
      if (!Array.isArray(raw)) throw new Error("Invalid data format");

      return raw.map((item) => ({
        time: Math.floor(new Date(item.date).getTime() / 1000),
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
      }));
    } catch (err) {
      console.error("Failed to fetch Alpha Vantage data", err);
      throw err;
    }
  }, [symbol, interval]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const candles = await fetchAlphaVantageData();

        candles.sort((a, b) => a.time - b.time);
        setData(candles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [symbol, interval, fetchAlphaVantageData]);

  useEffect(() => {
    if (!chartContainerRef.current || !data.length) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: { background: { color: "#0f172a" }, textColor: "#cbd5e1" },
      grid: {
        vertLines: { color: "#334155" },
        horzLines: { color: "#334155" },
      },
      crosshair: { mode: CrosshairMode.Normal },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#16a34a",
      downColor: "#dc2626",
      borderVisible: false,
      wickUpColor: "#16a34a",
      wickDownColor: "#dc2626",
    });

    candlestickSeries.setData(data);
    chartRef.current = chart;
    candlestickSeriesRef.current = candlestickSeries;

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
        chartRef.current.timeScale().fitContent();
      }
    };

    window.addEventListener("resize", handleResize);

    resizeObserverRef.current = new ResizeObserver(() => {
      handleResize();
    });

    const containerElement = chartContainerRef.current;
    resizeObserverRef.current.observe(containerElement);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeObserverRef.current && containerElement) {
        resizeObserverRef.current.unobserve(containerElement);
      }
      chart.remove();
    };
  }, [data]);

  return (
    <div className="w-full h-full relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <Loader />
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 text-red-500">
          Error: {error}
        </div>
      )}
      <div ref={chartContainerRef} className="w-full h-full" />
    </div>
  );
};

export default TradingChart;
