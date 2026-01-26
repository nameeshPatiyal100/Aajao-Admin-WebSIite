// src/features/ui/ui.slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  loading: boolean;
  error: string | null;
  message: string | null;
  severity: "success" | "error" | "info" | "warning";
}

const initialState: UIState = {
  loading: false,
  error: null,
  message: null,
  severity: "info",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showLoader(state) {
      state.loading = true;
    },
    hideLoader(state) {
      state.loading = false;
    },
    setMessage(
      state,
      action: PayloadAction<{ message: string; severity?: UIState["severity"] }>
    ) {
      state.message = action.payload.message;
      state.severity = action.payload.severity || "info";
    },
    clearMessage(state) {
      state.message = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.severity = "error";
      state.message = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { showLoader, hideLoader, setMessage, clearMessage, setError, clearError } =
  uiSlice.actions;

export default uiSlice.reducer;
