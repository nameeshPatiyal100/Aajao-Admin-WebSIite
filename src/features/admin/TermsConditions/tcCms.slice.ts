import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

export interface TermsItem {
  tc_id: number;
  tc_title: string;
  tc_type: number;
  tc_isActive: number;
  tc_created_at: string;
}

interface TermsResponse {
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
    terms: TermsItem[];
  };
}

/* ================= STATE ================= */

interface TermsState {
  data: TermsResponse["data"] | null;
  loading: boolean;
  error: string | null;
}

const initialState: TermsState = {
  data: null,
  loading: false,
  error: null,
};

/* ================= THUNK ================= */

export const fetchTerms = createAsyncThunk<
  TermsResponse["data"],
  { page: number; limit: number; search?: string },
  { rejectValue: string }
>("terms/fetch", async (payload, { rejectWithValue }) => {
  try {
    const response = await api.post<TermsResponse>(
      ADMINENDPOINTS.TERMS_LISTING,
      payload
    );

    return response.data.data;
  } catch (error: any) {
    const errMsg =
      error.response?.data?.message || "Failed to fetch terms";
    return rejectWithValue(errMsg);
  }
});

/* ================= SLICE ================= */

const termsSlice = createSlice({
  name: "terms",
  initialState,
  reducers: {
    clearTerms: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTerms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchTerms.fulfilled,
        (state, action: PayloadAction<TermsResponse["data"]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )

      .addCase(fetchTerms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

/* ================= EXPORTS ================= */

export const { clearTerms } = termsSlice.actions;

export default termsSlice.reducer;