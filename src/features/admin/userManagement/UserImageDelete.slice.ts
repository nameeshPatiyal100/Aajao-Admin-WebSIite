import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

interface UserImageDeleteState {
  success: boolean;
  loading: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: UserImageDeleteState = {
  success: false,
  loading: false,
  error: null,
};

export const deleteUserImage = createAsyncThunk(
  "userDelete/deleteImage",
  async (afileId: number, { rejectWithValue }) => {
    try {
      const res = await api.post(ADMINENDPOINTS.USER_IMAGE_DELETE, {
        afileId: afileId,
      });

      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete image"
      );
    }
  }
);

const userImageDeleteSlice = createSlice({
  name: "userImageDelete",
  initialState,
  reducers: {
    resetUserImageDeleteState(state) {
      state.success = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- PENDING ---------- */
      .addCase(deleteUserImage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      /* ---------- SUCCESS ---------- */
      .addCase(deleteUserImage.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      /* ---------- ERROR ---------- */
      .addCase(deleteUserImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { resetUserImageDeleteState } = userImageDeleteSlice.actions;
export default userImageDeleteSlice.reducer;
