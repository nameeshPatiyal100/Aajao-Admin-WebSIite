import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= API TYPES ================= */

export interface CouponApiRecord {
  cpn_id: number;
  cpn_title: string;
  cpn_code: string;
  cpn_dsctn_percnt: number;
  cpn_status: number;
}

interface CouponApiResponse {
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
    coupons: CouponApiRecord[];
  };
}

/* ================= UI TYPE ================= */

export interface Coupon {
  id: string;
  title: string;
  code: string;
  discount: number;
  status: "0" | "1"; // 0 = inactive, 1 = active
}

/* ================= STATE ================= */

interface CouponState {
  coupons: Coupon[];
  loading: boolean;
  error: string | null;
  totalRecords: number;
  page: number;
}

const initialState: CouponState = {
  coupons: [],
  loading: false,
  error: null,
  totalRecords: 0,
  page: 1,
};

/* ================= THUNK ================= */

export const fetchCouponListing = createAsyncThunk(
  "couponListing/fetchAll",
  async (
    payload: {
      page: number;
      search: string;
      limit: number;
      status?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const requestPayload = {
        ...payload,
        status: payload.status ? Number(payload.status) : undefined,
      };

      const response = await api.post<CouponApiResponse>(
        ADMINENDPOINTS.COUPON_LISTING,
        requestPayload
      );

      const resData = response.data;

      const coupons: Coupon[] = resData.data.coupons.map((item) => ({
        id: String(item.cpn_id),
        title: item.cpn_title,
        code: item.cpn_code,
        discount: item.cpn_dsctn_percnt,
        status: String(item.cpn_status) as "0" | "1",
      }));

      return {
        coupons,
        totalRecords: resData.data.totalRecords,
        page: payload.page,
      };
    } catch (error: any) {
      const errMsg =
        error.response?.data?.message || "Failed to fetch coupons";
      return rejectWithValue(errMsg);
    }
  }
);

/* ================= SLICE ================= */

const couponListingSlice = createSlice({
  name: "couponListing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCouponListing.pending, (state) => {
        state.loading = true;
        state.coupons = [];
        state.error = null;
      })

      .addCase(fetchCouponListing.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload.coupons;
        state.totalRecords = action.payload.totalRecords;
        state.page = action.payload.page;
      })

      .addCase(fetchCouponListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default couponListingSlice.reducer;