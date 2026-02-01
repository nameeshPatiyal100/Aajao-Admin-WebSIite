import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../features/ui/ui.slice";
import adminAuthReducer from "../features/admin/adminAuth/adminAuth.slice";
import propertyCategoryReducer from "../features/admin/propertyCategory/propertyCategory.slice";
import userReducer from "../features/admin/userManagement/user.slice";
import userDetailsReducer from "../features/admin/userManagement/userDetails.slice";
import userAddUpdateReducer from "../features/admin/userManagement/userAddUpdate.slice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    // ADMINREDUCERS
    adminAuth: adminAuthReducer,
    propertyCategory: propertyCategoryReducer,
    users: userReducer,
    userDetails: userDetailsReducer,
    userAddUpdate: userAddUpdateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
