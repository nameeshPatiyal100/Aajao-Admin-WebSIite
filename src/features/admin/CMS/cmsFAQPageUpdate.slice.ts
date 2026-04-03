import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";

/* ================= TYPES ================= */

interface FAQData {
  headerTitle: string;
  headerDesc: string;

  contactTitle: string;
  contactDesc: string;
  contactBtnTitle: string;
  contactBtnUrl: string;
  contactTarget: string;

  labelTitle: string;
  labelDesc: string;
  labelBtnTitle: string;
  labelBtnUrl: string;
  labelTarget: string;
  labelImage: string | null;
}

interface CmsFAQState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;

  data: FAQData | null;
  fetchLoading: boolean;
}
const initialState: CmsFAQState = {
  loading: false,
  success: false,
  error: null,
  message: null,

  data: null,
  fetchLoading: false,
};

export const updateCmsFAQPage = createAsyncThunk(
  "cmsFAQ/update",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "admin/cms/FaqPage/update",
        formData
      );

      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update FAQ CMS"
      );
    }
  }
);


export const getCmsFAQPage = createAsyncThunk(
  "cmsFAQ/get",
  async (cp_page_id: number, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `admin/cms/FaqPage/get?cp_page_id=${cp_page_id}`
      );

      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch FAQ CMS"
      );
    }
  }
);

/* ================= SLICE ================= */

const cmsFAQPageSlice = createSlice({
  name: "cmsFAQPage",
  initialState,
  reducers: {
    resetCmsFAQState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ===== UPDATE ===== */
      .addCase(updateCmsFAQPage.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(updateCmsFAQPage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message =
          action.payload?.message || "FAQ CMS updated successfully";
      })

      .addCase(updateCmsFAQPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* ===== GET ===== */
      .addCase(getCmsFAQPage.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })

      .addCase(getCmsFAQPage.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.data = action.payload?.data || null;
      })

      .addCase(getCmsFAQPage.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.payload as string;
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetCmsFAQState } = cmsFAQPageSlice.actions;

export default cmsFAQPageSlice.reducer;