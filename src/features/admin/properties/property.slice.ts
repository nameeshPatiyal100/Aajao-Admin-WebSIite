import { createSlice } from "@reduxjs/toolkit";
import { fetchProperties, Property } from "./property.thunk";



interface PropertyState {
  properties: Property[];
  loading: boolean;
  error: string | null;
  pagination: {
    totalRecords: number;
  };
}

const initialState: PropertyState = {
  properties: [],
  pagination: {
    totalRecords: 0,
  },
  loading: false,
  error: null,
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload.properties;
        state.pagination.totalRecords = action.payload.totalRecords;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default propertySlice.reducer;
