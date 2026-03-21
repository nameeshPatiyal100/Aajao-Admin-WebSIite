import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

interface FaqUpsertPayload {
  faq_id: number | null; // ✅ null = add, number = update
  faq_question: string;
  faq_answer: string;
  faq_display_order: number;
  faq_is_active: number; // 0 | 1
}

interface FaqUpsertResponse {
  success: boolean;
  message: string;
}

/* ================= STATE ================= */

interface FaqUpsertState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
}

const initialState: FaqUpsertState = {
  loading: false,
  success: false,
  error: null,
  message: null,
};

/* ================= THUNK ================= */

export const upsertFaq = createAsyncThunk<
  FaqUpsertResponse,
  FaqUpsertPayload,
  { rejectValue: string }
>("faq/upsert", async (payload, { rejectWithValue }) => {
  try {
    const response = await api.post<FaqUpsertResponse>(
      ADMINENDPOINTS.FAQ_ADD_UPDATE,
      payload
    );

    return response.data;
  } catch (error: any) {
    const errMsg =
      error.response?.data?.message || "Failed to save FAQ";
    return rejectWithValue(errMsg);
  }
});

/* ================= SLICE ================= */

const faqUpsertSlice = createSlice({
  name: "faqUpsert",
  initialState,
  reducers: {
    resetFaqUpsertState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(upsertFaq.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })

      .addCase(
        upsertFaq.fulfilled,
        (state, action: PayloadAction<FaqUpsertResponse>) => {
          state.loading = false;
          state.success = true;
          state.message = action.payload.message;
        }
      )

      .addCase(upsertFaq.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetFaqUpsertState } = faqUpsertSlice.actions;

export default faqUpsertSlice.reducer;