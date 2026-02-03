import { createSlice } from "@reduxjs/toolkit";
import { fetchPropertyTags, PropertyTag } from "./propertyTag.thunk";



interface PropertyTagState {
  tags: PropertyTag[];
  loading: boolean;
  error: string | null;
}

const initialState: PropertyTagState = {
  tags: [],
  loading: false,
  error: null,
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
        state.tags = action.payload;
      })
      .addCase(fetchPropertyTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default propertyTagSlice.reducer;
