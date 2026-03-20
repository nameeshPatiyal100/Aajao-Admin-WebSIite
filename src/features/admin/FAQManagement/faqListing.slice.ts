import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

interface FaqItem {
  faq_id: number;
  faq_question: string;
  faq_answer: string;
  faq_display_order: number;
  faq_is_active: number;
  faq_created_at: string;
}

interface FaqListingData {
  totalRecords: number;
  currentPage: number;
  totalPages: number;
  search: string;
  page: number;
  limit: number;
  offset: number;
  sections: FaqItem[];
}

interface FaqListingApiResponse {
  success: boolean;
  message: string;
  data: FaqListingData;
}

/* ================= STATE ================= */

interface FaqListingState {
  data: FaqListingData | null;
  loading: boolean;
  error: string | null;
}

const initialState: FaqListingState = {
  data: null,
  loading: false,
  error: null,
};

/* ================= THUNK ================= */

export const fetchFaqListing = createAsyncThunk<
  FaqListingData,
  {
    page?: number;
    limit?: number;
    search?: string;
  },
  { rejectValue: string }
>("faqListing/fetch", async (params, { rejectWithValue }) => {
  try {
    const response = await api.post<FaqListingApiResponse>(
      ADMINENDPOINTS.FAQ_LISTING,
      params
    );

    return response.data.data;
  } catch (error: any) {
    const errMsg =
      error.response?.data?.message || "Failed to fetch FAQ listing";
    return rejectWithValue(errMsg);
  }
});

/* ================= SLICE ================= */

const faqListingSlice = createSlice({
  name: "faqListing",
  initialState,
  reducers: {
    clearFaqListing: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaqListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchFaqListing.fulfilled,
        (state, action: PayloadAction<FaqListingData>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )

      .addCase(fetchFaqListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

/* ================= EXPORTS ================= */

export const { clearFaqListing } = faqListingSlice.actions;

export default faqListingSlice.reducer;