import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

interface HostStatusUpdateState {
  success: boolean;
  loading: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: HostStatusUpdateState = {
  success: false,
  loading: false,
  error: null,
};

/* ================= THUNK ================= */

export const updateHostStatus = createAsyncThunk(
  "hostStatus/update",
  async (
    { hostId, isActive }: { hostId: number; isActive: 0 | 1 },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post(ADMINENDPOINTS.HOST_STATUS_UPDATE, {
        userId: hostId,
        isActive,
      });

      console.log(res, "res from host status update");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update host status"
      );
    }
  }
);

/* ================= SLICE ================= */

const hostStatusUpdateSlice = createSlice({
  name: "hostStatusUpdate",
  initialState,
  reducers: {
    resetHostStatusUpdateState(state) {
      state.success = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ---------- PENDING ---------- */
      .addCase(updateHostStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      /* ---------- SUCCESS ---------- */
      .addCase(updateHostStatus.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      /* ---------- ERROR ---------- */
      .addCase(updateHostStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetHostStatusUpdateState } = hostStatusUpdateSlice.actions;

export default hostStatusUpdateSlice.reducer;
