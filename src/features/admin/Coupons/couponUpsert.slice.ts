import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= FORM TYPE ================= */

export interface CouponFormData {
  coupon_title: string;
  coupon_code: string;
  cpn_type: number;
  discount_type: number;
  discount_percentage: number | "";
  discount_amount: number | "";
  min_amount: number | "";
  max_amount: number | "";
  valid_from: string;
  valid_to: string;
  usage_limit: number | "";
  status: number;
}

/* ================= API PAYLOAD ================= */

export interface CouponUpsertPayload {
  cpn_id: number | null;
  cpn_title: string;
  cpn_code: string;
  cpn_type: number;
  cpn_dsctn_type: number;
  cpn_dsctn_percnt: number | null;
  cpn_dsctn_amt: number | null;
  cpn_min_amt: number | null;
  cpn_max_amt: number | null;
  cpn_valid_from: string | null;
  cpn_valid_to: string | null;
  cpn_usage_limit: number | null;
  cpn_status: number;
}

/* ================= RESPONSE ================= */

interface ApiResponse {
  success: boolean;
  message: string;
}

/* ================= STATE ================= */

interface CouponUpsertState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: CouponUpsertState = {
  loading: false,
  success: false,
  error: null,
};

const mapFormToApi = (
  data: CouponFormData,
  cpn_id: number | null
): CouponUpsertPayload => ({
  cpn_id: cpn_id ?? null,

  cpn_title: data.coupon_title,
  cpn_code: data.coupon_code,
  cpn_type: Number(data.cpn_type),

  cpn_dsctn_type: data.discount_type,

  cpn_dsctn_percnt:
    data.discount_type === 1
      ? data.discount_percentage === ""
        ? null
        : Number(data.discount_percentage)
      : null,

  cpn_dsctn_amt:
    data.discount_type === 2
      ? data.discount_amount === ""
        ? null
        : Number(data.discount_amount)
      : null,

  cpn_min_amt: data.min_amount === "" ? null : Number(data.min_amount),
  cpn_max_amt: data.max_amount === "" ? null : Number(data.max_amount),

  cpn_valid_from: data.valid_from || null,
  cpn_valid_to: data.valid_to || null,

  cpn_usage_limit:
    data.usage_limit === "" ? null : Number(data.usage_limit),

  cpn_status: data.status,
});

export const saveCoupon = createAsyncThunk(
  "couponUpsert/save",
  async (
    payload: { formData: CouponFormData; cpn_id: number | null },
    { rejectWithValue }
  ) => {
    try {
      const requestBody = mapFormToApi(
        payload.formData,
        payload.cpn_id
      );

      const response = await api.post<ApiResponse>(
        ADMINENDPOINTS.COUPON_UPSERT, // 🔥 your endpoint
        requestBody
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to save coupon"
      );
    }
  }
);

/* ================= SLICE ================= */

const couponUpsertSlice = createSlice({
  name: "couponUpsert",
  initialState,
  reducers: {
    resetCouponUpsert: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveCoupon.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(saveCoupon.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(saveCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCouponUpsert } = couponUpsertSlice.actions;
export default couponUpsertSlice.reducer;