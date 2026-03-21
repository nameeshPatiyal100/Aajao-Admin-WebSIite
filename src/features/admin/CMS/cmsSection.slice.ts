import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

export interface CmsSection {
  cs_id: number;
  cs_title: string;
  cs_slug: string;
  cs_isActive: number;
  cs_url: string;
  cs_order: number;
  cs_created_at: string | null;
}

interface CmsSectionResponse {
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
    sections: CmsSection[];
  };
}

/* ================= STATE ================= */

interface CmsSectionState {
  data: CmsSectionResponse["data"] | null;
  loading: boolean;
  error: string | null;
}

const initialState: CmsSectionState = {
  data: null,
  loading: false,
  error: null,
};

/* ================= THUNK ================= */

export const fetchCmsSections = createAsyncThunk<
  CmsSectionResponse["data"],
  { page: number; limit: number; search?: string },
  { rejectValue: string }
>("cmsSection/fetch", async (payload, { rejectWithValue }) => {
  try {
    const response = await api.post<CmsSectionResponse>(
      ADMINENDPOINTS.CMS_SECTION_LISTING,
      payload
    );

    return response.data.data;
  } catch (error: any) {
    const errMsg =
      error.response?.data?.message || "Failed to fetch CMS sections";
    return rejectWithValue(errMsg);
  }
});

/* ================= SLICE ================= */

const cmsSectionSlice = createSlice({
  name: "cmsSection",
  initialState,
  reducers: {
    clearCmsSections: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCmsSections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchCmsSections.fulfilled,
        (state, action: PayloadAction<CmsSectionResponse["data"]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )

      .addCase(fetchCmsSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

/* ================= EXPORTS ================= */

export const { clearCmsSections } = cmsSectionSlice.actions;

export default cmsSectionSlice.reducer;