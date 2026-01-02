import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  MenuItem,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Full name is required"),
  status: Yup.string().required("Status is required"),
});

interface FormValues {
  id: string;
  name: string;
  status: string;
}

interface AddUpdateFormProps {
  formData: FormValues | null;
  formshow: boolean;
  handleFormClose: () => void;
  handleAddOrUpdateCategory: (values: FormValues) => void;
}

export default function AddUpdateForm(props: AddUpdateFormProps) {
  const {
    formData,
    formshow,
    handleFormClose,
    handleAddOrUpdateCategory
  } = props;

  const formik = useFormik<FormValues>({
    initialValues: {
      id: formData ? formData.id : "",
      name: formData ? formData.name : "",
      status: formData ? formData.status : "1",
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
          width: { xs: "90%", md: "80%" },
          maxWidth: 900,
          maxHeight: "90vh",
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
          overflowY: "auto",
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
            color: "#881f9b",
          }}
        >
          Add / Update Category
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 3,
              mb: 3,
            }}
          >
            <FormControl sx={{ mb: 2 }}>
              <FormLabel
                sx={{
                  mb: 1,
                  fontWeight: "medium",
                }}
              >
                Name
              </FormLabel>
              <Input
                name={"name"}
                type={"text"}
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && !!formik.errors.name}
                sx={{ width: "100%" }}
              />
              {formik.touched.name && formik.errors.name && (
                <FormHelperText error>{formik.errors.name}</FormHelperText>
              )}
            </FormControl>

            {/* Dropdown Fields */}
            <FormControl sx={{ mb: 2 }}>
              <FormLabel
                sx={{
                  mb: 1,
                  fontWeight: "medium",
                }}
              >
                Status
              </FormLabel>
              <Select
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.status && !!formik.errors.status}
              >
                <MenuItem value="">Select Status</MenuItem>
                <MenuItem value="1">Active</MenuItem>
                <MenuItem value="0">Inactive</MenuItem>
              </Select>
              {formik.touched.status && formik.errors.status && (
                <FormHelperText error>{formik.errors.status}</FormHelperText>
              )}
            </FormControl>
          </Box>

          {/* Form Actions */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <Button
              variant="outlined"
              onClick={handleFormClose}
              sx={{
                color: "#cf1f1f",
                borderColor: "#cf1f1f",
                "&:hover": {
                  borderColor: "#cf1f1f",
                  backgroundColor: "#c4a3a3",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: "#881f9b" }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
