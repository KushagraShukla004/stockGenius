/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "motion/react";
import { FaChartLine, FaRobot } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import StocksTable from "@/components/dashboard/StocksTable";
import TradingChart from "@/components/dashboard/TradingChart";
import { getWatchlist, toggleWatchlist } from "@/store/slices/watchlistSlice";
import { getAIAnalysis } from "@/store/slices/aiSlice";
import { getAllStocks } from "@/store/slices/stockSlice";
import Modal from "@/components/ui/Modal";
import Loader from "@/components/ui/Loader";
import { toast } from "sonner";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { watchlist, loading: watchlistLoading } = useSelector(
    (state) => state.watchlist
  );
  const {
    stocks,
    loading: stocksLoading,
    totalStocks,
    totalPages,
    currentPage,
  } = useSelector((state) => state.stocks);

  const { analysis, loading: analysisLoading } = useSelector((state) => state.ai);

  const [selectedStock, setSelectedStock] = useState(null);
  const [showChartModal, setShowChartModal] = useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [interval, setInterval] = useState("1min");

  useEffect(() => {
    dispatch(getWatchlist());
    dispatch(getAllStocks());
  }, [dispatch]);

  // Extract unique sectors and industries from stocks (DSA Knowledge)
  // creating Array of (by using [])
  // unique (by using Set data structure (Set appends unique values to the array))
  // adding new unique elements instead of overriding by using spread operator(...)
  const sectors = [...new Set(stocks.map((stock) => stock.sector))]
    .filter(Boolean)
    .sort();
  const industries = [...new Set(stocks.map((stock) => stock.industry))]
    .filter(Boolean)
    .sort();

  const handleStockSelect = (stock) => {
    if (!stock) {
      toast.error("Please select a valid stock");
      return;
    }
    setSelectedStock(stock);
    toast.success(`Selected ${stock.symbol}`);
  };

  const handleShowChart = () => {
    if (!selectedStock) {
      toast.error("Please select a stock to view chart");
      return;
    }
    setShowChartModal(true);
  };

  const handleAIAnalysis = async () => {
    if (!selectedStock) {
      toast.error("Please select a stock for AI analysis");
      return;
    }
    setShowAnalysisModal(true);

    try {
      await dispatch(getAIAnalysis(selectedStock.symbol));
      toast.success(`Analysis loaded for ${selectedStock.symbol}`);
    } catch (error) {
      toast.error(`Failed to load analysis: ${error.message}`);
    }
  };

  const handleWatchlistToggle = async (stock) => {
    try {
      await dispatch(toggleWatchlist({ symbol: stock.symbol, name: stock.name }));
      dispatch(getWatchlist());
      toast.success(
        isStockInWatchlist(stock.symbol)
          ? `Removed ${stock.symbol} from watchlist`
          : `Added ${stock.symbol} to watchlist`
      );
    } catch (error) {
      toast.error(`Failed to update watchlist: ${error.message}`);
    }
  };

  const isStockInWatchlist = (symbol) => {
    return watchlist.some((stock) => stock.symbol === symbol);
  };

  const intervals = ["1min", "5min", "15min", "1D"];

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-full p-4 flex flex-col"
      >
        {/* Stocks Table with integrated action buttons */}
        <div className="flex-1 p-4 max-h-fit bg-white/30 rounded-xl shadow-lg overflow-hidden">
          <StocksTable
            data={stocks}
            loading={stocksLoading}
            totalStocks={totalStocks}
            currentPage={currentPage}
            totalPages={totalPages}
            sectors={sectors}
            industries={industries}
            onStockSelect={handleStockSelect}
            onWatchlistToggle={handleWatchlistToggle}
            isStockInWatchlist={isStockInWatchlist}
            selectedStock={selectedStock}
            // Action Buttons for Chart and AI Analysis
            onShowChart={handleShowChart}
            onShowAnalysis={handleAIAnalysis}
          />
        </div>

        {/* Modals */}
        {/* Chart Modal - Full width */}
        <AnimatePresence>
          {showChartModal && (
            <Modal
              isOpen={showChartModal}
              onClose={() => setShowChartModal(false)}
              className="w-[95vw] h-[90vh] max-w-none m-4" // Override default width
            >
              <div className="h-full flex flex-col">
                {/* Header with Controls */}
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center gap-4">
                    <h3 className="text-xl font-semibold">
                      {selectedStock?.symbol} Chart
                    </h3>
                    <div className="flex gap-1 overflow-x-auto scrollbar-none">
                      {intervals.map((i) => (
                        <Button
                          key={i}
                          variant={i === interval ? "default" : "outline"}
                          onClick={() => setInterval(i)}
                          size="sm"
                        >
                          {i}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleAIAnalysis}
                      className="flex items-center gap-2"
                    >
                      <FaRobot /> AI Analysis
                    </Button>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex min-h-0">
                  {/* Chart Section */}
                  <div className="flex-1 min-w-0 p-4">
                    <div className="h-full">
                      <TradingChart symbol={selectedStock?.symbol} interval={interval} />
                    </div>
                  </div>

                  {/* Watchlist Sidebar */}
                  <div className="w-80 border-l bg-muted/10 p-4 overflow-y-auto">
                    <h3 className="text-lg font-semibold mb-4">Watchlist</h3>
                    {watchlistLoading ? (
                      <div className="flex justify-center">
                        <Loader />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {watchlist.map((stock) => (
                          <div
                            key={stock.symbol}
                            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                              selectedStock?.symbol === stock.symbol
                                ? "bg-primary/10"
                                : "hover:bg-muted/50"
                            }`}
                            onClick={() => setSelectedStock(stock)}
                          >
                            <div>
                              <div className="font-medium">{stock.symbol}</div>
                              <div className="text-sm text-muted-foreground">
                                {stock.name}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleWatchlistToggle(stock);
                              }}
                            >
                              <FaChartLine className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </AnimatePresence>

        {/* AI Analysis Modal - Default width */}
        <AnimatePresence>
          {showAnalysisModal && (
            <Modal isOpen={showAnalysisModal} onClose={() => setShowAnalysisModal(false)}>
              <h3 className="text-lg font-semibold mb-4">
                AI Analysis for {selectedStock?.symbol}
              </h3>
              {analysisLoading ? (
                <div className="flex justify-center">
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
                <div className="text-muted-foreground">No analysis data available</div>
              )}
            </Modal>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Dashboard;
