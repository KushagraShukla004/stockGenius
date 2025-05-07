import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch, FaStar, FaChartLine } from "react-icons/fa";
import TradingChart from "@/components/dashboard/TradingChart";
import { getWatchlist, toggleWatchlist } from "@/store/slices/watchlistSlice";
import { getAIAnalysis } from "@/store/slices/aiSlice";
import { getAllStocks } from "@/store/slices/stockSlice";
import Modal from "@/components/ui/Modal";
import Loader from "@/components/ui/Loader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { watchlist, loading: watchlistLoading } = useSelector(
    (state) => state.watchlist
  );
  const { stocks, loading: stocksLoading } = useSelector((state) => state.stocks);
  const { analysis, loading: analysisLoading } = useSelector((state) => state.ai);

  const [symbol, setSymbol] = useState("AAPL");
  const [interval, setInterval] = useState("1min");
  const [showAllStocks, setShowAllStocks] = useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);

  const intervals = ["1min", "5min", "15min", "1D"];

  useEffect(() => {
    dispatch(getWatchlist());
    dispatch(getAllStocks());
  }, [dispatch]);

  const handleAIAnalysis = async () => {
    // Open the modal immediately
    setShowAnalysisModal(true);

    // Fetch the analysis
    await dispatch(getAIAnalysis(symbol));
  };

  const handleStockSelect = (stock) => {
    setSymbol(stock.symbol);
    setShowAllStocks(false);
  };

  const handleWatchlistToggle = async (stock) => {
    await dispatch(toggleWatchlist({ symbol: stock.symbol, name: stock.name }));
    dispatch(getWatchlist());
  };

  const isStockInWatchlist = (stockSymbol) => {
    return watchlist.some((stk) => stk.symbol === stockSymbol);
  };

  return (
    <div className="h-[calc(100vh-64px)] w-full flex flex-col md:flex-row bg-background text-foreground overflow-hidden">
      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
        {/* Chart Section */}
        <div
          className={`flex-1 h-[calc(100%-9rem)] p-4 relative transition-all duration-300`}
        >
          {/* Interval Selector */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-1 overflow-x-auto scrollbar-none">
              {intervals.map((i) => (
                <button
                  key={i}
                  onClick={() => setInterval(i)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                    i === interval
                      ? "bg-primary text-primary-fg"
                      : "bg-muted hover:bg-muted/80 text-foreground"
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
            <button
              onClick={handleAIAnalysis}
              className="ml-auto shrink-0 bg-primary/90 hover:bg-primary text-primary-fg px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
            >
              AI Analysis
            </button>
          </div>

          {/* Chart Container */}
          <div className="h-[calc(100%-3rem)]">
            <TradingChart symbol={symbol} interval={interval} />
          </div>
        </div>
      </div>

      {/* Watchlist Sidebar */}
      <aside className="w-full max-md:h-[40%] md:w-80 shrink-0 bg-card border-l border-border overflow-hidden flex flex-col md:flex">
        {/* Watchlist Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Watchlist</h2>
            <button
              onClick={() => setShowAllStocks(!showAllStocks)}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              {showAllStocks ? "Hide" : "All Stocks"}
            </button>
          </div>
        </div>

        {/* Watchlist Content */}
        <div className="flex-1 overflow-hidden">
          {showAllStocks ? (
            <div className="flex flex-col h-full">
              <div className="p-4 pb-2">
                <input
                  type="text"
                  placeholder="Search stocks..."
                  className="w-full px-3 py-2 bg-muted/50 border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex-1 overflow-y-auto px-4">
                {stocksLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader />
                  </div>
                ) : (
                  <ul className="space-y-1 py-2">
                    {stocks.map((stock) => (
                      <li
                        key={stock.symbol}
                        className={`group px-3 py-2 rounded-md cursor-pointer flex items-center justify-between transition-colors ${
                          stock.symbol === symbol
                            ? "bg-primary/50 font-medium"
                            : "hover:bg-muted/30"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 w-full">
                          <span
                            onClick={() => handleStockSelect(stock)}
                            className="text-sm font-medium w-16 shrink-0"
                          >
                            {stock.symbol}
                          </span>
                          <span
                            onClick={() => handleStockSelect(stock)}
                            className="text-sm text-muted-fg truncate flex-1"
                          >
                            {stock.name}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleWatchlistToggle(stock);
                            }}
                            className={`${
                              isStockInWatchlist(stock.symbol)
                                ? "text-yellow-400"
                                : "text-muted-fg"
                            } hover:text-yellow-500 shrink-0 opacity-100 transition-colors`}
                          >
                            <FaStar className="h-4 w-4" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full overflow-y-auto p-4">
              {watchlistLoading ? (
                <div className="flex items-center justify-center">
                  <Loader />
                </div>
              ) : (
                <ul className="space-y-2">
                  {watchlist.map((stk) => (
                    <li
                      key={stk.symbol}
                      className={`group px-3 py-2 rounded-md cursor-pointer flex items-center justify-between transition-colors ${
                        stk.symbol === symbol
                          ? "bg-muted/50 font-medium"
                          : "hover:bg-muted/30"
                      }`}
                      onClick={() => handleStockSelect(stk)}
                    >
                      <span>{stk.symbol}</span>
                      <span>{stk.name}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWatchlistToggle(stk);
                        }}
                        className="text-yellow-400 hover:text-yellow-500"
                      >
                        <FaStar className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </aside>

      {/* AI Analysis Modal */}
      <Modal isOpen={showAnalysisModal} onClose={() => setShowAnalysisModal(false)}>
        <h3 className="text-lg font-semibold mb-4">AI Analysis</h3>
        {analysisLoading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : analysis?.suggestion ? (
          <div
            dangerouslySetInnerHTML={{
              __html: (typeof analysis.suggestion === "string"
                ? analysis.suggestion
                : analysis.suggestion.suggestion
              )
                .replace(/--- START ANALYSIS FORMAT ---\n?/g, "")
                .replace(/--- END FORMAT ---\n?/g, "")
                .replace(/\n/g, "<br/>")
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/\*(.*?)\*/g, "<em>$1</em>"),
            }}
          />
        ) : (
          <div className="text-muted-fg">No analysis data available</div>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
