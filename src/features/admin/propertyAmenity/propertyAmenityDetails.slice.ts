import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

interface AmenityDetailsState {
  data: any | null; // single amenity detail
  loading: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: AmenityDetailsState = {
  data: null,
  loading: false,
  error: null,
};

/* ================= THUNK ================= */

export const getPropertyAmenityById = createAsyncThunk(
  "amenityDetails/getById",
  async (amenetiesId: number, { rejectWithValue }) => {
    try {
      const res = await api.post(ADMINENDPOINTS.PROPERTY_AMENITY_BY_ID, {
        amenetiesId: amenetiesId,
      });
      console.log(res, "response from getPropertyAmenityById thunk");
      return res.data.data; // 👈 single cat object
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch amenity details"
      );
    }
  }
);

/* ================= SLICE ================= */

const propertyAmenityDetailsSlice = createSlice({
  name: "amenityDetails",
  initialState,
  reducers: {
    resetAmenityDetails(state) {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- PENDING ---------- */
      .addCase(getPropertyAmenityById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })

      /* ---------- SUCCESS ---------- */
      .addCase(getPropertyAmenityById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      /* ---------- ERROR ---------- */
      .addCase(getPropertyAmenityById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetAmenityDetails } = propertyAmenityDetailsSlice.actions;
export default propertyAmenityDetailsSlice.reducer;
