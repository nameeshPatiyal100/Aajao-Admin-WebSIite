import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

export interface TermDetail {
  tc_id: number;
  tc_title: string;
  tc_description: string;
  tc_type: number;
  tc_isActive: number;
}

interface TermDetailResponse {
  success: boolean;
  message: string;
  data: TermDetail;
}

/* ================= STATE ================= */

interface TermDetailState {
  data: TermDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: TermDetailState = {
  data: null,
  loading: false,
  error: null,
};

/* ================= THUNK ================= */

export const fetchTermDetail = createAsyncThunk<
  TermDetail,
  { tc_id: number },
  { rejectValue: string }
>("termDetail/fetch", async (payload, { rejectWithValue }) => {
  try {
    const response = await api.post<TermDetailResponse>(
      ADMINENDPOINTS.TERM_DETAIL,
      payload
    );

    return response.data.data;
  } catch (error: any) {
    const errMsg =
      error.response?.data?.message || "Failed to fetch term detail";
    return rejectWithValue(errMsg);
  }
});

/* ================= SLICE ================= */

const termDetailSlice = createSlice({
  name: "termDetail",
  initialState,
  reducers: {
    clearTermDetail: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTermDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchTermDetail.fulfilled,
        (state, action: PayloadAction<TermDetail>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )

      .addCase(fetchTermDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

/* ================= EXPORTS ================= */

export const { clearTermDetail } = termDetailSlice.actions;

export default termDetailSlice.reducer;