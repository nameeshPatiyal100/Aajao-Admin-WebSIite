import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../features/ui/ui.slice";
import adminAuthReducer from "../features/admin/adminAuth/adminAuth.slice";
import propertyCategoryReducer from "../features/admin/propertyCategory/propertyCategory.slice";
import userReducer from "../features/admin/userManagement/user.slice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    // ADMINREDUCERS
    adminAuth: adminAuthReducer,
    propertyCategory: propertyCategoryReducer,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
