import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

export interface PropertyReview {
  br_id: number;
  br_book_id: string;
  br_rating: string;
  br_title: string | null;
  br_desc: string | null;
}

export interface HostReview {
  hr_id: number;
  hr_book_id: string;
  hr_rating: number;
  hr_title: string | null;
  hr_description: string | null;
}

export interface PlatformReview {
  pr_id: number;
  pr_book_id: string;
  pr_rating: number;
  pr_title: string | null;
  pr_description: string | null;
}

export interface HostReviewForUser {
  hru_id: number;
  hru_bookingId: string;
  hru_rating: number;
  hru_title: string | null;
  hru_description: string | null;
  hru_userId: number;
  hru_hostId: number;

  "reviewUsername.user_fullName": string;
  "reviewHostName.user_fullName": string;
  "reviewProp.property_name": string;
}

export interface ReviewDetailData {
  propertyReview: PropertyReview | null;
  hostReview: HostReview | null;
  platformReview: PlatformReview | null;
  hostReviewForUser: HostReviewForUser | null;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: ReviewDetailData;
}

/* ================= STATE ================= */

interface ReviewDetailState {
  reviewDetail: ReviewDetailData | null;
  loading: boolean;
  error: string | null;
}

const initialState: ReviewDetailState = {
  reviewDetail: null,
  loading: false,
  error: null,
};

/* ================= THUNK ================= */

export const fetchReviewDetail = createAsyncThunk(
    "reviewDetail/fetchReviewDetail",
    async (reviewId: string, { rejectWithValue }) => {
      try {
        const response = await api.post<ApiResponse>(
          ADMINENDPOINTS.REVIEW_DETAIL,
          { reviewId }
        );
  
        return response.data.data;
      } catch (error: any) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch review detail"
        );
      }
    }
  );

/* ================= SLICE ================= */

const reviewDetailSlice = createSlice({
  name: "reviewDetail",
  initialState,
  reducers: {
    clearReviewDetail: (state) => {
      state.reviewDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchReviewDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewDetail = action.payload;
      })

      .addCase(fetchReviewDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearReviewDetail } = reviewDetailSlice.actions;

export default reviewDetailSlice.reducer;