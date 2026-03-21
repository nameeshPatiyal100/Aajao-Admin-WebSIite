import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

export interface SaveTermPayload {
  tc_id?: number; 
  tc_title: string;
  tc_description: string;
  tc_type: number;
  tc_isActive: 0 | 1;
}

interface SaveTermResponse {
  success: boolean;
  message: string;
  data?: any;
}

/* ================= STATE ================= */

interface SaveTermState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: SaveTermState = {
  loading: false,
  success: false,
  error: null,
};

/* ================= THUNK ================= */

export const saveTerm = createAsyncThunk<
  any,
  SaveTermPayload,
  { rejectValue: string }
>("term/save", async (payload, { rejectWithValue }) => {
  try {
    const response = await api.post<SaveTermResponse>(
      ADMINENDPOINTS.TERM_SAVE,
      payload
    );

    return response.data;
  } catch (error: any) {
    const errMsg =
      error.response?.data?.message || "Failed to save term";
    return rejectWithValue(errMsg);
  }
});

/* ================= SLICE ================= */

const saveTermSlice = createSlice({
  name: "saveTerm",
  initialState,
  reducers: {
    clearSaveTermState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveTerm.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(
        saveTerm.fulfilled,
        (state, action: PayloadAction<SaveTermResponse>) => {
          state.loading = false;
          state.success = true;
        }
      )

      .addCase(saveTerm.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

/* ================= EXPORTS ================= */

export const { clearSaveTermState } = saveTermSlice.actions;

export default saveTermSlice.reducer;