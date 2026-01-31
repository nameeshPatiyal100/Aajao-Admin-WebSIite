// src/features/admin/userManagement/userDetails.slice.ts

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

interface UserDetailsState {
  data: any | null;     // single user detail
  loading: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: UserDetailsState = {
  data: null,
  loading: false,
  error: null,
};

/* ================= THUNK ================= */

export const getUserById = createAsyncThunk(
  "userDetails/getById",
  async (userId: number, { rejectWithValue }) => {
    try {
      const res = await api.post(ADMINENDPOINTS.USER_BY_ID, {
        userId: userId,
      });

      return res.data.data; // 👈 single user object
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch user details"
      );
    }
  }
);

/* ================= SLICE ================= */

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    resetUserDetails(state) {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- PENDING ---------- */
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })

      /* ---------- SUCCESS ---------- */
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      /* ---------- ERROR ---------- */
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetUserDetails } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
