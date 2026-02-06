import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

export interface PropertyCategory {
  cat_id: number;
  cat_title: string;
  cat_slug?: string | null;
  cat_isActive: string;
  cat_isDelete: string;
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
    data: PropertyCategory[];
  };
}

export const fetchPropertyCategories = createAsyncThunk(
  "propertyCategory/fetchAll",
  async (payload: { page: number; search: string; limit:number; status: string; }, { rejectWithValue }) => {
    try {
      const response = await api.post<ApiResponse>(ADMINENDPOINTS.PROPERTY_CATEGORIES, payload); 
      const resData = response.data;
      return {
        categories: resData.data.data,
        totalRecords: resData.data.totalCount,
        page: payload.page,
      };
    } catch (error: any) {
      const errMsg = error.response?.data?.message || "Failed to fetch categories";
      return  rejectWithValue(errMsg);
    }
  }
);

