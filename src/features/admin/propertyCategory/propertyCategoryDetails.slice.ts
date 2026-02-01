import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

interface CategoryDetailsState {
  data: any | null; // single category detail
  loading: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: CategoryDetailsState = {
  data: null,
  loading: false,
  error: null,
};

/* ================= THUNK ================= */

export const getPropertyCategoryById = createAsyncThunk(
  "categoryDetails/getById",
  async (categoryId: number, { rejectWithValue }) => {
    try {
      const res = await api.post(ADMINENDPOINTS.PROPERTY_CATEGORY_BY_ID, {
        categoryId: categoryId,
      });
      console.log(res, "response from getPropertyCategoryById thunk");
      return res.data.data; // 👈 single cat object
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch category details"
      );
    }
  }
);

/* ================= SLICE ================= */

const categoryDetailsSlice = createSlice({
  name: "categoryDetails",
  initialState,
  reducers: {
    resetCategoryDetails(state) {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- PENDING ---------- */
      .addCase(getPropertyCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })

      /* ---------- SUCCESS ---------- */
      .addCase(getPropertyCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      /* ---------- ERROR ---------- */
      .addCase(getPropertyCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetCategoryDetails } = categoryDetailsSlice.actions;
export default categoryDetailsSlice.reducer;
