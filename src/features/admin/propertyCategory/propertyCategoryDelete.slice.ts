import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

interface PropertyCategoryDeleteState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: PropertyCategoryDeleteState = {
  loading: false,
  success: false,
  error: null,
};

interface DeleteCategoryPayload {
  categoryId: string;
}


/* ================= THUNK ================= */

/**
 * payload: FormData containing category info + optional images
 */
export const deletePropertyCategory = createAsyncThunk(
    "propertyCategoryDelete/deleteCategory", 
    async (payload: DeleteCategoryPayload, { rejectWithValue }) => {
  try {
    const res = await api.post(ADMINENDPOINTS.PROPERTY_CATEGORY_DELETE, payload);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to delete category"
    );
  }
});

/* ================= SLICE ================= */

const propertyCategoryDeleteSlice = createSlice({
  name: "propertyCategoryDelete",
  initialState,
  reducers: {
    resetPropertyCategoryDeleteState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- PENDING ---------- */
      .addCase(deletePropertyCategory.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      /* ---------- SUCCESS ---------- */
      .addCase(deletePropertyCategory.fulfilled, (state, action) => {
        console.log(action, "fulfilled");
        state.loading = false;
        state.success = true;
      })

      /* ---------- ERROR ---------- */
      .addCase(deletePropertyCategory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetPropertyCategoryDeleteState } = propertyCategoryDeleteSlice.actions;
export default propertyCategoryDeleteSlice.reducer;
