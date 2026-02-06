import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

interface PropertyStatusState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: PropertyStatusState = {
  loading: false,
  success: false,
  error: null,
};

interface ChangeStatusPayload {
  propertyId: number;
  status: "1" | "0";
}


/* ================= THUNK ================= */

/**
 * payload: FormData containing property info + optional images
 */
export const changePropertyStatus = createAsyncThunk(
    "propertyStatus/changeStatus", 
    async (payload: ChangeStatusPayload, { rejectWithValue }) => {
  try {
    const res = await api.post(ADMINENDPOINTS.PROPERTY_STATUS, payload);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to change property status"
    );
  }
});

/* ================= SLICE ================= */

const propertyStatusSlice = createSlice({
  name: "propertyStatus",
  initialState,
  reducers: {
    resetPropertyStatusState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- PENDING ---------- */
      .addCase(changePropertyStatus.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      /* ---------- SUCCESS ---------- */
      .addCase(changePropertyStatus.fulfilled, (state, action) => {
        console.log(action, "fulfilled");
        state.loading = false;
        state.success = true;
      })

      /* ---------- ERROR ---------- */
      .addCase(changePropertyStatus.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetPropertyStatusState } = propertyStatusSlice.actions;
export default propertyStatusSlice.reducer;
