import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

interface PropertyDeleteState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: PropertyDeleteState = {
  loading: false,
  success: false,
  error: null,
};

interface DeletePropertyPayload {
  propertyId: string;
}


/* ================= THUNK ================= */

/**
 * payload: FormData containing Property info + optional images
 */
export const deleteProperty = createAsyncThunk(
    "propertyDelete/deleteProperty", 
    async (payload: DeletePropertyPayload, { rejectWithValue }) => {
  try {
    const res = await api.post(ADMINENDPOINTS.PROPERTY_DELETE, payload);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to delete Property"
    );
  }
});

/* ================= SLICE ================= */

const propertyDeleteSlice = createSlice({
  name: "propertyDelete",
  initialState,
  reducers: {
    resetPropertyDeleteState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- PENDING ---------- */
      .addCase(deleteProperty.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      /* ---------- SUCCESS ---------- */
      .addCase(deleteProperty.fulfilled, (state, action) => {
        console.log(action, "fulfilled");
        state.loading = false;
        state.success = true;
      })

      /* ---------- ERROR ---------- */
      .addCase(deleteProperty.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetPropertyDeleteState } = propertyDeleteSlice.actions;
export default propertyDeleteSlice.reducer;
