import * as Yup from "yup";

export const setupCategorySchema = Yup.object({
  cat_title: Yup.string().required("Title is required"),
  cat_isActive: Yup.string().required("Status is required"),
});

export const setupAmenitySchema = Yup.object({
  amn_title: Yup.string().required("Full name is required"),
  amn_isActive: Yup.string().required("Status is required"),
});

export const setupTagSchema = Yup.object({
  tag_name: Yup.string().required("Full name is required"),
  tag_isActive: Yup.string().required("Status is required"),
});

export const reviewSchema = Yup.object({
  status: Yup.string().required("Status is required"),
});

// import * as Yup from "yup";

export const setupPropertySchema = Yup.object({
  /* ---------- BASIC INFO ---------- */
  name: Yup.string().required("Property name is required"),

  hostId: Yup.number()
    .typeError("Host is required") // catches NaN
    .required("Host is required")
    .nullable(), // allows null for unselected state

  description: Yup.string().required("Description is required"),

  /* ---------- LOCATION ---------- */
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
  zip_code: Yup.string().required("Zip Code is required"),

  latitude: Yup.string().required("Latitude is required"),
  longitude: Yup.string().required("Longitude is required"),

  /* ---------- CONTACT ---------- */
  email: Yup.string().email("Invalid email").required("Email is required"),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter valid 10-digit number")
    .required("Phone is required"),

  /* ---------- PRICING ---------- */
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required"),

  minimum_price: Yup.number()
    .typeError("Minimum price must be a number")
    .required("Minimum Price is required"),

  weekly_minimum_price: Yup.number()
    .typeError("Weekly minimum price must be a number")
    .required("Weekly Minimum Price is required"),

  weekly_maximum_price: Yup.number()
    .typeError("Weekly maximum price must be a number")
    .required("Weekly Maximum Price is required"),

  monthly_security: Yup.number()
    .typeError("Monthly security must be a number")
    .required("Monthly Security is required"),

  /* ---------- TIME ---------- */
  check_in_time: Yup.string().required("Check in time is required"),
  check_out_time: Yup.string().required("Check out time is required"),

  /* ---------- STATUS FLAGS ---------- */
  status: Yup.string().required("Active status is required"),
  is_verified: Yup.string().required("Verify status is required"),
  is_luxury: Yup.string().required("Luxury status is required"),
  is_pet_friendly: Yup.string().required("Pet Friendly option is required"),
  is_smoking_free: Yup.string().required("Smoking Free option is required"),

  /* ---------- RELATIONS ---------- */
  amenities: Yup.array()
    .of(Yup.string())
    .min(1, "Select at least one amenity")
    .required("Amenity is required"),

  categories: Yup.array()
    .of(Yup.string())
    .min(1, "Select at least one category")
    .required("Category is required"),

  tags: Yup.array()
    .of(Yup.string())
    .min(1, "Select at least one tag")
    .required("Tag is required"),
});

export const validationSchemaAddUserHostModal = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter valid 10-digit number")
    .required("Phone is required"),
  documentType: Yup.string().required("Document type is required"),
  documentNumber: Yup.string().required("Document number is required"),
  dob: Yup.date().nullable().required("Date of Birth is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  zipcode: Yup.string().required("Zipcode is required"),
  status: Yup.string().required("Status is required"),
  verified: Yup.string().required("Verification status is required"),
});

export const statusListingSchema = Yup.object({
  id: Yup.number().required("ID is required"),
  name: Yup.string().required("Name is required"),
  text_color: Yup.string()
    .matches(/^#([0-9A-F]{3}){1,2}$/i, "Must be a valid hex color")
    .required("Text color is required"),
  bg_color: Yup.string()
    .matches(/^#([0-9A-F]{3}){1,2}$/i, "Must be a valid hex color")
    .required("Background color is required"),
});

export const statusSchema = Yup.object({
  rows: Yup.array().of(statusListingSchema),
});

export const bookingStatusRowSchema = Yup.object({
  bs_id: Yup.number().required("Status ID is required"),
  bs_title: Yup.string().required("Title is required"),
  bs_code: Yup.string().required("Color code is required"),
});

// import * as yup from "yup";

export const couponValidationSchema = Yup.object().shape({
  coupon_title: Yup.string()
    .required("Coupon title is required")
    .min(3, "Coupon title must be at least 3 characters")
    .max(100, "Coupon title cannot exceed 100 characters"),

  coupon_code: Yup.string()
    .required("Coupon code is required")
    .min(3, "Coupon code must be at least 3 characters")
    .max(20, "Coupon code cannot exceed 20 characters")
    .matches(
      /^[A-Z0-9]+$/,
      "Coupon code must contain only uppercase letters and numbers"
    ),

  discount_percentage: Yup.number()
    .typeError("Discount percentage must be a number")
    .required("Discount percentage is required")
    .min(1, "Discount must be at least 1%")
    .max(100, "Discount cannot exceed 100%"),

  status: Yup.number()
    .required("Status is required")
    .oneOf([0, 1], "Invalid status value"),
});

export const homePageSchema = Yup.object().shape({
  featureTitle: Yup.string()
    .required("Feature title is required")
    .min(3, "Minimum 3 characters"),

  featureDesc: Yup.string()
    .required("Feature description is required")
    .min(10, "Minimum 10 characters"),

  labelTitle: Yup.string()
    .required("Label title is required")
    .min(3, "Minimum 3 characters"),

  labelDesc: Yup.string()
    .required("Label description is required")
    .min(10, "Minimum 10 characters"),

  testimonialTitle: Yup.string()
    .required("Testimonial title is required")
    .min(3, "Minimum 3 characters"),

  testimonialDesc: Yup.string()
    .required("Testimonial description is required")
    .min(10, "Minimum 10 characters"),
});

/* ================= Yup Validation ================= */

export const faqPageSchema = Yup.object().shape({
  headerTitle: Yup.string().required("Header title is required"),
  headerDesc: Yup.string().required("Header description is required"),

  contactTitle: Yup.string().required("Contact title is required"),
  contactDesc: Yup.string().required("Contact description is required"),
  contactBtnTitle: Yup.string().required("Contact button title is required"),
  contactBtnUrl: Yup.string().required("Contact button URL is required"),

  labelTitle: Yup.string().required("Label title is required"),
  labelDesc: Yup.string().required("Label description is required"),
  labelBtnTitle: Yup.string().required("Label button title is required"),
  labelBtnUrl: Yup.string().required("Label button URL is required"),
});
/* ================= Yup Validation ================= */

export const tcPageSchema = Yup.object().shape({
  headerTitle: Yup.string().required("Header title is required"),
  headerDesc: Yup.string().required("Header description is required"),
  labelTitle: Yup.string().required("Label title is required"),
  labelDesc: Yup.string().required("Label description is required"),
});

export const faqValidationSchema = Yup.object({
  title: Yup.string().required("Title is required").trim(),
  description: Yup.string().required("Description is required").trim(),
  status: Yup.number()
    .oneOf([0, 1], "Invalid status")
    .required("Status is required"),
});


// import * as yup from "yup";

export const tcValidationSchema = Yup.object({
  title: Yup
    .string()
    .required("Title is required")
    .trim(),

  description: Yup
    .string()
    .required("Description is required")
    .trim(),

  status: Yup
    .number()
    .oneOf([0, 1], "Invalid status")
    .required("Status is required"),
});