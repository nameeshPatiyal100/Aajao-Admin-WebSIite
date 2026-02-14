import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

export interface BookingStatusItem {
  bs_id: number;
  bs_title: string;
  bs_code: string | null;
}

interface BookingStatusState {
  data: BookingStatusItem[]; // 👈 list of statuses
  loading: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: BookingStatusState = {
  data: [],
  loading: false,
  error: null,
};

/* ================= THUNK ================= */

export const fetchBookingStatus = createAsyncThunk(
  "bookingStatus/list",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(
        ADMINENDPOINTS.BOOKING_STATUS_LIST
      );

      // API response structure:
      // res.data.data.bookingStatus
      return res.data.data.bookingStatus;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Failed to fetch booking status list"
      );
    }
  }
);

/* ================= SLICE ================= */

const bookingStatusSlice = createSlice({
  name: "bookingStatus",
  initialState,
  reducers: {
    resetBookingStatus(state) {
      state.data = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- PENDING ---------- */
      .addCase(fetchBookingStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = [];
      })

      /* ---------- SUCCESS ---------- */
      .addCase(fetchBookingStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      /* ---------- ERROR ---------- */
      .addCase(fetchBookingStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetBookingStatus } = bookingStatusSlice.actions;
export default bookingStatusSlice.reducer;
