import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ADMINENDPOINTS } from "../../services/endpoints";

interface AdminLoginPayload {
  email: string;
  password: string;
}

export const adminLogin = createAsyncThunk(
  "adminAuth/login",
  async (data: AdminLoginPayload, thunkAPI) => {
    try {
      const response = await api.post(ADMINENDPOINTS.ADMIN_LOGIN, data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);
