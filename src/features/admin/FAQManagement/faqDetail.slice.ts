import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

interface FaqDetail {
  faq_id: number;
  faq_question: string;
  faq_answer: string;
  faq_display_order: number;
  faq_is_active: number;
}

interface FaqDetailResponse {
  success: boolean;
  message: string;
  data: FaqDetail;
}

/* ================= STATE ================= */

interface FaqDetailState {
  data: FaqDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: FaqDetailState = {
  data: null,
  loading: false,
  error: null,
};

/* ================= THUNK ================= */

export const fetchFaqDetail = createAsyncThunk<
  FaqDetail,
  { faqId: number },
  { rejectValue: string }
>("faqDetail/fetch", async ({ faqId }, { rejectWithValue }) => {
  try {
    const response = await api.post<FaqDetailResponse>(
      ADMINENDPOINTS.FAQ_DETAIL,
      { faq_id: faqId }
    );

    return response.data.data;
  } catch (error: any) {
    const errMsg =
      error.response?.data?.message || "Failed to fetch FAQ detail";
    return rejectWithValue(errMsg);
  }
});

/* ================= SLICE ================= */

const faqDetailSlice = createSlice({
  name: "faqDetail",
  initialState,
  reducers: {
    clearFaqDetail: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaqDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchFaqDetail.fulfilled,
        (state, action: PayloadAction<FaqDetail>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )

      .addCase(fetchFaqDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

/* ================= EXPORTS ================= */

export const { clearFaqDetail } = faqDetailSlice.actions;

export default faqDetailSlice.reducer;