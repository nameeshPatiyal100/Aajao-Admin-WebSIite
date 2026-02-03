import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

interface PropertyTagDeleteState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: PropertyTagDeleteState = {
  loading: false,
  success: false,
  error: null,
};

interface DeleteTagPayload {
  tagId: string;
}


/* ================= THUNK ================= */

/**
 * payload: FormData containing Tag info + optional images
 */
export const deletePropertyTag = createAsyncThunk(
    "propertyTagDelete/deleteTag", 
    async (payload: DeleteTagPayload, { rejectWithValue }) => {
  try {
    const res = await api.post(ADMINENDPOINTS.PROPERTY_TAG_DELETE, payload);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to delete Tag"
    );
  }
});

/* ================= SLICE ================= */

const propertyTagDeleteSlice = createSlice({
  name: "propertyTagDelete",
  initialState,
  reducers: {
    resetPropertyTagDeleteState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- PENDING ---------- */
      .addCase(deletePropertyTag.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      /* ---------- SUCCESS ---------- */
      .addCase(deletePropertyTag.fulfilled, (state, action) => {
        console.log(action, "fulfilled");
        state.loading = false;
        state.success = true;
      })

      /* ---------- ERROR ---------- */
      .addCase(deletePropertyTag.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetPropertyTagDeleteState } = propertyTagDeleteSlice.actions;
export default propertyTagDeleteSlice.reducer;
