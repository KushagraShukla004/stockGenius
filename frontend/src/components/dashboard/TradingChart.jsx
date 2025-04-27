import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode, CandlestickSeries } from "lightweight-charts";

const TradingChart = ({ symbol, interval = "1D" }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!symbol) return;

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/stocks/${symbol}/candles?interval=${interval}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const raw = await res.json();
        if (!Array.isArray(raw)) throw new Error("Invalid data format");

        const formatted = raw.map((item) => ({
          time: Math.floor(new Date(item.date).getTime() / 1000),
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
        }));

        formatted.sort((a, b) => a.time - b.time);
        setData(formatted);
      } catch (err) {
        console.error("Failed to fetch candlestick data", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol, interval]);

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
      timeScale: { timeVisible: true },
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#16a34a",
      downColor: "#dc2626",
      borderVisible: false,
      wickUpColor: "#16a34a",
      wickDownColor: "#dc2626",
    });

    series.setData(data);
    chartRef.current = chart;
    seriesRef.current = series;

    chart.timeScale().fitContent();

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

    // chart container size changes when sidebar or bottom panel changes
    resizeObserverRef.current = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserverRef.current.observe(chartContainerRef.current);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeObserverRef.current && chartContainerRef.current) {
        resizeObserverRef.current.unobserve(chartContainerRef.current);
      }
      chart.remove();
    };
  }, [data]);

  return (
    <div className="w-full h-full relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          Loading...
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
