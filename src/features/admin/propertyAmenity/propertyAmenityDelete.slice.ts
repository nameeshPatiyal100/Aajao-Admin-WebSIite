import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

interface PropertyAmenityDeleteState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: PropertyAmenityDeleteState = {
  loading: false,
  success: false,
  error: null,
};

interface DeleteAmenityPayload {
  amenetiesId: string;
}


/* ================= THUNK ================= */

/**
 * payload: FormData containing Amenity info + optional images
 */
export const deletePropertyAmenity = createAsyncThunk(
    "propertyAmenityDelete/deleteAmenity", 
    async (payload: DeleteAmenityPayload, { rejectWithValue }) => {
  try {
    const res = await api.post(ADMINENDPOINTS.PROPERTY_AMENITY_DELETE, payload);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to delete Amenity"
    );
  }
});

/* ================= SLICE ================= */

const propertyAmenityDeleteSlice = createSlice({
  name: "propertyAmenityDelete",
  initialState,
  reducers: {
    resetPropertyAmenityDeleteState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- PENDING ---------- */
      .addCase(deletePropertyAmenity.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      /* ---------- SUCCESS ---------- */
      .addCase(deletePropertyAmenity.fulfilled, (state, action) => {
        console.log(action, "fulfilled");
        state.loading = false;
        state.success = true;
      })

      /* ---------- ERROR ---------- */
      .addCase(deletePropertyAmenity.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetPropertyAmenityDeleteState } = propertyAmenityDeleteSlice.actions;
export default propertyAmenityDeleteSlice.reducer;
