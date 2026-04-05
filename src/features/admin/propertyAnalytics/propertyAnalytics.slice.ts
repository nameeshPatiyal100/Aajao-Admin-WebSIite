import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= FILTER TYPE ================= */

export interface PropertyFilterData {
  page: number;
  limit: number;
  keyword?: string;
  status?: number;   // 1 = active, 0 = inactive
  isLuxury?: number; // 1 = luxury
}

/* ================= API TYPES ================= */

export interface PropertyAnalyticsApi {
  property_id: number;
  property_name: string;
  property_price: string;
  is_active: boolean;
  is_verify: boolean;
  is_luxury: number;
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
  id: number;
  name: string;
  price: number;
  isActive: boolean;
  isVerified: boolean;
  totalBookings: number;
  hostName: string;
  isLuxury: number;
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
  async (params: PropertyFilterData, { rejectWithValue }) => {
    try {
      const response = await api.post<PropertyAnalyticsResponse>(
        ADMINENDPOINTS.PROPERTY_ANALYTICS_SEARCH,
        params // ✅ send filters
      );

      const mappedData: PropertyAnalytics[] = response.data.data.map((item) => ({
        id: item.property_id,
        name: item.property_name,
        price: Number(item.property_price),
        isActive: item.is_active,
        isVerified: item.is_verify,
        totalBookings: item.total_bookings,
        hostName: item["HostDetails.user_fullName"],
        isLuxury: item.is_luxury,
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