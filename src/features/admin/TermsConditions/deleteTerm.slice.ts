import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

interface DeleteTermPayload {
  tc_id: number;
}

interface DeleteTermResponse {
  success: boolean;
  message: string;
}

/* ================= STATE ================= */

interface DeleteTermState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: DeleteTermState = {
  loading: false,
  success: false,
  error: null,
};

/* ================= THUNK ================= */

export const deleteTerm = createAsyncThunk<
  DeleteTermResponse,
  DeleteTermPayload,
  { rejectValue: string }
>("term/delete", async (payload, { rejectWithValue }) => {
  try {
    const response = await api.post<DeleteTermResponse>(
      ADMINENDPOINTS.TERM_DELETE,
      payload
    );

    return response.data;
  } catch (error: any) {
    const errMsg =
      error.response?.data?.message || "Failed to delete term";
    return rejectWithValue(errMsg);
  }
});

/* ================= SLICE ================= */

const deleteTermSlice = createSlice({
  name: "deleteTerm",
  initialState,
  reducers: {
    clearDeleteTermState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteTerm.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(
        deleteTerm.fulfilled,
        (state, action: PayloadAction<DeleteTermResponse>) => {
          state.loading = false;
          state.success = true;
        }
      )

      .addCase(deleteTerm.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

/* ================= EXPORTS ================= */

export const { clearDeleteTermState } = deleteTermSlice.actions;

export default deleteTermSlice.reducer;