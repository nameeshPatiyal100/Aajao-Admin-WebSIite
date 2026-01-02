import React, { useRef, useState } from "react";
// import { pink } from "@mui/material/colors";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Avatar,
  Button,
  FormControl,
  FormLabel,
  Input,
  TextareaAutosize,
  Checkbox,
  FormHelperText,
  MenuItem,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useEffect } from "react";

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onAddUser: (user: any) => void;
  mode: "add" | "view" | "edit";
  user: any | null;
}

interface FormValues {
  name: string;
  dob: Dayjs | null;
  email: string;
  address: string;
  phone: string;
  city: string;
  zipcode: string;
  status: string;
  verification: string;
  username: string;
  password: string;
  referralCode: string;
  user: boolean;
  host: boolean;
  image: File | null;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Full name is required"),
  dob: Yup.date().required("Date of Birth is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string().required("Address is required"),
  phone: Yup.string().required("Phone is required"),
  city: Yup.string().required("City is required"),
  zipcode: Yup.string().required("Zipcode is required"),
  status: Yup.string().required("Status is required"),
  verification: Yup.string().required("Verification is required"),
  password: Yup.string().required("Password is required"),
  user: Yup.boolean()
    .oneOf([true], "You must agree to the terms")
    .required("Required"),
});

export const AddUserModal: React.FC<AddUserModalProps> = ({
  open,
  onClose,
  onAddUser,
  mode,
  user,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      dob: null,
      email: "",
      address: "",
      phone: "",
      city: "",
      zipcode: "",
      status: "",
      verification: "",
      username: "",
      password: "",
      referralCode: "",
      user: true,
      host: false,
      image: null,
    },
    validationSchema,
    onSubmit: (values) => {
      if (mode === "view") return;

      onAddUser({
        ...values,
        dob: values.dob ? values.dob.format("YYYY-MM-DD") : null,
      });

      handleCancel();
    },
  });

  const handleCancel = () => {
    onClose();
    formik.resetForm();
    setImagePreview(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      formik.setFieldValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    formik.setFieldValue("image", null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if ((mode === "view" || mode === "edit") && user) {
      formik.setValues({
        name: user.name || "",
        dob: user.dob ? dayjs(user.dob) : null,
        email: user.email || "",
        address: user.address || "",
        phone: user.phone || "",
        city: user.city || "",
        zipcode: user.zipcode || "",
        status: user.status || "",
        verification: user.verification || "",
        username: user.username || "",
        password: "",
        referralCode: user.referralCode || "",
        user: true,
        host: false,
        image: null,
      });
    }

    if (mode === "add") {
      formik.resetForm();
      setImagePreview(null);
    }
  }, [mode, user, open]);
  const isViewMode = mode === "view";

  return (
    <Modal open={open} onClose={handleCancel}>
      <Box sx={modalStyles.container}>
        <IconButton onClick={handleCancel} sx={modalStyles.closeButton}>
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" sx={modalStyles.title}>
          {mode === "add"
            ? "Add New User"
            : mode === "edit"
              ? "Edit User"
              : "User Details"}
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={modalStyles.formGrid}>
              {/* Text Input Fields */}
              {[
                { name: "name", label: "Full Name" },
                { name: "email", label: "Email", type: "email" },
                { name: "phone", label: "Phone" },
                { name: "city", label: "City" },
                { name: "zipcode", label: "Zipcode" },
                { name: "username", label: "Username (optional)" },
                { name: "password", label: "Password", type: "password" },
                { name: "referralCode", label: "Referral Code" },
              ].map((field) => (
                <FormControl key={field.name} sx={modalStyles.formControl}>
                  <FormLabel sx={modalStyles.label}>{field.label}</FormLabel>
                  <Input
                    disabled={isViewMode}
                    name={field.name}
                    type={field.type || "text"}
                    value={(formik.values as any)[field.name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched[field.name as keyof FormValues] &&
                      !!formik.errors[field.name as keyof FormValues]
                    }
                    sx={modalStyles.input}
                  />
                  {formik.touched[field.name as keyof FormValues] &&
                    formik.errors[field.name as keyof FormValues] && (
                      <FormHelperText error>
                        {formik.errors[field.name as keyof FormValues]}
                      </FormHelperText>
                    )}
                </FormControl>
              ))}

              {/* Date of Birth Field */}
              <FormControl sx={modalStyles.formControl}>
                <FormLabel sx={modalStyles.label}>Date of Birth</FormLabel>
                <DatePicker
                  disabled={isViewMode}
                  value={formik.values.dob}
                  onChange={(date) => formik.setFieldValue("dob", date)}
                  slotProps={{
                    textField: {
                      error: formik.touched.dob && !!formik.errors.dob,
                      onBlur: formik.handleBlur,
                    },
                  }}
                  sx={{
                    "& .MuiPickersDay-day": {
                      color: "#881f9b",
                    },
                    "& .MuiPickersDay-daySelected": {
                      backgroundColor: "#881f9b",
                      color: "white",
                    },
                  }}
                />
                {formik.touched.dob && formik.errors.dob && (
                  <FormHelperText error>
                    {formik.errors.dob as string}
                  </FormHelperText>
                )}
              </FormControl>

              {/* Dropdown Fields */}
              <FormControl sx={modalStyles.formControl}>
                <FormLabel sx={modalStyles.label}>Status</FormLabel>
                <Select
                  disabled={isViewMode}
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.status && !!formik.errors.status}
                >
                  <MenuItem value="">Select Status</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
                {formik.touched.status && formik.errors.status && (
                  <FormHelperText error>{formik.errors.status}</FormHelperText>
                )}
              </FormControl>

              <FormControl sx={modalStyles.formControl}>
                <FormLabel sx={modalStyles.label}>Verification</FormLabel>
                <Select
                  disabled={isViewMode}
                  name="verification"
                  value={formik.values.verification}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.verification && !!formik.errors.verification
                  }
                >
                  <MenuItem value="">Select Verification</MenuItem>
                  <MenuItem value="Verified">Verified</MenuItem>
                  <MenuItem value="Unverified">Unverified</MenuItem>
                </Select>
                {formik.touched.verification && formik.errors.verification && (
                  <FormHelperText error>
                    {formik.errors.verification}
                  </FormHelperText>
                )}
              </FormControl>

              {/* Address Textarea */}
              <FormControl
                sx={{ ...modalStyles.formControl, gridColumn: "1/-1" }}
              >
                <FormLabel sx={modalStyles.label}>Address</FormLabel>
                <TextareaAutosize
                  disabled={isViewMode}
                  name="address"
                  minRows={3}
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderColor:
                      formik.touched.address && formik.errors.address
                        ? "#d32f2f"
                        : "#ccc",
                    borderRadius: "4px",
                    fontFamily: "inherit",
                  }}
                />
                {formik.touched.address && formik.errors.address && (
                  <FormHelperText error>{formik.errors.address}</FormHelperText>
                )}
              </FormControl>
            </Box>
          </LocalizationProvider>

          {/* Checkbox Fields */}
          <Box sx={modalStyles.checkboxContainer}>
            <FormControl>
              <Box sx={modalStyles.checkboxWrapper}>
                <Checkbox
                  disabled={isViewMode}
                  name="user"
                  checked={formik.values.user}
                  onChange={formik.handleChange}
                  sx={{
                    color: "#881f9b", // Unchecked color
                    "&.Mui-checked": {
                      color: "#881f9b", // Checked color
                    },
                  }}
                />
                <FormLabel>Mark as User</FormLabel>
              </Box>
              {formik.touched.user && formik.errors.user && (
                <FormHelperText error>{formik.errors.user}</FormHelperText>
              )}
            </FormControl>

            <FormControl>
              <Box sx={modalStyles.checkboxWrapper}>
                <Checkbox
                  name="host"
                  checked={formik.values.host}
                  onChange={formik.handleChange}
                  sx={{
                    color: "#881f9b", // Unchecked color
                    "&.Mui-checked": {
                      color: "#881f9b", // Checked color
                    },
                  }}
                />
                <FormLabel>Mark as Host</FormLabel>
              </Box>
            </FormControl>
          </Box>

          {/* Image Upload */}
          <Box sx={modalStyles.uploadSection}>
            {imagePreview ? (
              <Box sx={{ position: "relative" }}>
                <Box
                  component="img"
                  src={imagePreview}
                  alt="Preview"
                  sx={modalStyles.imagePreview}
                />
                <IconButton
                  onClick={removeImage}
                  sx={modalStyles.removeImageButton}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            ) : (
              <Avatar sx={{ width: 120, height: 120, mb: 2 }} />
            )}
            <input
              disabled={isViewMode}
              type="file"
              accept="image/*"
              hidden
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <Button
              variant="outlined"
              startIcon={<UploadFileIcon />}
              onClick={() => fileInputRef.current?.click()}
              sx={{
                color: "#881f9b",
                borderColor: "#881f9b",
                "&:hover": {
                  borderColor: "#881f9b",
                  backgroundColor: "#f9e6fb", // optional: light hover effect
                },
              }}
            >
              Upload Profile Picture
            </Button>
          </Box>

          {/* Form Actions */}
          <Box sx={modalStyles.actions}>
            <Button
              variant="outlined"
              onClick={handleCancel}
              sx={{
                color: "#cf1f1f",
                borderColor: "#cf1f1f",
                "&:hover": {
                  borderColor: "#cf1f1f",
                  backgroundColor: "#c4a3a3", // optional: light hover effect
                },
              }}
            >
              Cancel
            </Button>
            {mode !== "view" && (
              <Button
                type="submit"
                variant="contained"
                sx={{ bgcolor: "#881f9b" }}
              >
                {mode === "edit" ? "Update User" : "Add User"}
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
export default AddUserModal;

// Styles using MUI's sx prop
const modalStyles = {
  container: {
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
  },
  closeButton: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  title: {
    mb: 4,
    textAlign: "center",
    fontWeight: "bold",
    color: "#881f9b",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
    gap: 3,
    mb: 3,
  },
  formControl: {
    mb: 2,
  },
  label: {
    mb: 1,
    fontWeight: "medium",
  },
  input: {
    width: "100%",
  },
  checkboxContainer: {
    display: "flex",
    gap: 4,
    mb: 3,
  },
  checkboxWrapper: {
    display: "flex",
    alignItems: "center",
  },
  uploadSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    mb: 3,
    gap: 2,
  },
  imagePreview: {
    width: 200,
    height: 200,
    objectFit: "cover",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  removeImageButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "white",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.7)",
    },
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 2,
  },
};
