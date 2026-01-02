import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  OutlinedInput,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { PurpleThemeColor } from "../../../theme/themeColor";
// import * as Yup from "yup";
import { addUpdateFormValidationSchema } from "../../../validations/property-category";

// const PurpleThemeColor = "#881f9b";

const validationSchema = addUpdateFormValidationSchema;

interface FormValues {
  id: string;
  name: string;
  status: "0" | "1";
}

interface AddUpdateFormProps {
  formData: FormValues | null;
  formshow: boolean;
  handleFormClose: () => void;
  handleAddOrUpdateCategory: (values: FormValues) => void;
}

export default function AddUpdateForm({
  formData,
  formshow,
  handleFormClose,
  handleAddOrUpdateCategory,
}: AddUpdateFormProps) {
  const formik = useFormik<FormValues>({
    initialValues: {
      id: formData?.id || "",
      name: formData?.name || "",
      status: formData?.status || "1",
    },
    validationSchema,
    onSubmit: (values) => {
      handleAddOrUpdateCategory(values);
      handleFormClose();
    },
  });

  return (
    <Modal open={formshow} onClose={handleFormClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 500, md: 600 },
          bgcolor: "background.paper",
          borderRadius: 4,
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          p: 5,
          overflowY: "auto",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <IconButton
          onClick={handleFormClose}
          sx={{ position: "absolute", right: 16, top: 16 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          variant="h5"
          sx={{
            mb: 4,
            textAlign: "center",
            fontWeight: "bold",
            color: PurpleThemeColor,
          }}
        >
          {formData ? "Update Category" : "Add Category"}
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Box display="flex" flexDirection="column" gap={3}>
            {/* Name Field */}
            <FormControl fullWidth>
              <InputLabel
                htmlFor="name"
                sx={{
                  color:
                    formik.touched.name && formik.errors.name
                      ? "error.main"
                      : undefined,
                  "&.Mui-focused": {
                    color: PurpleThemeColor, // <-- label turns purple when focused
                  },
                  transition: "color 0.3s ease", // smooth animation
                }}
              >
                Name
              </InputLabel>

              <OutlinedInput
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && !!formik.errors.name}
                sx={{
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: PurpleThemeColor, // border turns purple on focus
                  },
                  transition: "all 0.3s ease", // smooth animation
                }}
              />

              {formik.touched.name && formik.errors.name && (
                <FormHelperText error>{formik.errors.name}</FormHelperText>
              )}
            </FormControl>

            {/* Status Field */}
            <FormControl fullWidth>
              <InputLabel
                id="status-label"
                sx={{
                  color:
                    formik.touched.status && formik.errors.status
                      ? "error.main"
                      : undefined,
                  "&.Mui-focused": {
                    color: PurpleThemeColor, // <-- label turns purple when focused
                  },
                  transition: "color 0.3s ease",
                }}
              >
                Status
              </InputLabel>

              <Select
                labelId="status-label"
                id="status"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                input={<OutlinedInput label="Status" />}
                sx={{
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: PurpleThemeColor, // border turns purple when focused
                  },
                  transition: "all 0.3s ease",
                }}
                error={formik.touched.status && !!formik.errors.status}
              >
                <MenuItem value="">Select Status</MenuItem>
                <MenuItem value="1">Active</MenuItem>
                <MenuItem value="0">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Actions */}
          <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
            <Button
              variant="outlined"
              onClick={handleFormClose}
              sx={{
                color: "#cf1f1f",
                borderColor: "#cf1f1f",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#fcecec",
                  borderColor: "#cf1f1f",
                  transform: "scale(1.05)",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: PurpleThemeColor,
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "#6f137f",
                  transform: "scale(1.05)",
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
