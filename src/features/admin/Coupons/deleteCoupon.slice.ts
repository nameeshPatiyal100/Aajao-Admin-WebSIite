import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= RESPONSE ================= */

interface ApiResponse {
  success: boolean;
  message: string;
}

/* ================= STATE ================= */

interface DeleteCouponState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: DeleteCouponState = {
  loading: false,
  success: false,
  error: null,
};

/* ================= THUNK ================= */

export const deleteCoupon = createAsyncThunk(
  "coupon/delete",
  async (cpn_id: number, { rejectWithValue }) => {
    try {
      const response = await api.post<ApiResponse>(
        ADMINENDPOINTS.DELETE_COUPON, 
        { cpn_id }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete coupon"
      );
    }
  }
);

/* ================= SLICE ================= */

const deleteCouponSlice = createSlice({
  name: "deleteCoupon",
  initialState,
  reducers: {
    resetDeleteState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteCoupon.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(deleteCoupon.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(deleteCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetDeleteState } = deleteCouponSlice.actions;
export default deleteCouponSlice.reducer;