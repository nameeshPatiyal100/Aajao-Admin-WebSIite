import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

export interface Property {
  property_id: number;
  property_name: string;
  is_active: string;
  categories: string[];
  ["HostDetails.user_fullName"]: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    page: number;
    limit: number;
    offset: number;
    totalRecords: number;
    totalPages: number;
    search: string;
    properties: Property[];
  };
}

export const fetchProperties = createAsyncThunk(
  "property/fetchAll",
  async (payload: { page: number; search: string; limit:number; status: string; }, { rejectWithValue }) => {
    try {
      const response = await api.post<ApiResponse>(ADMINENDPOINTS.PROPERTIES_LIST, payload); 
      const resData = response.data;
      return {
        properties: resData.data.properties,
        totalRecords: resData.data.totalRecords,
        page: payload.page,
      };
    } catch (error: any) {
      const errMsg = error.response?.data?.message || "Failed to fetch Properties";
      return  rejectWithValue(errMsg);
    }
  }
);

