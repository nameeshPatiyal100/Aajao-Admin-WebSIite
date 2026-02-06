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
    try {
      const response = await api.post<ApiResponse>(ADMINENDPOINTS.PROPERTY_TAGS, payload); 
      const resData = response.data;
      return {
        tags: resData.data.data,
        totalRecords: resData.data.totalCount,
        page: payload.page,
      };
    } catch (error: any) {
      const errMsg = error.response?.data?.message || "Failed to fetch Tags";
      return  rejectWithValue(errMsg);
    }
  }
);

