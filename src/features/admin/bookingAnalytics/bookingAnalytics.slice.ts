import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

export interface SeriesItem {
  name: string;
  data: number[];
}

export interface BookingAnalyticsData {
  categories: string[];
  series: SeriesItem[];
  yAxis: {
    min: number;
    max: number;
    tick: number;
  };
}

interface BookingAnalyticsState {
  data: BookingAnalyticsData | null;
  loading: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: BookingAnalyticsState = {
  data: null,
  loading: false,
  error: null,
};

/* ================= THUNK ================= */

export const fetchBookingAnalytics = createAsyncThunk(
  "bookingAnalytics/list",
  async (
    _params: {
      state?: string;
      city?: string;
      fromDate?: string;
      toDate?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.get(
        ADMINENDPOINTS.BOOKING_HeatMap_ANALYTICS
      );

      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Failed to fetch booking analytics"
      );
    }
  }
);

/* ================= SLICE ================= */

const bookingAnalyticsSlice = createSlice({
  name: "bookingAnalytics",
  initialState,
  reducers: {
    resetBookingAnalytics(state) {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- PENDING ---------- */
      .addCase(fetchBookingAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      /* ---------- SUCCESS ---------- */
      .addCase(fetchBookingAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      /* ---------- ERROR ---------- */
      .addCase(fetchBookingAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetBookingAnalytics } =
  bookingAnalyticsSlice.actions;

export default bookingAnalyticsSlice.reducer;