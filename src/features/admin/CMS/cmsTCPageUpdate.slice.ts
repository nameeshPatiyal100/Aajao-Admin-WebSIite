import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

interface TCData {
  headerTitle: string;
  headerDesc: string;
  labelTitle: string;
  labelDesc: string;
  labelImage: string | null;
}

interface CmsTCState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
  data: TCData | null;
  fetchLoading: boolean;
}


const initialState: CmsTCState = {
  loading: false,
  success: false,
  error: null,
  message: null,

  data: null,
  fetchLoading: false,
};


export const updateCmsTCPage = createAsyncThunk(
  "cmsTC/update",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await api.post(
        ADMINENDPOINTS.CMS_TC_UPDATE,
        formData
      );

      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update TC CMS"
      );
    }
  }
);
export const getCmsTCPage = createAsyncThunk(
  "cmsTC/get",
  async (cp_page_id: number, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `${ADMINENDPOINTS.CMS_TC_GET}?cp_page_id=${cp_page_id}`
      );

      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch TC CMS"
      );
    }
  }
);
const cmsTCPageSlice = createSlice({
  name: "cmsTCPage",
  initialState,
  reducers: {
    resetCmsTCState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ===== UPDATE ===== */
      .addCase(updateCmsTCPage.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(updateCmsTCPage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message =
          action.payload?.message || "TC CMS updated successfully";
      })

      .addCase(updateCmsTCPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /* ===== GET ===== */
      .addCase(getCmsTCPage.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })

      .addCase(getCmsTCPage.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.data = action.payload?.data || null;
      })

      .addCase(getCmsTCPage.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.payload as string;
      });
  },
});
export const { resetCmsTCState } = cmsTCPageSlice.actions;

export default cmsTCPageSlice.reducer;