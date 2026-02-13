import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";
import { BookingItem } from "./types";

interface FetchBookingPayload {
  page?: number;
  limit?: number;
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
    const res = await api.post(ADMINENDPOINTS.BOOKING_LIST, {
      page: payload?.page ?? 1,
      limit: payload?.limit ?? 10,
    });

    const d = res.data.data;

    return {
      bookings: d.bookings,
      totalRecords: d.totalRecords,
      currentPage: d.currentPage,
      totalPages: d.totalPages,
    };
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch bookings"
    );
  }
});

const bookingListSlice = createSlice({
  name: "bookingList",
  initialState,
  reducers: {
    clearBookingList: (state) => {
      state.data = [];
      state.totalRecords = 0;
      state.currentPage = 1;
      state.totalPages = 1;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingList.fulfilled, (state, action) => {
        state.loading = false;

        state.data = action.payload.bookings;
        state.totalRecords = action.payload.totalRecords;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchBookingList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load bookings";
      });
  },
});

export const { clearBookingList } = bookingListSlice.actions;
export default bookingListSlice.reducer;
