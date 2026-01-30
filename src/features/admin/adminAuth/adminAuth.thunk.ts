import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
import { ADMINENDPOINTS } from "../../../services/endpoints";
import { setMessage, showLoader } from "../../ui/ui.slice";

interface LoginPayload {
  username: string;
  password: string;
}

export const adminLogin = createAsyncThunk(
  "adminAuth/login",
  async (payload: LoginPayload, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoader());

      const res = await api.post(ADMINENDPOINTS.ADMIN_LOGIN, payload);
      console.log(res.data, "admin login response");

      dispatch(
        setMessage({
          message: res.data.message,
          severity: "success",
        })
      );

      // return res.data.data;
      return {
        admin: res.data.data.admin,
        token: res.data.data.token,
        message: res.data.message,
      };
      
    } catch (err: any) {
      const message = err.response?.data?.message || "Login failed";

      dispatch(
        setMessage({
          message,
          severity: "error",
        })
      );

      return rejectWithValue(message);
    } 
    // finally {
    //   dispatch(hideLoader());
    // }
  }
);
