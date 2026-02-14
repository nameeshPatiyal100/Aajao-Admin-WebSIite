import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";
import { BookingDetail } from "./types";

interface BookingDetailState {
  data: BookingDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: BookingDetailState = {
  data: null,
  loading: false,
  error: null,
};

/* ============================
   FETCH BOOKING DETAIL
============================ */
export const fetchBookingDetail = createAsyncThunk<
  BookingDetail,
  string,
  { rejectValue: string }
>("booking/fetchDetail", async (bookingId, { rejectWithValue }) => {
  try {
    const res = await api.post(ADMINENDPOINTS.BOOKING_DETAIL, {
        bookingId: bookingId,
    });

    const d = res.data.data;

    return {
      id: d.bookingDetails.book_id,

      createdAt: new Date(
        d.bookingDetails.book_added_at
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),

      dates: {
        checkIn: d.bookingDetails["bookDetails.bt_book_checkIn"] || "-",
        checkOut: d.bookingDetails["bookDetails.bt_book_checkout"] || "-",
      },

      pricing: {
        price: Number(d.bookingDetails.book_price),
        tax: Number(d.bookingDetails.book_tax),
        taxPercentage: Number(
          d.bookingDetails.book_tax_percentagenatage
        ),
        total: Number(d.bookingDetails.book_total_amt),
        isPaid: d.bookingDetails.book_is_paid === 1,
        isCOD: d.bookingDetails.book_is_cod === 1,
      },

      user: {
        name: d.bookingDetails["userDetails.user_fullName"],
        phone: d.bookingDetails["userDetails.user_pnumber"],
        email:
          d.bookingDetails["userDetails.userCred.cred_user_email"],
      },

      property: {
        name: d.bookingDetails["bookingProperty.property_name"],
        contact: d.bookingDetails["bookingProperty.property_contact"],
        email: d.bookingDetails["bookingProperty.property_email"],
      },

      host: {
        name:
          d.bookingDetails[
            "bookingProperty.HostDetails.user_fullName"
          ],
        phone:
          d.bookingDetails[
            "bookingProperty.HostDetails.user_pnumber"
          ],
        email:
          d.bookingDetails[
            "bookingProperty.HostDetails.userCred.cred_user_email"
          ],
      },

      status: {
        title: d.bookingDetails["bookingStatus.bs_title"],
        color: d.bookingDetails["bookingStatus.bs_code"],
      },

      history: d.bookHistory.map((h: any) => ({
        title: h.bh_title,
        description: h.bh_description,
      })),
    };
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message ||
        "Failed to fetch booking detail"
    );
  }
});

/* ============================
   SLICE
============================ */
const bookingDetailSlice = createSlice({
  name: "bookingDetail",
  initialState,
  reducers: {
    clearBookingDetail: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBookingDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearBookingDetail } = bookingDetailSlice.actions;
export default bookingDetailSlice.reducer;
