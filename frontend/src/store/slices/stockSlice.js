import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

export const getAllStocks = createAsyncThunk("stocks/getAllStocks", async () => {
  const response = await api.get("/stocks");
  return response.data;
});

const stockSlice = createSlice({
  name: "stocks",
  initialState: {
    stocks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllStocks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllStocks.fulfilled, (state, action) => {
        state.stocks = action.payload;
        state.loading = false;
      })
      .addCase(getAllStocks.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default stockSlice.reducer;
