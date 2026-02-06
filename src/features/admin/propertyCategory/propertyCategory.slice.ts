import { createSlice } from "@reduxjs/toolkit";
import { fetchPropertyCategories, PropertyCategory } from "./propertyCategory.thunk";



interface PropertyCategoryState {
  categories: PropertyCategory[];
  loading: boolean;
  error: string | null;
  pagination: {
    totalRecords: number;
  };
}

const initialState: PropertyCategoryState = {
  categories: [],
  loading: false,
  error: null,
  pagination: {
    totalRecords: 0,
  },
};

const propertyCategorySlice = createSlice({
  name: "propertyCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertyCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
        state.pagination.totalRecords = action.payload.totalRecords;
      })
      .addCase(fetchPropertyCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default propertyCategorySlice.reducer;
