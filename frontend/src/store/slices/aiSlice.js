import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

export const getAIAnalysis = createAsyncThunk("ai/getAnalysis", async (symbol) => {
  const response = await api.get(`/ai/suggest/${symbol}`);
  return response.data;
});

const aiSlice = createSlice({
  name: "ai",
  initialState: {
    analysis: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearAnalysis: (state) => {
      state.analysis = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAIAnalysis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAIAnalysis.fulfilled, (state, action) => {
        state.analysis = action.payload;
        state.loading = false;
      })
      .addCase(getAIAnalysis.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { clearAnalysis } = aiSlice.actions;
export default aiSlice.reducer;
