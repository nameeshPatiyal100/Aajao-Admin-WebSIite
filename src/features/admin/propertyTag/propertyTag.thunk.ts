import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

export interface PropertyTag {
  tag_id: number;
  tag_name: string;
  tag_slug?: string | null;
  tag_isActive: string;
  tag_isDelete: string;
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
    data: PropertyTag[];
  };
}

export const fetchPropertyTags = createAsyncThunk(
  "propertyTag/fetchAll",
  async (payload: { page: number; search: string; limit:number; status: string; }, { rejectWithValue }) => {
    // const { dispatch } = thunkAPI;
    try {
      const response = await api.post<ApiResponse>(ADMINENDPOINTS.PROPERTY_TAGS, payload); 
      const resData = response.data;

      // show snackbar on success
      // if (resData.success) {
      //   dispatch(setMessage({ message: resData.message, severity: "success" }));
      // }

      return resData.data.data; // return the actual Tag array
    } catch (error: any) {
      const errMsg = error.response?.data?.message || "Failed to fetch Tags";
      // dispatch(setError(errMsg));
      return  rejectWithValue(errMsg);
    }
  }
);

