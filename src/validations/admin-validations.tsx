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
