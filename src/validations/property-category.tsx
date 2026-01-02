import * as Yup from "yup";

export const addUpdateFormValidationSchema = Yup.object({
    name: Yup.string().required("Full name is required"),
    status: Yup.string().required("Status is required"),
  });