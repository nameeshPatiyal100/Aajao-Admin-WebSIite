import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

interface PropertyAddUpdateState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: PropertyAddUpdateState = {
  loading: false,
  success: false,
  error: null,
};

/* ================= THUNK ================= */

/**
 * payload: FormData containing Property info + optional images
 */
export const addOrUpdateProperty = createAsyncThunk<
  any,
  FormData,
  { rejectValue: string }
>("propertyAddUpdate/addOrUpdate", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post(ADMINENDPOINTS.PROPERTY_ADD_UPDATE, payload);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to add/update Property"
    );
  }
});

/* ================= SLICE ================= */

const propertyAddUpdateSlice = createSlice({
  name: "propertyAddUpdate",
  initialState,
  reducers: {
    resetPropertyAddUpdateState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- PENDING ---------- */
      .addCase(addOrUpdateProperty.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      /* ---------- SUCCESS ---------- */
      .addCase(addOrUpdateProperty.fulfilled, (state, action) => {
        console.log(action, "fulfilled");
        state.loading = false;
        state.success = true;
      })

      /* ---------- ERROR ---------- */
      .addCase(addOrUpdateProperty.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetPropertyAddUpdateState } = propertyAddUpdateSlice.actions;
export default propertyAddUpdateSlice.reducer;
