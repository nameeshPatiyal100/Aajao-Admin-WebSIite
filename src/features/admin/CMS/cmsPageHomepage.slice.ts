import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

/* ================= TYPES ================= */

export interface DropdownItem {
  id: number;
  name: string | null;
}

export interface CmsHomePageData {
  featureTitle: string;
  featureDesc: string;

  selectedProperties: DropdownItem[];

  labelTitle: string;
  labelDesc: string;
  image: string;

  buttonTitle: string;
  buttonUrl: string;
  buttonTarget: string;

  testimonialTitle: string;
  testimonialDesc: string;

  selectedTestimonials: DropdownItem[];
}

interface CmsHomePageState {
  data: CmsHomePageData | null;
  loading: boolean;
  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: CmsHomePageState = {
  data: null,
  loading: false,
  error: null,
};
/* ================= THUNK ================= */
export const fetchCmsHomePage = createAsyncThunk(
  "cmsHomePage/fetch",
  async (cp_page_id: number, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `${ADMINENDPOINTS.CMS_HOMEPAGE}?cp_page_id=${cp_page_id}`
      );

      const raw = res.data?.data;

      const formatted = {
        featureTitle: raw.featureTitle,
        featureDesc: raw.featureDesc,

        selectedProperties: raw.selectedProperties || [],

        labelTitle: raw.labelTitle,
        labelDesc: raw.labelDesc,
        image: raw.image,

        buttonTitle: raw.buttonTitle,
        buttonUrl: raw.buttonUrl,
        buttonTarget: raw.buttonTarget,

        testimonialTitle: raw.testimonialTitle,
        testimonialDesc: raw.testimonialDesc,

        selectedTestimonials:
          raw.selectedTestimonials?.map((item: any) => ({
            id: item.id,
            name: item.name || "Untitled",
          })) || [],
      };

      return formatted;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch CMS homepage"
      );
    }
  }
);

/* ================= SLICE ================= */

const cmsHomePageSlice = createSlice({
  name: "cmsHomePage",
  initialState,
  reducers: {
    resetCmsHomePage(state) {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ---------- PENDING ---------- */
      .addCase(fetchCmsHomePage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      /* ---------- SUCCESS ---------- */
      .addCase(fetchCmsHomePage.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })

      /* ---------- ERROR ---------- */
      .addCase(fetchCmsHomePage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetCmsHomePage } = cmsHomePageSlice.actions;
export default cmsHomePageSlice.reducer;
