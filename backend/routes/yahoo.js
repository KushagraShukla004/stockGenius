import express from "express";
import fetch from "node-fetch";

const router = express.Router();
router.get("/:symbol", async (req, res) => {
  const { symbol } = req.params;
  const { interval = "1m", range = "1d" } = req.query;

  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${interval}&range=${range}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.chart.error) {
      return res.status(400).json({ error: data.chart.error.description });
    }

    res.json({
      timestamp: data.chart.result[0].timestamp,
      indicators: data.chart.result[0].indicators,
    });
  } catch (err) {
    console.error("Yahoo API error:", err);
    res.status(500).json({ error: "Failed to fetch data from Yahoo Finance" });
  }
});

export default router;
