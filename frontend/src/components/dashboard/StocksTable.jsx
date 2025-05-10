/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from "react";
import { Table, Input, Select, message } from "antd";
import { Button } from "@/components/ui/button";
import { Star, StarOff } from "lucide-react";
import { IoSearchOutline } from "react-icons/io5";
import { FaChartLine, FaRobot } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import debounce from "lodash.debounce";
import { getAllStocks } from "@/store/slices/stockSlice";

const { Search } = Input;
const { Option } = Select;

const StocksTable = ({
  data = [],
  loading = false,
  totalStocks = 0,
  onStockSelect,
  onWatchlistToggle,
  isStockInWatchlist,
  sectors = [],
  industries = [],
  selectedStock = null,
  currentPage = 1,
  onShowChart,
  onShowAnalysis,
}) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [pagination, setPagination] = useState({
    current: currentPage,
    pageSize: 10,
    total: totalStocks,
    showQuickJumper: true,
    showTotal: (total) => `Total ${total} stocks`,
    style: {
      padding: "10px 81px 16px 0px",
    },
  });

  // Create memoized debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        fetchData({
          page: 1,
          search: value,
          sector: selectedSector,
          industry: selectedIndustry,
        });
      }, 1000), // Increased to 1 second
    [selectedSector, selectedIndustry]
  );

  // Cleanup debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Updated search handler
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    setPagination((prev) => ({ ...prev, current: 1 }));

    if (!value) {
      // Immediately reset search when cleared
      debouncedSearch.cancel();
      fetchData({
        page: 1,
        search: "",
        sector: selectedSector,
        industry: selectedIndustry,
      });
    } else {
      debouncedSearch(value);
    }
  };

  // Fetch data based on filters and pagination
  const fetchData = (params = {}) => {
    dispatch(
      getAllStocks({
        page: params.page || pagination.current,
        limit: params.pageSize || pagination.pageSize,
        search: params.search || searchText,
        sector: params.sector || selectedSector,
        industry: params.industry || selectedIndustry,
      })
    );
  };

  // Handle table change (pagination, filters, sorter)
  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
    fetchData({
      page: pagination.current,
      pageSize: pagination.pageSize,
      sortField: sorter.field,
      sortOrder: sorter.order,
    });
  };

  // Error handling for stock selection
  const handleStockClick = (record) => {
    if (!record) {
      message.error("Please select a valid stock");
      return;
    }
    onStockSelect(record);
    message.success(`Selected ${record.symbol}`);
  };

  // Column definitions with highlighted row
  const columns = [
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      width: 120,
      fixed: "left",
      render: (text, record) => (
        <p
          className="cursor-pointer pl-2 font-bold whitespace-nowrap"
          onClick={() => handleStockClick(record)}
        >
          {text}
        </p>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 250, // Fixed width for better visibility
      ellipsis: true,
      fixed: "left",
      render: (text, record) => (
        <p
          className="cursor-pointer font-medium"
          onClick={() => onStockSelect(record)}
          title={text}
        >
          {text}
        </p>
      ),
    },
    {
      title: "Sector",
      dataIndex: "sector",
      key: "sector",
      width: 180,
      ellipsis: true,
      responsive: ["lg"],
    },
    {
      title: "Industry",
      dataIndex: "industry",
      key: "industry",
      width: 200,
      ellipsis: true,
      responsive: ["xl"],
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      fixed: "right", // Keep Action column always visible
      render: (_, record) => (
        <button
          onClick={() => onWatchlistToggle(record)}
          className="text-lg hover:scale-110 transition-transform px-2"
        >
          {isStockInWatchlist(record.symbol) ? (
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
          ) : (
            <StarOff className="h-5 w-5 text-muted-fg hover:text-yellow-400" />
          )}
        </button>
      ),
    },
  ];

  // Reset pagination when filters change
  useEffect(() => {
    setPagination((prev) => ({ ...prev, current: 1 }));
    fetchData({
      page: 1,
      sector: selectedSector,
      industry: selectedIndustry,
    });
  }, [selectedSector, selectedIndustry]);

  // Update pagination when props change
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      current: currentPage,
      total: totalStocks,
    }));
  }, [currentPage, totalStocks]);

  // Updated Search Input with react-icon
  const SearchIcon = () => <IoSearchOutline className="h-4 w-4 text-muted-fg" />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* Responsive Filters with Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-4 items-center">
        <Search
          placeholder="Search stocks..."
          allowClear
          onChange={handleSearchChange}
          className="w-full md:w-60"
          prefix={<SearchIcon />}
          value={searchText}
        />
        <Select
          className="w-full"
          placeholder="Filter by sector"
          allowClear
          onChange={(value) => setSelectedSector(value)}
        >
          {sectors.map((sector) => (
            <Option key={sector} value={sector}>
              {sector}
            </Option>
          ))}
        </Select>
        <Select
          className="w-full"
          placeholder="Filter by industry"
          allowClear
          onChange={(value) => setSelectedIndustry(value)}
        >
          {industries.map((industry) => (
            <Option key={industry} value={industry}>
              {industry}
            </Option>
          ))}
        </Select>

        {/* Action Buttons */}
        <div className="flex gap-2 justify-end">
          <Button
            onClick={onShowChart}
            disabled={!selectedStock}
            className="flex items-center gap-2"
          >
            <FaChartLine className="h-4 w-4" /> Chart
          </Button>
          <Button
            onClick={onShowAnalysis}
            disabled={!selectedStock}
            className="flex items-center gap-2"
          >
            <FaRobot className="h-4 w-4" /> AI Analysis
          </Button>
        </div>
      </div>

      {/* Enhanced Table */}
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: "100%", y: "calc(100vh - 300px)" }}
        rowKey="symbol"
        size="middle"
        className="bg-[#333130] rounded-lg shadow-l"
        rowClassName={(record) =>
          selectedStock?.symbol === record.symbol ? "selected-row" : ""
        }
        sticky="true"
        tableLayout="fixed"
      />

      {/* No Data Message */}
      {!loading && data.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-muted-foreground py-8"
        >
          No stocks found. Try adjusting your search or filters.
        </motion.div>
      )}
    </motion.div>
  );
};

export default StocksTable;
