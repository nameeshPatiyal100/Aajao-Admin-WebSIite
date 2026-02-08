import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";
import { FormValues } from "../../../pages/admin/properties/types";

interface PropertyState {
  data: FormValues | null;
  loading: boolean;
  error: string | null;
}

const initialState: PropertyState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchPropertyById = createAsyncThunk<
  FormValues,
  number,
  { rejectValue: string }
>("property/fetchById", async (propertyId, { rejectWithValue }) => {
  try {
    const res = await api.post(ADMINENDPOINTS.PROPERTY_BY_ID, { propertyId });

    const p = res.data.data;

    return {
      id: String(p.property_id),
      name: p.property_name || "",

      hostId: p.property_host_id || "",
      hostName: p["HostDetails.user_fullName"] || "",

      description: p.property_desc || "",
      address: p.property_address || "",
      city: p.property_city || "",
      zip_code: p.property_zip || "",
      country: p.property_contry || "",
      state: p.property_state || "",
      phone: p.property_contact || "",
      email: p.property_email || "",

      latitude: p.property_latitude || "",
      longitude: p.property_longitude || "",

      price: Number(p.property_price) || 0,
      minimum_price: Number(p.property_mini_price) || 0,

      weekly_minimum_price: p["propDetails.propDetail_weeklyMini_price"] || 0,
      weekly_maximum_price: p["propDetails.propDetail_weeklyMax_price"] || 0,
      monthly_security: p["propDetails.propDetail_monthly_security"] || 0,

      check_in_time: p["propDetails.propDetail_inTime"] || "",
      check_out_time: p["propDetails.propDetail_outTime"] || "",

      status: p.is_active ? "1" : "0",
      is_verified: String(p.is_verify) as "0" | "1" | "2",
      is_luxury: p.is_luxury ? "1" : "0",
      is_pet_friendly: p["propDetails.propDetail_isPetFriendly"] ? "1" : "0",
      is_smoking_free: p["propDetails.propDetail_isSmoke"] ? "1" : "0",

      categories: p.categories?.map((c: any) => c.pt_cat_cat_id) || [],
      tags: p.tags?.map((t: any) => t.pt_tag_tag_id) || [],
      // amenities: p.amenities?.map((a: any) => a.amn_id) || [],
      amenities: p.amenities?.map((a: any) => a.pa_amn_id) || [],

      description_extra: p["propDetails.propDetail_extra"] || "",

      description_points:
        p["propDetails.propDetail_extra"]
          ?.split("|")
          .map((x: string) => x.trim()) || [],
      cover_image: p.coverImage
        ? {
            afile_id: p.coverImage.afile_id,
            url: p.coverImage.url,
          }
        : null,

      images: p.images?.map((img: any) => img.url) || [],

      documents:
        p.documents?.map((doc: any) => ({
          afile_id: doc.afile_id,
          url: doc.url,
        })) || [],
    };
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Failed to fetch property"
    );
  }
});

const propertySlice = createSlice({
  name: "propertyById",
  initialState,
  reducers: {
    clearProperty: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertyById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch property";
      });
  },
});

export const { clearProperty } = propertySlice.actions;
export default propertySlice.reducer;
