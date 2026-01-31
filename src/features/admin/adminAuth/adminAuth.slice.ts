import { createSlice } from "@reduxjs/toolkit";
import { adminLogin } from "./adminAuth.thunk";

interface AdminAuthState {
  loading: boolean;
  admin: any | null;
  token: string | null;
  isAuthenticated: boolean;

  // 🔔 Snackbar state
  snackbarOpen: boolean;
  snackbarMessage: string;
  snackbarSeverity: "success" | "error" | "warning" | "info";
}

const initialState: AdminAuthState = {
  loading: false,
  admin: null,
  token: localStorage.getItem("adminToken"),
  isAuthenticated: !!localStorage.getItem("adminToken"),

  snackbarOpen: false,
  snackbarMessage: "",
  snackbarSeverity: "info",
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

    // 🔔 Close snackbar
    closeSnackbar(state) {
      state.snackbarOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
      })

      .addCase(adminLogin.fulfilled, (state, action) => {
        console.log(action, "action");
        state.loading = false;
        state.admin = action.payload.admin;
        console.log(action.payload.admin.token, "action.payload.admin.token");
        state.token = action.payload.admin.token;
        state.isAuthenticated = true; 
        localStorage.setItem("adminToken", action.payload.admin.token);

        // ✅ SHOW SUCCESS SNACKBAR
        state.snackbarOpen = true;
        state.snackbarMessage = action.payload.message || "Login successful";
        state.snackbarSeverity = "success";
      })

      .addCase(adminLogin.rejected, (state, action: any) => {
        state.loading = false;
        state.isAuthenticated = false;

        // ❌ SHOW ERROR SNACKBAR
        state.snackbarOpen = true;
        state.snackbarMessage = action.payload || "Invalid email or password";
        state.snackbarSeverity = "error";
      });
  },
});

export const { logout, closeSnackbar } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
