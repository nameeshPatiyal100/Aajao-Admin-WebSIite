import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

interface TagDetailsState {
  data: any | null; // single tag detail
  loading: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: TagDetailsState = {
  data: null,
  loading: false,
  error: null,
};

/* ================= THUNK ================= */

export const getPropertyTagById = createAsyncThunk(
  "tagDetails/getById",
  async (tagId: number, { rejectWithValue }) => {
    try {
      const res = await api.post(ADMINENDPOINTS.PROPERTY_TAG_BY_ID, {
        tagId: tagId,
      });
      console.log(res, "response from getPropertyTagById thunk");
      return res.data.data; // 👈 single cat object
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch tag details"
      );
    }
  }
);

/* ================= SLICE ================= */

const propertyTagDetailsSlice = createSlice({
  name: "tagDetails",
  initialState,
  reducers: {
    resetTagDetails(state) {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- PENDING ---------- */
      .addCase(getPropertyTagById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })

      /* ---------- SUCCESS ---------- */
      .addCase(getPropertyTagById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      /* ---------- ERROR ---------- */
      .addCase(getPropertyTagById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetTagDetails } = propertyTagDetailsSlice.actions;
export default propertyTagDetailsSlice.reducer;
