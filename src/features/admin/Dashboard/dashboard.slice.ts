import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";
import {
  DashboardState,
  DashboardApiResponse,
  StatsData,
} from "./types";
const defaultStats: StatsData = {
  active: 0,
  inactive: 0,
  verified: 0,
  other: 0,
};

const initialState: DashboardState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

export const getAdminDashboardData = createAsyncThunk<
  DashboardApiResponse,
  void,
  { rejectValue: string }
>("adminDashboard/getData", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get(
      ADMINENDPOINTS.GET_ADMIN_DASHBOARD_DATA
    );

    const res = response.data;
    if (
      res?.data?.getPropStatsData &&
      res.data.getPropStatsData?.name === "SequelizeDatabaseError"
    ) {
      console.error("❌ PropStats API Error:", res.data.getPropStatsData);

      res.data.getPropStatsData = null;
    }

    return res;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message ||
        "Failed to fetch dashboard data"
    );
  }
});

const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState,
  reducers: {
    resetDashboardState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminDashboardData.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(getAdminDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const payload = action.payload;
        state.data = {
          ...payload,
          data: {
            ...payload.data,
            getUserStatsData:
              payload.data.getUserStatsData || defaultStats,

            getHostStatsData:
              payload.data.getHostStatsData || defaultStats,

            getPropStatsData:
              payload.data.getPropStatsData ?? defaultStats,
          },
        };
      })

      .addCase(getAdminDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error =
          action.payload || "Something went wrong";
      });
  },
});

export const { resetDashboardState } = adminDashboardSlice.actions;

export default adminDashboardSlice.reducer;