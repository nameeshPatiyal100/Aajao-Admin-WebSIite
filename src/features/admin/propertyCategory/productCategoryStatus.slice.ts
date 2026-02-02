import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

interface PropertyCategoryStatusState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: PropertyCategoryStatusState = {
  loading: false,
  success: false,
  error: null,
};

interface ChangeStatusPayload {
  categoryId: number;
  status: "1" | "0";
}


/* ================= THUNK ================= */

/**
 * payload: FormData containing category info + optional images
 */
export const changePropertyCategoryStatus = createAsyncThunk(
    "propertyCategoryStatus/changeStatus", 
    async (payload: ChangeStatusPayload, { rejectWithValue }) => {
  try {
    const res = await api.post(ADMINENDPOINTS.PROPERTY_CATEGORY_STATUS, payload);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to change category status"
    );
  }
});

/* ================= SLICE ================= */

const propertyCategoryStatusSlice = createSlice({
  name: "propertyCategoryStatus",
  initialState,
  reducers: {
    resetPropertyCategoryStatusState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- PENDING ---------- */
      .addCase(changePropertyCategoryStatus.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      /* ---------- SUCCESS ---------- */
      .addCase(changePropertyCategoryStatus.fulfilled, (state, action) => {
        console.log(action, "fulfilled");
        state.loading = false;
        state.success = true;
      })

      /* ---------- ERROR ---------- */
      .addCase(changePropertyCategoryStatus.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetPropertyCategoryStatusState } = propertyCategoryStatusSlice.actions;
export default propertyCategoryStatusSlice.reducer;
