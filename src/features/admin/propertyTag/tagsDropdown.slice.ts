import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* =======================
   Types
======================= */

export interface Tag {
  tag_id: number;
  tag_name: string;
}

interface TagsApiResponse {
  success: boolean;
  message: string;
  data: Tag[];
}

interface TagsState {
  tagsList: Tag[];
  loading: boolean;
  error: string | null;
}

/* =======================
   Initial State
======================= */

const initialState: TagsState = {
  tagsList: [],
  loading: false,
  error: null,
};


export const fetchTagsDropdown = createAsyncThunk<
  Tag[],
  void,              
  { rejectValue: string }
>(
  "tags/fetchList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<TagsApiResponse>(
        ADMINENDPOINTS.PROPERTY_TAG_DROPDOWN
      );

      return response.data.data;
    } catch (error: any) {
      const errMsg =
        error.response?.data?.message || "Failed to fetch tags";
      return rejectWithValue(errMsg);
    }
  }
);

/* =======================
   Slice
======================= */

const tagsSliceDropdown = createSlice({
  name: "tags",
  initialState,
  reducers: {
    clearTags: (state) => {
      state.tagsList = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTagsDropdown.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTagsDropdown.fulfilled, (state, action) => {
        state.loading = false;
        state.tagsList = action.payload;
      })
      .addCase(fetchTagsDropdown.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearTags } = tagsSliceDropdown.actions;
export default tagsSliceDropdown.reducer;
