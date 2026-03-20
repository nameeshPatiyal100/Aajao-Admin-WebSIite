import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= API TYPES ================= */

export interface PropertyAnalyticsApi {
    property_id: number;
    property_name: string;
    property_price: string;
    is_active: boolean;
    is_verify: boolean;
    is_luxury: number; // ✅ NEW
    total_bookings: number;
    "HostDetails.user_fullName": string;
  }

interface PropertyAnalyticsResponse {
  success: boolean;
  message: string;
  data: PropertyAnalyticsApi[];
}

/* ================= UI TYPE ================= */

export interface PropertyAnalytics {
  isLuxury: any;
  id: number;
  name: string;
  price: number;
  isActive: boolean;
  isVerified: boolean;
  totalBookings: number;
  hostName: string;
}

/* ================= STATE ================= */

interface PropertyAnalyticsState {
  properties: PropertyAnalytics[];
  loading: boolean;
  error: string | null;
}

const initialState: PropertyAnalyticsState = {
  properties: [],
  loading: false,
  error: null,
};

/* ================= THUNK ================= */

export const fetchPropertyAnalytics = createAsyncThunk(
  "propertyAnalytics/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post<PropertyAnalyticsResponse>(
        ADMINENDPOINTS.PROPERTY_ANALYTICS_SEARCH
      );

      const resData = response.data;

      const mappedData: PropertyAnalytics[] = resData.data.map((item) => ({
        id: item.property_id,
        name: item.property_name,
        price: Number(item.property_price),
        isActive: item.is_active,
        isVerified: item.is_verify,
        totalBookings: item.total_bookings,
        hostName: item["HostDetails.user_fullName"], // 🔥 IMPORTANT
        isLuxury: item.is_luxury, // ✅ Added isLuxury property
      }));

      return mappedData;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch property analytics"
      );
    }
  }
);

/* ================= SLICE ================= */

const propertyAnalyticsSlice = createSlice({
  name: "propertyAnalytics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertyAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.properties = [];
      })

      .addCase(fetchPropertyAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
      })

      .addCase(fetchPropertyAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default propertyAnalyticsSlice.reducer;
