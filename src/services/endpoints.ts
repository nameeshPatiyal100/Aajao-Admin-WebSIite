export const ADMINENDPOINTS = {
  // ADMIN
  ADMIN_LOGIN: "/admin/login",
  GET_ADMIN_DASHBOARD_DATA: "/admin/dashboard",
  // USER
  USER_LIST: "/admin/user/search",
  USER_BY_ID: "/admin/user/single",
  USER_ADD_UPDATE: "/admin/user/create",
  USER_IMAGE_DELETE: "/admin/user/delete/image",
  DELETE_USER: "/admin/user/delete",
  HOST_LIST: "/admin/host/search",
  HOST_STATUS_UPDATE: "/admin/user/update/status",
  HOST_SEARCH_ASSIGN_PROPERTY: "/admin/host/search/assign-property",
  
  // PROPERTY-CATEGORY
  PROPERTY_CATEGORIES: "admin/categories",
  PROPERTY_CATEGORY_BY_ID: "admin/category",
  PROPERTY_CATEGORY_ADD_UPDATE: "/admin/category/create",
  PROPERTY_CATEGORY_STATUS: "/admin/category/update-status",
  PROPERTY_CATEGORY_DELETE: "/admin/categories/delete",
  CATEGORY_DROPDOWN: "/admin/category/list/dropdowns",
  PROPERTY_TAGS: "admin/tag/search",
  PROPERTY_TAG_BY_ID: "admin/tag/single",
  PROPERTY_TAG_ADD_UPDATE: "/admin/tag/create",
  PROPERTY_TAG_STATUS: "/admin/tag/update-status",
  PROPERTY_TAG_DELETE: "/admin/tag/delete",
  PROPERTY_TAG_DROPDOWN: "/admin/tag/listing/dropdowns",
  PROPERTY_AMENITIES: "admin/amenity/search",
  PROPERTY_AMENITY_BY_ID: "admin/amenity",
  PROPERTY_AMENITY_ADD_UPDATE: "/admin/amenity/create",
  PROPERTY_AMENITY_STATUS: "/admin/amenity/update-status",
  PROPERTY_AMENITY_DELETE: "/admin/amenity/delete",
  AMENITIES_DROPDOWN: "/admin/amenity/list/dropdowns",
  PROPERTIES_LIST: "admin/properties/search",
  PROPERTY_BY_ID: "/admin/property",
  PROPERTY_ADD_UPDATE: "/admin/property/create",
  PROPERTY_STATUS: "/admin/properties/update-status",
  PROPERTY_DELETE: "/admin/property/delete",
  DELETE_PROPERTY_IMAGE: "/admin/properties/delete/image",

  //BOOKINGS
  BOOKING_LIST: "/admin/booking/search",
  BOOKING_DETAIL: "/admin/booking/detail",
  BOOKING_STATUS_LIST:"/admin/booking/status/list",
  UPDATE_BOOKING_STATUS:"/admin/booking/update",
  
  //STATUS LISTING
  BOOKING_STATUS_LIST_FOR_ADMIN:"/admin/booking/status/listing/admin-page",
  UPDATE_BOOKING_STATUS_FROM_STATUS_LISTING_FOR_ADMIN_PAGE:"/admin/booking/status/update",

};
