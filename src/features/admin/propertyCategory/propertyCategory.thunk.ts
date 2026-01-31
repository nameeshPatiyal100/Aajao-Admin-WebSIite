import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";

import { setMessage, setError } from "../../ui/ui.slice.ts";

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

export const fetchPropertyCategories = createAsyncThunk<
  PropertyCategory[],
  void,
  { rejectValue: string; state: any; dispatch: any }
>(
  "propertyCategory/fetchAll",
  async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const response = await api.post<ApiResponse>(ADMINENDPOINTS.PROPERTY_CATEGORIES); 
      const resData = response.data;

      // show snackbar on success
      if (resData.success) {
        dispatch(setMessage({ message: resData.message, severity: "success" }));
      }

      return resData.data.data; // return the actual category array
    } catch (error: any) {
      const errMsg = error.response?.data?.message || "Failed to fetch categories";
      dispatch(setError(errMsg));
      return thunkAPI.rejectWithValue(errMsg);
    }
  }
);

