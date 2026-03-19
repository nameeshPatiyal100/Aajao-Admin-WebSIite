import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= RESPONSE ================= */

interface ApiResponse {
  success: boolean;
  message: string;
}

/* ================= PAYLOAD ================= */

interface UpdateStatusPayload {
  cpn_id: number;
  cpn_status: number; // 0 or 1
}

/* ================= STATE ================= */

interface UpdateStatusState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: UpdateStatusState = {
  loading: false,
  success: false,
  error: null,
};

/* ================= THUNK ================= */

export const updateCouponStatus = createAsyncThunk(
  "coupon/updateStatus",
  async (payload: UpdateStatusPayload, { rejectWithValue }) => {
    try {
      const response = await api.post<ApiResponse>(
        ADMINENDPOINTS.UPDATE_COUPON_STATUS,
        payload
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update coupon status"
      );
    }
  }
);

/* ================= SLICE ================= */

const updateStatusSlice = createSlice({
  name: "updateStatus",
  initialState,
  reducers: {
    resetStatusState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCouponStatus.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(updateCouponStatus.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(updateCouponStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetStatusState } = updateStatusSlice.actions;
export default updateStatusSlice.reducer;