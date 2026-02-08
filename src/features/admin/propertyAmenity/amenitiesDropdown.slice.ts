import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

export interface Amenity {
  amn_id: number;
  amn_title: string;
}

interface AmenitiesApiResponse {
  success: boolean;
  message: string;
  data: Amenity[];
}

interface AmenitiesState {
  amenitiesList: Amenity[];
  loading: boolean;
  error: string | null;
}

const initialState: AmenitiesState = {
  amenitiesList: [],
  loading: false,
  error: null,
};

export const fetchAmenetiesDropdown = createAsyncThunk<
  Amenity[],
  void,
  { rejectValue: string }
>(
  "amenities/fetchDropdown",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<AmenitiesApiResponse>(
        ADMINENDPOINTS.AMENITIES_DROPDOWN // 👈 your endpoint
      );

      return response.data.data;
    } catch (error: any) {
      const errMsg =
        error.response?.data?.message || "Failed to fetch amenities";
      return rejectWithValue(errMsg);
    }
  }
);

const amenitiesSlice = createSlice({
  name: "amenities",
  initialState,
  reducers: {
    clearAmenities: (state) => {
      state.amenitiesList = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAmenetiesDropdown.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAmenetiesDropdown.fulfilled, (state, action) => {
        state.loading = false;
        state.amenitiesList = action.payload;
      })
      .addCase(fetchAmenetiesDropdown.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearAmenities } = amenitiesSlice.actions;
export default amenitiesSlice.reducer;
