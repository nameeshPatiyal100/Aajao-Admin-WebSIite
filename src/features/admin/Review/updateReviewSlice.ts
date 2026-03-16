import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= Types ================= */

export interface UpdateReviewPayload {
  bookingId: string;
  status: number; // 0 | 1 | 2
}

interface ApiResponse {
  success: boolean;
  message: string;
}

interface UpdateReviewState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

/* ================= Async Thunk ================= */

export const updateReview = createAsyncThunk(
  "review/updateReview",
  async (payload: UpdateReviewPayload, { rejectWithValue }) => {
    try {
      const response = await api.post<ApiResponse>(
        ADMINENDPOINTS.UPDATE_REVIEW,
        payload
      );

      return response.data;
    } catch (error: any) {
      const errMsg =
        error.response?.data?.message || "Failed to update review";
      return rejectWithValue(errMsg);
    }
  }
);

/* ================= Slice ================= */

const initialState: UpdateReviewState = {
  loading: false,
  success: false,
  error: null,
};

const updateReviewSlice = createSlice({
  name: "updateReview",
  initialState,
  reducers: {
    resetUpdateReviewState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReview.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetUpdateReviewState } = updateReviewSlice.actions;

export default updateReviewSlice.reducer;