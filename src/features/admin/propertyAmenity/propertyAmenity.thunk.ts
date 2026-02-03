import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

export interface PropertyAmenity {
  amn_id: number;
  amn_title: string;
  amn_slug?: string | null;
  amn_isActive: string;
  amn_isDelete: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    page: number;
    limit: number;
    offset: number;
    totalCount: number;
    totalPages: number;
    search: string;
    data: PropertyAmenity[];
  };
}

export const fetchPropertyAmenities = createAsyncThunk(
  "propertyAmenity/fetchAll",
  async (payload: { page: number; search: string; limit:number; status: string; }, { rejectWithValue }) => {
    // const { dispatch } = thunkAPI;
    try {
      const response = await api.post<ApiResponse>(ADMINENDPOINTS.PROPERTY_AMENITIES, payload); 
      const resData = response.data;

      // show snackbar on success
      // if (resData.success) {
      //   dispatch(setMessage({ message: resData.message, severity: "success" }));
      // }

      return resData.data.data; // return the actual amenities array
    } catch (error: any) {
      const errMsg = error.response?.data?.message || "Failed to fetch amenities";
      // dispatch(setError(errMsg));
      return  rejectWithValue(errMsg);
    }
  }
);

