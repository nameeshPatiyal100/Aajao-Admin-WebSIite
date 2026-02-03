import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

interface PropertyAmenityStatusState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: PropertyAmenityStatusState = {
  loading: false,
  success: false,
  error: null,
};

interface ChangeStatusPayload {
  amenetiesId: number;
  amn_isActive: "1" | "0";
}


/* ================= THUNK ================= */

/**
 * payload: FormData containing AMENITY info + optional images
 */
export const changePropertyAmenityStatus = createAsyncThunk(
    "propertyAmenityStatus/changeStatus", 
    async (payload: ChangeStatusPayload, { rejectWithValue }) => {
  try {
    const res = await api.post(ADMINENDPOINTS.PROPERTY_AMENITY_STATUS, payload);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to change AMENITY status"
    );
  }
});

/* ================= SLICE ================= */

const propertyAmenityStatusSlice = createSlice({
  name: "propertyAmenityStatus",
  initialState,
  reducers: {
    resetPropertyAmenityStatusState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- PENDING ---------- */
      .addCase(changePropertyAmenityStatus.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      /* ---------- SUCCESS ---------- */
      .addCase(changePropertyAmenityStatus.fulfilled, (state, action) => {
        console.log(action, "fulfilled");
        state.loading = false;
        state.success = true;
      })

      /* ---------- ERROR ---------- */
      .addCase(changePropertyAmenityStatus.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetPropertyAmenityStatusState } = propertyAmenityStatusSlice.actions;
export default propertyAmenityStatusSlice.reducer;
