import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

interface PropertyAmenityAddUpdateState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: PropertyAmenityAddUpdateState = {
  loading: false,
  success: false,
  error: null,
};

/* ================= THUNK ================= */

/**
 * payload: FormData containing Amenity info + optional images
 */
export const addOrUpdatePropertyAmenity = createAsyncThunk<
  any,
  FormData,
  { rejectValue: string }
>("propertyAmenityAddUpdate/addOrUpdate", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post(ADMINENDPOINTS.PROPERTY_AMENITY_ADD_UPDATE, payload);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to add/update Amenity"
    );
  }
});

/* ================= SLICE ================= */

const propertyAmenityAddUpdateSlice = createSlice({
  name: "propertyAmenityAddUpdate",
  initialState,
  reducers: {
    resetPropertyAmenityAddUpdateState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- PENDING ---------- */
      .addCase(addOrUpdatePropertyAmenity.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      /* ---------- SUCCESS ---------- */
      .addCase(addOrUpdatePropertyAmenity.fulfilled, (state, action) => {
        console.log(action, "fulfilled");
        state.loading = false;
        state.success = true;
      })

      /* ---------- ERROR ---------- */
      .addCase(addOrUpdatePropertyAmenity.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetPropertyAmenityAddUpdateState } = propertyAmenityAddUpdateSlice.actions;
export default propertyAmenityAddUpdateSlice.reducer;
