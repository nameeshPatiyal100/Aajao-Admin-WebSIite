import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= API TYPES ================= */

interface PropertyDetail {
  property_id: number;
  property_name: string;
  property_price: string;
  "HostDetails.user_fullName": string;
}

interface BookingApi {
  book_id: string;
  book_user_id: number;
  book_total_amt: number;
  book_status: number;
  "userDetails.user_fullName": string;
  "bookingReview.br_rating": number | null;

  // ✅ NEW FIELDS
  "bookingStatus.bs_title": string;
  "bookingStatus.bs_code": string;
}

interface RevenueChart {
  month: string;
  revenue: number;
}

interface Analytics {
  totalRevenue: number;
  upcomingRevenue: number;
  avgBookingPrice: number;
  totalBookings: number;
}

interface PropertyAnalyticsDetailApiResponse {
  success: boolean;
  message: string;
  data: {
    propertyDetail: PropertyDetail;
    categoryTitles: string[];
    bookings: BookingApi[];
    totalRecords: number;
    analytics: Analytics;
    revenueGraph: {
      chartData: RevenueChart[];
      yAxisMax: number;
    };
  };
}

/* ================= STATE ================= */

interface PropertyAnalyticsDetailState {
  data: PropertyAnalyticsDetailApiResponse["data"] | null;
  loading: boolean;
  error: string | null;
}

const initialState: PropertyAnalyticsDetailState = {
  data: null,
  loading: false,
  error: null,
};

/* ================= THUNK ================= */

export const fetchPropertyAnalyticsDetail = createAsyncThunk<
  PropertyAnalyticsDetailApiResponse["data"], // ✅ return type
  { propertyId: number },                     // ✅ payload type
  { rejectValue: string }                     // ✅ error type
>(
  "propertyAnalyticsDetail/fetch",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post<PropertyAnalyticsDetailApiResponse>(
        ADMINENDPOINTS.PROPERTY_ANALYTICS_DETAIL,
        payload
      );

      return response.data.data;
    } catch (error: any) {
      const errMsg =
        error.response?.data?.message ||
        "Failed to fetch property analytics detail";
      return rejectWithValue(errMsg);
    }
  }
);

/* ================= SLICE ================= */

const propertyAnalyticsDetailSlice = createSlice({
  name: "propertyAnalyticsDetail",
  initialState,
  reducers: {
    clearPropertyAnalyticsDetail: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertyAnalyticsDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchPropertyAnalyticsDetail.fulfilled,
        (state, action: PayloadAction<PropertyAnalyticsDetailApiResponse["data"]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )

      .addCase(fetchPropertyAnalyticsDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

/* ================= EXPORTS ================= */

export const { clearPropertyAnalyticsDetail } =
  propertyAnalyticsDetailSlice.actions;

export default propertyAnalyticsDetailSlice.reducer;