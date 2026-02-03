import { createSlice } from "@reduxjs/toolkit";
import { fetchPropertyAmenities, PropertyAmenity } from "./propertyAmenity.thunk";



interface PropertyAmenityState {
  amenities: PropertyAmenity[];
  loading: boolean;
  error: string | null;
}

const initialState: PropertyAmenityState = {
  amenities: [],
  loading: false,
  error: null,
};

const propertyAmenitySlice = createSlice({
  name: "propertyAmenity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertyAmenities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyAmenities.fulfilled, (state, action) => {
        state.loading = false;
        state.amenities = action.payload;
      })
      .addCase(fetchPropertyAmenities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default propertyAmenitySlice.reducer;
