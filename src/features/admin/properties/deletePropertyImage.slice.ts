import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

interface DeleteImagePayload {
  afile_id: number;
  property_id: number;
}

interface DeleteImageState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: DeleteImageState = {
  loading: false,
  error: null,
  success: false,
};

export const deletePropertyImage = createAsyncThunk<
  number, // return afile_id on success
  DeleteImagePayload,
  { rejectValue: string }
>(
  "property/deleteImage",
  async ({ afile_id, property_id }, { rejectWithValue }) => {
    try {
      await api.post(ADMINENDPOINTS.DELETE_PROPERTY_IMAGE, {
        afile_id,
        property_id,
      });

      return afile_id;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete image"
      );
    }
  }
);

const deleteImageSlice = createSlice({
  name: "deletePropertyImage",
  initialState,
  reducers: {
    resetDeleteImageState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- PENDING ---------- */
      .addCase(deletePropertyImage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      /* ---------- FULFILLED ---------- */
      .addCase(deletePropertyImage.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      /* ---------- REJECTED ---------- */
      .addCase(deletePropertyImage.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to delete image";
      });
  },
});

export const { resetDeleteImageState } = deleteImageSlice.actions;
export default deleteImageSlice.reducer;

