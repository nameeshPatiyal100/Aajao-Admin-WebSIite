import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= API TYPE ================= */

export interface CouponDetailApi {
  cpn_id: number;
  cpn_title: string;
  cpn_code: string;
  cpn_dsctn_type: number;
  cpn_dsctn_percnt: number;
  cpn_dsctn_amt: number;
  cpn_min_amt: number;
  cpn_max_amt: number;
  cpn_valid_from: string;
  cpn_valid_to: string;
  cpn_usage_limit: number;
  cpn_status: number;
}

interface CouponDetailApiResponse {
  success: boolean;
  message: string;
  data: CouponDetailApi;
}

/* ================= UI TYPE ================= */

export interface CouponDetail {
  id: string;
  title: string;
  code: string;
  discountType: number;
  discountPercentage: number;
  discountAmount: number;
  minAmount: number;
  maxAmount: number;
  validFrom: string;
  validTo: string;
  usageLimit: number;
  status: "0" | "1";
}

/* ================= STATE ================= */

interface CouponDetailState {
    coupon: CouponDetailApi | null; // ✅ FIXED
    loading: boolean;
    error: string | null;
  }

const initialState: CouponDetailState = {
  coupon: null,
  loading: false,
  error: null,
};

/* ================= MAPPER ================= */

const mapApiToCouponDetail = (data: CouponDetailApi): CouponDetail => ({
  id: String(data.cpn_id),
  title: data.cpn_title,
  code: data.cpn_code,
  discountType: data.cpn_dsctn_type,
  discountPercentage: data.cpn_dsctn_percnt,
  discountAmount: data.cpn_dsctn_amt,
  minAmount: data.cpn_min_amt,
  maxAmount: data.cpn_max_amt,
  validFrom: data.cpn_valid_from,
  validTo: data.cpn_valid_to,
  usageLimit: data.cpn_usage_limit,
  status: String(data.cpn_status) as "0" | "1",
});

/* ================= THUNK ================= */

export const fetchCouponDetail = createAsyncThunk(
  "couponDetail/fetchOne",
  async (cpn_id: number, { rejectWithValue }) => {
    try {
      const response = await api.post<CouponDetailApiResponse>(
        ADMINENDPOINTS.COUPON_DETAIL,
        { cpn_id }
      );

      return response.data.data;
    } catch (error: any) {
      const errMsg =
        error.response?.data?.message || "Failed to fetch coupon detail";
      return rejectWithValue(errMsg);
    }
  }
);

/* ================= SLICE ================= */

const couponDetailSlice = createSlice({
  name: "couponDetail",
  initialState,
  reducers: {
    clearCouponDetail: (state) => {
      state.coupon = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCouponDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCouponDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.coupon = action.payload;
      })

      .addCase(fetchCouponDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

/* ================= EXPORTS ================= */

export const { clearCouponDetail } = couponDetailSlice.actions;
export default couponDetailSlice.reducer;