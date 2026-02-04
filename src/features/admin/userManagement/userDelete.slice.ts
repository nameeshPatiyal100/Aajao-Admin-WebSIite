// src/features/admin/userManagement/userDelete.slice.ts

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

interface DeleteUserState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: DeleteUserState = {
  loading: false,
  success: false,
  error: null,
};

/* ================= THUNK ================= */

export const deleteUser = createAsyncThunk<
  void,
  number,
  { rejectValue: string }
>("userDelete/deleteUser", async (userId, { rejectWithValue }) => {
  try {
    await api.post(ADMINENDPOINTS.DELETE_USER, {
      userId: userId,
    });
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to delete user"
    );
  }
});

/* ================= SLICE ================= */

const userDeleteSlice = createSlice({
  name: "userDelete",
  initialState,
  reducers: {
    resetDeleteUserState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- PENDING ---------- */
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      /* ---------- SUCCESS ---------- */
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      /* ---------- ERROR ---------- */
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete user";
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetDeleteUserState } = userDeleteSlice.actions;
export default userDeleteSlice.reducer;
