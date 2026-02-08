import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* =======================
   Types
======================= */

export interface Category {
  id: number;
  name: string;
}

interface CategoryApiItem {
  cat_id: number;
  cat_title: string;
}

interface CategoryApiResponse {
  success: boolean;
  message: string;
  data: CategoryApiItem[];
}

interface CategoryState {
  categoriesList: Category[];
  loading: boolean;
  error: string | null;
}

/* =======================
   Initial State
======================= */

const initialState: CategoryState = {
  categoriesList: [],
  loading: false,
  error: null,
};

/* =======================
   Thunk
======================= */

export const fetchCateDropdown = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>(
  "category/fetchDropdown",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<CategoryApiResponse>(
        ADMINENDPOINTS.CATEGORY_DROPDOWN // 👈 your endpoint
      );

      // ✅ Normalize backend response
      return response.data.data.map((cat) => ({
        id: cat.cat_id,
        name: cat.cat_title,
      }));
    } catch (error: any) {
      const errMsg =
        error.response?.data?.message || "Failed to fetch categories";
      return rejectWithValue(errMsg);
    }
  }
);

/* =======================
   Slice
======================= */

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearCategories: (state) => {
      state.categoriesList = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCateDropdown.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCateDropdown.fulfilled, (state, action) => {
        state.loading = false;
        state.categoriesList = action.payload;
      })
      .addCase(fetchCateDropdown.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearCategories } = categorySlice.actions;
export default categorySlice.reducer;
