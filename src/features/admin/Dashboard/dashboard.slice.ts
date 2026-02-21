import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";
import { DashboardState, DashboardApiResponse } from "./types";

/* ============================
   INITIAL STATE
============================ */
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
    const response = await api.get(ADMINENDPOINTS.GET_ADMIN_DASHBOARD_DATA);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch dashboard data"
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
        state.data = action.payload;
      })
      .addCase(getAdminDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetDashboardState } = adminDashboardSlice.actions;

export default adminDashboardSlice.reducer;
