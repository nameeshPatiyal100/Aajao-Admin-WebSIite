import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ============================
   BACKEND TYPES (1:1)
============================ */
export interface BookingStatusRow {
  bs_id: number;
  bs_title: string;
  bs_code: string | null;
}

interface PaginationState {
  page: number;
  limit: number;
  offset: number;
  totalRecords: number;
  currentPage: number;
  totalPages: number;
}

interface BookingStatusListingState {
  rows: BookingStatusRow[];
  pagination: PaginationState;
  loading: boolean;
  error: string | null;
}

/* ============================
   INITIAL STATE
============================ */
const initialState: BookingStatusListingState = {
  rows: [],
  pagination: {
    page: 1,
    limit: 10,
    offset: 0,
    totalRecords: 0,
    currentPage: 1,
    totalPages: 0,
  },
  loading: false,
  error: null,
};

/* ============================
   THUNK
============================ */
export const fetchBookingStatusListingForAdminPage =
  createAsyncThunk<
    {
      rows: BookingStatusRow[];
      pagination: PaginationState;
    },
    { page?: number; limit?: number },
    { rejectValue: string }
  >(
    "admin/bookingStatusListing/fetch",
    async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
      try {
        const res = await api.post(
          ADMINENDPOINTS.BOOKING_STATUS_LIST_FOR_ADMIN,
          { page, limit }
        );

        const d = res.data.data;

        return {
          rows: d.bookings, // 👈 no mapping, no renaming
          pagination: {
            page: d.page,
            limit: d.limit,
            offset: d.offset,
            totalRecords: d.totalRecords,
            currentPage: d.currentPage,
            totalPages: d.totalPages,
          },
        };
      } catch (err: any) {
        return rejectWithValue(
          err.response?.data?.message ||
            "Failed to fetch booking status listing"
        );
      }
    }
  );

/* ============================
   SLICE
============================ */
const bookingStatusListingForAdminPageSlice = createSlice({
  name: "bookingStatusListingForAdminPage",
  initialState,
  reducers: {
    clearBookingStatusListingForAdminPage: (state) => {
      state.rows = [];
      state.error = null;
      state.loading = false;
      state.pagination = initialState.pagination;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchBookingStatusListingForAdminPage.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        fetchBookingStatusListingForAdminPage.fulfilled,
        (state, action) => {
          state.loading = false;
          state.rows = action.payload.rows;
          state.pagination = action.payload.pagination;
        }
      )
      .addCase(
        fetchBookingStatusListingForAdminPage.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload || "Something went wrong";
        }
      );
  },
});

/* ============================
   EXPORTS
============================ */
export const {
  clearBookingStatusListingForAdminPage,
} = bookingStatusListingForAdminPageSlice.actions;

export default bookingStatusListingForAdminPageSlice.reducer;
