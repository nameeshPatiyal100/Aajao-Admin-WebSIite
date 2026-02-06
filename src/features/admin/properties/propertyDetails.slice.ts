import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

interface PropertyDetailsState {
  data: any | null; // single property detail
  loading: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: PropertyDetailsState = {
  data: null,
  loading: false,
  error: null,
};

/* ================= THUNK ================= */

export const getPropertyById = createAsyncThunk(
  "propertyDetails/getById",
  async (propertyId: number, { rejectWithValue }) => {
    try {
      const res = await api.post(ADMINENDPOINTS.PROPERTY_BY_ID, {
        propertyId: propertyId,
      });
      console.log(res, "response from getPropertyById thunk");
      return res.data.data; // 👈 single cat object
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch property details"
      );
    }
  }
);

/* ================= SLICE ================= */

const propertyDetailsSlice = createSlice({
  name: "propertyDetails",
  initialState,
  reducers: {
    resetPropertyDetails(state) {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- PENDING ---------- */
      .addCase(getPropertyById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })

      /* ---------- SUCCESS ---------- */
      .addCase(getPropertyById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      /* ---------- ERROR ---------- */
      .addCase(getPropertyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetPropertyDetails } = propertyDetailsSlice.actions;
export default propertyDetailsSlice.reducer;
