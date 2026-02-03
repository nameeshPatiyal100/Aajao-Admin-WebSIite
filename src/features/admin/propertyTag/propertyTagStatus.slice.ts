import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

interface PropertyTagStatusState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: PropertyTagStatusState = {
  loading: false,
  success: false,
  error: null,
};

interface ChangeStatusPayload {
  tagId: number;
  tag_isActive: "1" | "0";
}


/* ================= THUNK ================= */

/**
 * payload: FormData containing Tag info + optional images
 */
export const changePropertyTagStatus = createAsyncThunk(
    "propertyTagStatus/changeStatus", 
    async (payload: ChangeStatusPayload, { rejectWithValue }) => {
  try {
    const res = await api.post(ADMINENDPOINTS.PROPERTY_TAG_STATUS, payload);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to change Tag status"
    );
  }
});

/* ================= SLICE ================= */

const propertyTagStatusSlice = createSlice({
  name: "propertyTagStatus",
  initialState,
  reducers: {
    resetPropertyTagStatusState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- PENDING ---------- */
      .addCase(changePropertyTagStatus.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      /* ---------- SUCCESS ---------- */
      .addCase(changePropertyTagStatus.fulfilled, (state, action) => {
        console.log(action, "fulfilled");
        state.loading = false;
        state.success = true;
      })

      /* ---------- ERROR ---------- */
      .addCase(changePropertyTagStatus.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetPropertyTagStatusState } = propertyTagStatusSlice.actions;
export default propertyTagStatusSlice.reducer;
