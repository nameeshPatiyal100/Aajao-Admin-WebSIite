import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

interface PropertyTagAddUpdateState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: PropertyTagAddUpdateState = {
  loading: false,
  success: false,
  error: null,
};

/* ================= THUNK ================= */

/**
 * payload: FormData containing Tag info + optional images
 */
export const addOrUpdatePropertyTag = createAsyncThunk<
  any,
  FormData,
  { rejectValue: string }
>("propertyTagAddUpdate/addOrUpdate", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post(ADMINENDPOINTS.PROPERTY_TAG_ADD_UPDATE, payload);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to add/update Tag"
    );
  }
});

/* ================= SLICE ================= */

const propertyTagAddUpdateSlice = createSlice({
  name: "propertyTagAddUpdate",
  initialState,
  reducers: {
    resetPropertyTagAddUpdateState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- PENDING ---------- */
      .addCase(addOrUpdatePropertyTag.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      /* ---------- SUCCESS ---------- */
      .addCase(addOrUpdatePropertyTag.fulfilled, (state, action) => {
        console.log(action, "fulfilled");
        state.loading = false;
        state.success = true;
      })

      /* ---------- ERROR ---------- */
      .addCase(addOrUpdatePropertyTag.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetPropertyTagAddUpdateState } = propertyTagAddUpdateSlice.actions;
export default propertyTagAddUpdateSlice.reducer;
