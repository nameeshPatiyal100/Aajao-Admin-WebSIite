import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

interface DeleteFaqResponse {
  success: boolean;
  message: string;
}

/* ================= STATE ================= */

interface DeleteFaqState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: DeleteFaqState = {
  loading: false,
  success: false,
  error: null,
};

/* ================= THUNK ================= */

export const deleteFaq = createAsyncThunk<
  DeleteFaqResponse,
  { faq_Id: number },
  { rejectValue: string }
>("faqDelete/delete", async ({ faq_Id }, { rejectWithValue }) => {
  try {
    const response = await api.post<DeleteFaqResponse>(
      ADMINENDPOINTS.DELETE_FAQ,
      { faq_id: faq_Id }
    );

    return response.data;
  } catch (error: any) {
    const errMsg =
      error.response?.data?.message || "Failed to delete FAQ";
    return rejectWithValue(errMsg);
  }
});

/* ================= SLICE ================= */

const faqDeleteSlice = createSlice({
  name: "faqDelete",
  initialState,
  reducers: {
    resetDeleteFaqState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteFaq.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(deleteFaq.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(deleteFaq.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetDeleteFaqState } = faqDeleteSlice.actions;

export default faqDeleteSlice.reducer;