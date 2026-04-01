import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

interface CmsUpdateState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: CmsUpdateState = {
  loading: false,
  success: false,
  error: null,
  message: null,
};

/* ================= THUNK ================= */

export const updateCmsHomePage = createAsyncThunk(
  "cmsHomepage/update",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await api.post(
        ADMINENDPOINTS.CMS_HOMEPAGE_UPDATE,
        formData
      );

      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update CMS homepage"
      );
    }
  }
);

/* ================= SLICE ================= */

const cmsHomepageUpdateSlice = createSlice({
  name: "cmsHomepageUpdate",
  initialState,
  reducers: {
    resetCmsUpdate(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCmsHomePage.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(updateCmsHomePage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload?.message || "Updated successfully";
      })

      .addCase(updateCmsHomePage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetCmsUpdate } = cmsHomepageUpdateSlice.actions;

export default cmsHomepageUpdateSlice.reducer;