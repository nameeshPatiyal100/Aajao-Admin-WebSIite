import * as Yup from "yup";

export const setupCategorySchema = Yup.object({
  name: Yup.string().required("Full name is required"),
  status: Yup.string().required("Status is required"),
});

export const setupAmenitySchema = Yup.object({
  name: Yup.string().required("Full name is required"),
  status: Yup.string().required("Status is required"),
});

export const setupTagSchema = Yup.object({
  name: Yup.string().required("Full name is required"),
  status: Yup.string().required("Status is required"),
});



export const validationSchemaAddUserHostModal = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter valid 10-digit number")
    .required("Phone is required"),
  dob: Yup.date().nullable().required("Date of Birth is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  zipcode: Yup.string().required("Zipcode is required"),
  status: Yup.string().required("Status is required"),
  verified: Yup.string().required("Verification status is required"),
});
