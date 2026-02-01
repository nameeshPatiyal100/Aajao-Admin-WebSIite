// src/features/admin/userManagement/userAddUpdate.slice.ts

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

interface UserAddUpdateState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: UserAddUpdateState = {
  loading: false,
  success: false,
  error: null,
};

/* ================= THUNK ================= */

/**
 * payload: FormData containing user info + optional images
 */
export const addOrUpdateUser = createAsyncThunk<
  any,
  FormData,
  { rejectValue: string }
>("userAddUpdate/addOrUpdate", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post(ADMINENDPOINTS.USER_ADD_UPDATE, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to add/update user"
    );
  }
});

/* ================= SLICE ================= */

const userAddUpdateSlice = createSlice({
  name: "userAddUpdate",
  initialState,
  reducers: {
    resetUserAddUpdateState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- PENDING ---------- */
      .addCase(addOrUpdateUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      /* ---------- SUCCESS ---------- */
      .addCase(addOrUpdateUser.fulfilled, (state, action) => {
        console.log(action, "fulfilled");
        state.loading = false;
        state.success = true;
      })

      /* ---------- ERROR ---------- */
      .addCase(addOrUpdateUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetUserAddUpdateState } = userAddUpdateSlice.actions;
export default userAddUpdateSlice.reducer;
