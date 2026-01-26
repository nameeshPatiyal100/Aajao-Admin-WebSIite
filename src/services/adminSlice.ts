import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../styles/utils/axiosInstance";
import { API_BASE_URL, adminLoginApi } from "../configs/apis";
import type { AlertColor } from "@mui/material";

interface AdminState {
  token: string | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  snackbarSeverity: AlertColor | null;
  snackbarOpen: boolean;
}

const initialState: AdminState = {
  token: null,
  loading: false,
  error: null,
  message: null,
  snackbarSeverity: null,
  snackbarOpen: false,
};

// Async thunk for login
export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (
    { username, password }: { username: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}${adminLoginApi}`,
        {
          username,
          password,
        }
      );
      console.log(response.data.success, "response");
      return {
        token: response.data.data.admin.token,
        message: response.data.message,
        severity: response.data.success ? "success" : ("error" as AlertColor),
      };
      //   return response?.data?.data;
    } catch (error:any ) {
      console.log(error, "errorerrorerrorerror");
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || "Login failed",
        severity: "error",
      });
    }
  }
);

const adminSlice = createSlice({
  name: "AdminAuth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
    },
    closeSnackbar: (state) => {
      state.snackbarOpen = false;
      state.message = null;
      state.snackbarSeverity = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        console.log(action, "actionfulfilled");
        state.loading = false;
        state.token = action.payload.token;
        state.message = action.payload.message;
        state.snackbarSeverity = action.payload.severity;
        state.snackbarOpen = true;
      })
      //   .addCase(loginAdmin.fulfilled, (state, action) => {
      //     console.log(action, "action");
      //     state.loading = false;
      //     // state.token = action.payload.token;
      //     state.message = action.payload.message;
      //     // state.snackbarSeverity = action.payload.severity;
      //     // state.loading = false;
      //     // state.token = action.payload.admin.token;
      //   })
      .addCase(loginAdmin.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
        state.message = action.payload?.message;
        state.snackbarSeverity = action.payload?.severity || "error";
        state.snackbarOpen = true;
      });
  },
});

export const { logout, closeSnackbar  } = adminSlice.actions;
export default adminSlice.reducer;
