import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

interface PropertyCategoryAddUpdateState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: PropertyCategoryAddUpdateState = {
  loading: false,
  success: false,
  error: null,
};

/* ================= THUNK ================= */

/**
 * payload: FormData containing category info + optional images
 */
export const addOrUpdatePropertyCategory = createAsyncThunk<
  any,
  FormData,
  { rejectValue: string }
>("propertyCategoryAddUpdate/addOrUpdate", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post(ADMINENDPOINTS.PROPERTY_CATEGORY_ADD_UPDATE, payload);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to add/update category"
    );
  }
});

/* ================= SLICE ================= */

const propertyCategoryAddUpdateSlice = createSlice({
  name: "propertyCategoryAddUpdate",
  initialState,
  reducers: {
    resetPropertyCategoryAddUpdateState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- PENDING ---------- */
      .addCase(addOrUpdatePropertyCategory.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      /* ---------- SUCCESS ---------- */
      .addCase(addOrUpdatePropertyCategory.fulfilled, (state, action) => {
        console.log(action, "fulfilled");
        state.loading = false;
        state.success = true;
      })

      /* ---------- ERROR ---------- */
      .addCase(addOrUpdatePropertyCategory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetPropertyCategoryAddUpdateState } = propertyCategoryAddUpdateSlice.actions;
export default propertyCategoryAddUpdateSlice.reducer;
