import Stock from "../models/Stock.js";
import { getCache, setCache } from "../utils/cache.js";
import {
  getIntradayData,
  getDailyCandlesticks,
  getSMA,
  getRSI,
  getFundamentals,
  fetchGlobalQuote,
  searchSymbol,
  getIntradayCandlesticks,
} from "../utils/alphaVantage.js";
// import { broadcastPriceUpdate } from "../utils/webSocket.js";

// GET /api/stocks
export const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find().sort({ symbol: 1 });
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ error: "Failed to load stocks" });
  }
};

// GET /api/stocks/:symbol/live
export const getLiveStockData = async (req, res) => {
  const { symbol } = req.params;
  const upperSymbol = symbol.toUpperCase();
  const cacheKey = `stock:live:${upperSymbol}`;

  try {
    // Check cache
    const cached = await getCache(cacheKey);
    if (cached) return res.json(cached);

    // Validate symbol using Alpha's SYMBOL_SEARCH
    const searchResult = await searchSymbol(upperSymbol);
    const bestMatch = searchResult.bestMatches?.find(
      (match) => match["1. symbol"].toUpperCase() === upperSymbol
    );

    if (!bestMatch) {
      return res.status(404).json({ error: `Symbol "${upperSymbol}" not found.` });
    }

    // Fetch live data
    const [intraday, sma, rsi, fundamentals] = await Promise.all([
      getIntradayData(upperSymbol),
      getSMA(upperSymbol),
      getRSI(upperSymbol),
      getFundamentals(upperSymbol),
    ]);

    const payload = {
      symbol: upperSymbol,
      intraday,
      sma,
      rsi,
      fundamentals,
    };

    // Cache the response for 5 minutes
    await setCache(cacheKey, payload, 300);

    // Dynamically store to DB if not already present
    const exists = await Stock.findOne({ symbol: upperSymbol });
    if (!exists && fundamentals?.Name) {
      await Stock.create({
        symbol: upperSymbol,
        name: fundamentals.Name,
        sector: fundamentals.Sector,
        industry: fundamentals.Industry,
        logoUrl: null,
        marketCap: parseFloat(fundamentals.MarketCapitalization || 0),
        peRatio: parseFloat(fundamentals.PERatio || 0),
      });
    }

    res.json(payload);
  } catch (err) {
    console.error("Stock fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch stock data." });
  }
};

// GET /api/stocks/:symbol/candles
// export const getCandlestickData = async (req, res) => {
//   const { symbol } = req.params;
//   const cacheKey = `stock:candles:${symbol}`;

//   try {
//     const cached = await getCache(cacheKey);
//     if (cached) return res.json(cached);

//     const raw = await getDailyCandlesticks(symbol);
//     const timeSeries = raw["Time Series (Daily)"];
//     const transformed = Object.entries(timeSeries).map(([date, values]) => ({
//       date,
//       open: parseFloat(values["1. open"]),
//       high: parseFloat(values["2. high"]),
//       low: parseFloat(values["3. low"]),
//       close: parseFloat(values["4. close"]),
//       volume: parseInt(values["5. volume"]),
//     }));

//     await setCache(cacheKey, transformed, 3600); // cache for 1 hour
//     res.json(transformed);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch candlestick data." });
//   }
// };
export const getCandlestickData = async (req, res) => {
  const { symbol } = req.params;
  const { interval = "1D" } = req.query; // default is 1D
  const upperSymbol = symbol.toUpperCase();

  const cacheKey = `stock:candles:${upperSymbol}:${interval}`;

  try {
    const cached = await getCache(cacheKey);
    if (cached) return res.json(cached);

    let raw, timeSeries;

    if (interval === "1D") {
      raw = await getDailyCandlesticks(upperSymbol);
      timeSeries = raw["Time Series (Daily)"];
    } else {
      raw = await getIntradayCandlesticks(upperSymbol, interval);
      timeSeries = raw[`Time Series (${interval})`];
    }

    if (!timeSeries) {
      return res
        .status(404)
        .json({ error: "Data not available. Try again later or check interval." });
    }

    const transformed = Object.entries(timeSeries).map(([date, values]) => ({
      date,
      open: parseFloat(values["1. open"]),
      high: parseFloat(values["2. high"]),
      low: parseFloat(values["3. low"]),
      close: parseFloat(values["4. close"]),
      volume: parseInt(values["5. volume"]),
    }));

    await setCache(cacheKey, transformed, 300); // cache for 5 min
    res.json(transformed);
  } catch (err) {
    console.error("Error fetching candlesticks:", err.message);
    res.status(500).json({ error: "Failed to fetch candlestick data." });
  }
};
// Get current price with caching
export const getStockPriceData = async (req, res) => {
  const { symbol } = req.params;
  const cacheKey = `price-${symbol}`;
  const upperSymbol = symbol.toUpperCase();

  try {
    // cached data checking
    const cached = await getCache(cacheKey);
    if (cached) {
      return res.status(200).json({
        success: true,
        fromCache: true,
        // webSocketBroadcasted: false,
        data: cached,
      });
    }

    // Fetch fresh data if no cache
    const data = await fetchGlobalQuote(upperSymbol);
    const stockData = {
      symbol: upperSymbol,
      price: data["Global Quote"]["05. price"],
      change: data["Global Quote"]["10. change percent"],
      volume: data["Global Quote"]["06. volume"],
    };

    // Update cache
    await setCache(cacheKey, stockData, 300); // Cache for 5 minutes

    // Broadcast real-time update
    // broadcastPriceUpdate(upperSymbol, stockData);

    // response
    res.status(200).json({
      success: true,
      fromCache: false,
      // webSocketBroadcasted: true,
      data: stockData,
    });
  } catch (err) {
    console.error("Error in getStockPriceData:", err);
    res.status(500).json({
      success: false,
      error: "Failed to fetch stock data",
    });
  }
};
