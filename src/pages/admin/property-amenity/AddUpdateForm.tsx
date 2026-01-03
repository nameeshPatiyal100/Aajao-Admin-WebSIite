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
import { setupAmenitySchema } from "../../../validations/admin-validations";
import type { FormValues, AddUpdateFormProps } from './types';
import { themeCss } from "../../../theme/themeCss";

export default function AddUpdateForm({
  formData,
  formshow,
  handleFormClose,
  handleAddOrUpdateAmenity,
}: AddUpdateFormProps) {
  const formik = useFormik<FormValues>({
    initialValues: {
      id: formData?.id || "",
      name: formData?.name || "",
      status: formData?.status || "1",
    },
    validationSchema: setupAmenitySchema,
    onSubmit: (values) => {
      handleAddOrUpdateAmenity(values);
      handleFormClose();
    },
  });

  return (
    <Modal open={formshow} onClose={handleFormClose}>
      <Box sx={themeCss.modalFormContainer}>
        <Box sx={themeCss.modalHeader}>
          <Typography
            variant="h6"
            sx={{
              color: "#fff",
              fontWeight: 600,
            }}
          >
            {formData ? "Update Amenity" : "Add Amenity"}
          </Typography>

          <IconButton onClick={handleFormClose} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ p: 3 }}>
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
                      color: PurpleThemeColor,
                    },
                    transition: "color 0.3s ease",
                  }}
                >Name</InputLabel>

                <OutlinedInput
                  id="name"
                  name="name"
                  label="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && !!formik.errors.name}
                  sx={{
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: PurpleThemeColor,
                    },
                    transition: "all 0.3s ease",
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
                      color: PurpleThemeColor,
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
                      borderColor: PurpleThemeColor,
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

      </Box>
    </Modal>
  );
}
