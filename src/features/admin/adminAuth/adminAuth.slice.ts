import { createSlice } from "@reduxjs/toolkit";
import { adminLogin } from "./adminAuth.thunk";

interface AdminAuthState {
  loading: boolean;
  admin: any | null;
  token: string | null;
  isAuthenticated: boolean;   // ✅ ADD THIS
}

const initialState: AdminAuthState = {
  loading: false,
  admin: null,
  token: localStorage.getItem("adminToken"),
  isAuthenticated: !!localStorage.getItem("adminToken"), // ✅
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    logout(state) {
      state.admin = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("adminToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.admin;
        state.token = action.payload.token;
        state.isAuthenticated = true; // ✅
        localStorage.setItem("adminToken", action.payload.token);
      })
      .addCase(adminLogin.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
