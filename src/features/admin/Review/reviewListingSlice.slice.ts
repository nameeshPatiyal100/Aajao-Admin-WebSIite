import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= API TYPES ================= */

export interface ReviewApiRecord {
  br_id: number;
  br_book_id: string;
  br_propId: number;
  br_rating: string;
  br_isActive: number;
  br_addedAt: string;

  propReview: {
    property_name: string;
  };

  userReview: {
    user_fullName: string;
  };
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    page: number;
    limit: number;
    offset: number;
    totalRecords: number;
    currentPage: number;
    totalPages: number;
    reviews: ReviewApiRecord[];
  };
}

/* ================= UI TYPE ================= */

export interface Review {
  id: string;
  property: string;
  user_name: string;
  rating: "1" | "2" | "3" | "4" | "5";
  status: "0" | "1";
}

/* ================= STATE ================= */

interface ReviewState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
  totalRecords: number;
  page: number;
}

const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: null,
  totalRecords: 0,
  page: 1,
};

/* ================= THUNK ================= */

export const fetchReviewListing = createAsyncThunk(
  "reviewListing/fetchAll",
  async (
    payload: {
      page: number;
      search: string;
      limit: number;
      status: string;
      rating?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const requestPayload = {
        ...payload,
        status: payload.status ? Number(payload.status) : undefined,
        rating: payload.rating ? Number(payload.rating) : undefined,
      };

      const response = await api.post<ApiResponse>(
        ADMINENDPOINTS.REVIEW_LISTING,
        requestPayload
      );

      const resData = response.data;

      const reviews: Review[] = resData.data.reviews.map((item) => {
        const ratingValue = Math.round(Number(item.br_rating)).toString() as
          | "1"
          | "2"
          | "3"
          | "4"
          | "5";

        return {
          id: String(item.br_id),
          property: item.propReview?.property_name ?? "",
          user_name: item.userReview?.user_fullName ?? "",
          rating: ratingValue,
          status: String(item.br_isActive) as "0" | "1",
        };
      });

      return {
        reviews,
        totalRecords: resData.data.totalRecords,
        page: payload.page,
      };
    } catch (error: any) {
      const errMsg = error.response?.data?.message || "Failed to fetch reviews";
      return rejectWithValue(errMsg);
    }
  }
);

/* ================= SLICE ================= */

const reviewListingSlice = createSlice({
  name: "reviewListing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewListing.pending, (state) => {
        state.loading = true;
        state.reviews = [];
        state.error = null;
      })

      .addCase(fetchReviewListing.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.reviews;
        state.totalRecords = action.payload.totalRecords;
        state.page = action.payload.page;
      })

      .addCase(fetchReviewListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default reviewListingSlice.reducer;
