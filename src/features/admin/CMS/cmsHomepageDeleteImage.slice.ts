import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

interface DeleteImageState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
}
const initialState: DeleteImageState = {
  loading: false,
  success: false,
  error: null,
  message: null,
};

export const deleteCmsHomepageImage = createAsyncThunk(
  "cmsHomepage/deleteImage",
  async (
    payload: { cp_page_id: number; cp_section_id: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post(
        ADMINENDPOINTS.CMS_HOMEPAGE_DELETE_IMAGE,
        payload // ✅ body payload
      );

      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete image"
      );
    }
  }
);

const cmsHomepageDeleteImageSlice = createSlice({
  name: "cmsHomepageDeleteImage",
  initialState,
  reducers: {
    resetDeleteImage(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteCmsHomepageImage.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(deleteCmsHomepageImage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message =
          action.payload?.message || "Image deleted successfully";
      })

      .addCase(deleteCmsHomepageImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { resetDeleteImage } =
  cmsHomepageDeleteImageSlice.actions;

export default cmsHomepageDeleteImageSlice.reducer;