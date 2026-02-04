import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";
import { ApiHost } from "../../../types/api.types";

/* ================= STATE ================= */

export interface HostListResponse {
  success: boolean;
  message: string;
  data: {
    totalRecords: number;
    currentPage: number;
    totalPages: number;
    search: string;
    page: number;
    limit: number;
    offset: number;
    data: ApiHost[];
  };
}

interface HostState {
  hosts: ApiHost[];
  loading: boolean;
  error: string | null;
  pagination: {
    totalRecords: number;
    totalPages: number;
    currentPage: number;
  } | null;
}

const initialState: HostState = {
  hosts: [],
  loading: false,
  error: null,
  pagination: null,
};

/* ================= THUNK ================= */

export const fetchHosts = createAsyncThunk<
  HostListResponse,
  { page: number; search?: string }
>("hosts/fetchHosts", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post(ADMINENDPOINTS.HOST_LIST, {
      page: payload.page,
      search: payload.search ?? "",
    });

    return res.data;
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.message || "Failed to fetch hosts"
    );
  }
});

/* ================= SLICE ================= */

const hostSlice = createSlice({
  name: "hosts",
  initialState,
  reducers: {
    resetHosts: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchHosts.fulfilled, (state, action) => {
        state.loading = false;
        state.hosts = action.payload.data.data;
        console.log(
          action.payload.data.totalRecords,
          " total records in slice"
        );
        state.pagination = {
          totalRecords: action.payload.data.totalRecords,
          totalPages: action.payload.data.totalPages,
          currentPage: action.payload.data.currentPage,
        };
      })

      .addCase(fetchHosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetHosts } = hostSlice.actions;
export default hostSlice.reducer;
