import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

export interface DropdownItem {
  id: number;
  name: string;
}

interface CmsDropdownState {
  properties: DropdownItem[];
  testimonials: DropdownItem[];

  propertyLoading: boolean;
  testimonialLoading: boolean;

  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: CmsDropdownState = {
  properties: [],
  testimonials: [],

  propertyLoading: false,
  testimonialLoading: false,

  error: null,
};

/* ================= THUNKS ================= */

// ✅ Fetch Properties
export const fetchProperties = createAsyncThunk(
  "cms/fetchProperties",
  async (search: string, { rejectWithValue }) => {
    try {
      const res = await api.get(ADMINENDPOINTS.PROPERTIES_DROP_DOWN, {
        params: { search },
      });

      // 🔥 Normalize response
      const formatted = res.data?.data?.map((item: any) => ({
        id: item.property_id,
        name: item.property_name,
      }));

      return formatted || [];
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch properties"
      );
    }
  }
);

// ✅ Fetch Testimonials
export const fetchTestimonials = createAsyncThunk(
  "cms/fetchTestimonials",
  async (search: string, { rejectWithValue }) => {
    try {
      const res = await api.get(ADMINENDPOINTS.TESTIMONIALS_DROP_DOWN, {
        params: { search },
      });

      // 🔥 Normalize response
      const formatted = res.data?.data?.map((item: any) => ({
        id: item.br_id,
        name: item.br_title || "Untitled", // handle null
      }));

      return formatted || [];
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch testimonials"
      );
    }
  }
);

/* ================= SLICE ================= */

const cmsSlice = createSlice({
  name: "cmsDropdown",
  initialState,
  reducers: {
    resetCmsDropdown(state) {
      state.properties = [];
      state.testimonials = [];
      state.propertyLoading = false;
      state.testimonialLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ---------- PROPERTIES ---------- */
      .addCase(fetchProperties.pending, (state) => {
        state.propertyLoading = true;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.propertyLoading = false;
        state.properties = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.propertyLoading = false;
        state.error = action.payload as string;
      })

      /* ---------- TESTIMONIALS ---------- */
      .addCase(fetchTestimonials.pending, (state) => {
        state.testimonialLoading = true;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.testimonialLoading = false;
        state.testimonials = action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.testimonialLoading = false;
        state.error = action.payload as string;
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetCmsDropdown } = cmsSlice.actions;
export default cmsSlice.reducer;