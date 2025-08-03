// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import adminAuthReducer from '../services/adminSlice'; // Import your slice
import authReducer from "../redux/authSllice";

export const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer, // Add your slice reducer here
    auth:authReducer
  },
});

// Types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
