import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

export interface Property {
  property_id: number;
  property_name: string;
  property_slug?: string | null;
  property_isActive: string;
  property_isDelete: string;
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
    data: Property[];
  };
}

export const fetchProperties = createAsyncThunk(
  "property/fetchAll",
  async (payload: { page: number; search: string; limit:number; status: string; }, { rejectWithValue }) => {
    // const { dispatch } = thunkAPI;
    try {
      const response = await api.post<ApiResponse>(ADMINENDPOINTS.PROPERTIES_LIST, payload); 
      const resData = response.data;

      // show snackbar on success
      // if (resData.success) {
      //   dispatch(setMessage({ message: resData.message, severity: "success" }));
      // }

      return resData.data.data; // return the actual Properties array
    } catch (error: any) {
      const errMsg = error.response?.data?.message || "Failed to fetch Properties";
      // dispatch(setError(errMsg));
      return  rejectWithValue(errMsg);
    }
  }
);

