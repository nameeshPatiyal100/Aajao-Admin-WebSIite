// src/features/users/user.slice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ApiUser } from "../../../types/api.types";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ---------------- TYPES ---------------- */

export interface User {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive";
  createdAt: string;
}
interface FetchUsersPayload {
  page?: number;
  search?: string;
  status?: string | null;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  limit: number;
}

interface UserState {
  users: ApiUser[];
  loading: boolean;
  error: string | null;
  pagination: {
    totalRecords: number;
    currentPage?: number;
  };
}

/* ---------------- INITIAL STATE ---------------- */

const initialState: UserState = {
  users: [],
  pagination: {
    totalRecords: 0,
  },
  loading: false,
  error: null,
};

/* ---------------- THUNK (INSIDE SAME FILE) ---------------- */

export const fetchUsers = createAsyncThunk(
  "users/fetch",
  async (payload: { page: number; search: string }, { rejectWithValue }) => {
    try {
      const res = await api.post(ADMINENDPOINTS.USER_LIST, payload);
      console.log(res, "resresres");

      return {
        users: res.data.data.data, // ✅ ARRAY
        totalRecords: res.data.data.count,
        page: payload.page,
      };
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

/* ---------------- SLICE ---------------- */

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetUsers(state) {
      state.users = [];
      state.pagination = { totalRecords: 0 };
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- PENDING ---------- */
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      /* ---------- SUCCESS ---------- */
      .addCase(fetchUsers.fulfilled, (state, action) => {
        console.log(action, "action");
        state.loading = false;
        state.users = action.payload.users; // ✅ array
        if (state.pagination) {
          state.pagination.totalRecords = action.payload.totalRecords;
          state.pagination.currentPage = action.payload.page;
        }
      })

      /* ---------- ERROR ---------- */
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

/* ---------------- EXPORTS ---------------- */

export const { resetUsers } = userSlice.actions;
export default userSlice.reducer;
