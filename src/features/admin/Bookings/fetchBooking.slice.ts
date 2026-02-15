// src/features/admin/Bookings/fetchBooking.slice.ts

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";
import { BookingItem } from "./types";

interface FetchBookingPayload {
  page?: number;
  limit?: number;

  // 🔍 filters
  search?: string;
  status?: number;
  paymentStatus?: number;
  fromDate?: string | Date;
  toDate?: string | Date;
}

interface BookingListState {
  data: BookingItem[];
  totalRecords: number;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: BookingListState = {
  data: [],
  totalRecords: 0,
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

export const fetchBookingList = createAsyncThunk<
  {
    bookings: BookingItem[];
    totalRecords: number;
    currentPage: number;
    totalPages: number;
  },
  FetchBookingPayload | void,
  { rejectValue: string }
>("booking/fetchList", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post(
      ADMINENDPOINTS.BOOKING_LIST,
      payload ?? { page: 1, limit: 10 }
    );

    const d = res.data.data;

    return {
      bookings: d.bookings,
      totalRecords: d.totalRecords,
      currentPage: d.currentPage,
      totalPages: d.totalPages,
    };
  } catch (err: any) {
    // 👇 HANDLE 404 AS EMPTY RESULT
    if (err.response?.status === 404) {
      return {
        bookings: [],
        totalRecords: 0,
        currentPage: payload?.page ?? 1,
        totalPages: 1,
      };
    }

    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch bookings"
    );
  }
});


const bookingListSlice = createSlice({
  name: "bookingList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingList.fulfilled, (state, action) => {
        state.loading = false;

        state.data = action.payload.bookings.map((b: any) => ({
          book_id: b.book_id,
          book_total_amt: b.book_total_amt,
          book_is_paid: b.book_is_paid,
          book_added_at: b.book_added_at,

          userDetails: {
            user_fullName: b["userDetails.user_fullName"] ?? "",
          },
          bookingProperty: {
            property_name: b["bookingProperty.property_name"] ?? "",
          },
          bookDetails: {
            bt_book_checkIn: b["bookDetails.bt_book_checkIn"] ?? "",
            bt_book_checkout: b["bookDetails.bt_book_checkout"] ?? "",
          },
          bookingStatus: {
            bs_title: b["bookingStatus.bs_title"],
            bs_code: b["bookingStatus.bs_code"],
          },
        }));

        state.totalRecords = action.payload.totalRecords;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchBookingList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load bookings";
      
        // 🔥 CLEAR OLD DATA
        state.data = [];
        state.totalRecords = 0;
        state.currentPage = 1;
        state.totalPages = 1;
      });
      
  },
});

export default bookingListSlice.reducer;
