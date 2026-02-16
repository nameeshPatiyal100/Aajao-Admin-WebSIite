import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";
import {
  UpdateBookingStatusPayload,
  UpdateBookingStatusState,
} from "./types";

/* ============================
   INITIAL STATE
============================ */
const initialState: UpdateBookingStatusState = {
  loading: false,
  success: false,
  error: null,
};

/* ============================
   UPDATE BOOKING STATUS
============================ */
export const updateBookingStatusAdminPage = createAsyncThunk<
  void,
  UpdateBookingStatusPayload,
  { rejectValue: string }
>(
  "bookingStatus/update",
  async (payload, { rejectWithValue }) => {
    try {
      await api.post(
        ADMINENDPOINTS.UPDATE_BOOKING_STATUS_FROM_STATUS_LISTING_FOR_ADMIN_PAGE,
        payload
      );
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Failed to update booking status"
      );
    }
  }
);

/* ============================
   SLICE
============================ */
const bookingStatusUpdateSlice = createSlice({
  name: "bookingStatusUpdate",
  initialState,
  reducers: {
    resetBookingStatusUpdate: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateBookingStatusAdminPage.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateBookingStatusAdminPage.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateBookingStatusAdminPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetBookingStatusUpdate } =
  bookingStatusUpdateSlice.actions;

export default bookingStatusUpdateSlice.reducer;
