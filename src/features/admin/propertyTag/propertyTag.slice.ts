import { createSlice } from "@reduxjs/toolkit";
import { fetchPropertyTags, PropertyTag } from "./propertyTag.thunk";



interface PropertyTagState {
  tags: PropertyTag[];
  loading: boolean;
  error: string | null;
  pagination: {
    totalRecords: number;
  };
}

const initialState: PropertyTagState = {
  tags: [],
  loading: false,
  error: null,
  pagination: {
    totalRecords: 0,
  },
};

const propertyTagSlice = createSlice({
  name: "propertyTag",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertyTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyTags.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = action.payload.tags;
        state.pagination.totalRecords = action.payload.totalRecords;
      })
      .addCase(fetchPropertyTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default propertyTagSlice.reducer;
