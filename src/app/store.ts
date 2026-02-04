import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../features/ui/ui.slice";
import adminAuthReducer from "../features/admin/adminAuth/adminAuth.slice";
import propertyCategoryReducer from "../features/admin/propertyCategory/propertyCategory.slice";
import propertyCategoryDetailsReducer from "../features/admin/propertyCategory/propertyCategoryDetails.slice";
import propertyCategoryAddUpdateReducer from "../features/admin/propertyCategory/propertyCategoryAddUpdate.slice";
import propertyCategoryStatusReducer from "../features/admin/propertyCategory/propertyCategoryStatus.slice";
import propertyCategoryDeleteReducer from "../features/admin/propertyCategory/propertyCategoryDelete.slice";
import propertyTagReducer from "../features/admin/propertyTag/propertyTag.slice";
import propertyTagDetailsReducer from "../features/admin/propertyTag/propertyTagDetails.slice";
import propertyTagAddUpdateReducer from "../features/admin/propertyTag/propertyTagAddUpdate.slice";
import propertyTagStatusReducer from "../features/admin/propertyTag/propertyTagStatus.slice";
import propertyTagDeleteReducer from "../features/admin/propertyTag/propertyTagDelete.slice";
import propertyAmenityReducer from "../features/admin/propertyAmenity/propertyAmenity.slice";
import propertyAmenityDetailsReducer from "../features/admin/propertyAmenity/propertyAmenityDetails.slice";
import propertyAmenityAddUpdateReducer from "../features/admin/propertyAmenity/propertyAmenityAddUpdate.slice";
import propertyAmenityStatusReducer from "../features/admin/propertyAmenity/propertyAmenityStatus.slice";
import propertyAmenityDeleteReducer from "../features/admin/propertyAmenity/propertyAmenityDelete.slice";
import userReducer from "../features/admin/userManagement/user.slice";
import userDetailsReducer from "../features/admin/userManagement/userDetails.slice";
import userDeleteReducer from "../features/admin/userManagement/userDelete.slice";
import userAddUpdateReducer from "../features/admin/userManagement/userAddUpdate.slice";
import userImageDeleteReducer from "../features/admin/userManagement/UserImageDelete.slice";
import hostReducer from "../features/admin/userManagement/host.slice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    // ADMINREDUCERS
    adminAuth: adminAuthReducer,
    users: userReducer,
    hosts: hostReducer,
    userDetails: userDetailsReducer,
    userAddUpdate: userAddUpdateReducer,
    userImageDelete: userImageDeleteReducer,
    userDelete: userDeleteReducer,
    propertyCategory: propertyCategoryReducer,
    propertyCategoryDetails: propertyCategoryDetailsReducer,
    propertyCategoryAddUpdate: propertyCategoryAddUpdateReducer,
    propertyCategoryStatus: propertyCategoryStatusReducer,
    propertyCategoryDelete: propertyCategoryDeleteReducer,
    propertyTag: propertyTagReducer,
    propertyTagDetails: propertyTagDetailsReducer,
    propertyTagAddUpdate: propertyTagAddUpdateReducer,
    propertyTagStatus: propertyTagStatusReducer,
    propertyTagDelete: propertyTagDeleteReducer,
    propertyAmenity: propertyAmenityReducer,
    propertyAmenityDetails: propertyAmenityDetailsReducer,
    propertyAmenityAddUpdate: propertyAmenityAddUpdateReducer,
    propertyAmenityStatus: propertyAmenityStatusReducer,
    propertyAmenityDelete: propertyAmenityDeleteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
