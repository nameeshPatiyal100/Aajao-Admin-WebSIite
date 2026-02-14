import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

interface UpdateBookingPayload {
  bookingId: string;
  statusId: number;
}

interface UpdateBookingState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: UpdateBookingState = {
  loading: false,
  success: false,
  error: null,
};

/* ================= THUNK ================= */

export const updateBookingStatus = createAsyncThunk(
  "booking/updateStatus",
  async (
    payload: UpdateBookingPayload,
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post(
        ADMINENDPOINTS.UPDATE_BOOKING_STATUS,
        {
          bookingId: payload.bookingId,
          statusId: payload.statusId,
        }
      );

      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Failed to update booking status"
      );
    }
  }
);

/* ================= SLICE ================= */

const updateBookingSlice = createSlice({
  name: "updateBookingStatus",
  initialState,
  reducers: {
    resetUpdateBooking(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- PENDING ---------- */
      .addCase(updateBookingStatus.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      /* ---------- SUCCESS ---------- */
      .addCase(updateBookingStatus.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      /* ---------- ERROR ---------- */
      .addCase(updateBookingStatus.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetUpdateBooking } =
  updateBookingSlice.actions;

export default updateBookingSlice.reducer;
