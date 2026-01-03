import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  MenuItem,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { motion, AnimatePresence } from "framer-motion";
import dayjs, { Dayjs } from "dayjs";
import { PurpleThemeColor } from "../../../../theme/themeColor";
import * as Yup from "yup";

// -------------------- Yup Validation --------------------
const validationSchema = Yup.object().shape({
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

// -------------------- Types --------------------
interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onAddUser: (user: any) => void;
  mode: "add" | "edit" | "view";
  user?: any;
}

// -------------------- Modal Component --------------------
const AddUserModal: React.FC<AddUserModalProps> = ({
  open,
  onClose,
  onAddUser,
  mode,
  user,
}) => {
  const isViewMode = mode === "view";

  // -------------------- Form State --------------------
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: null as Dayjs | null,
    address: "",
    city: "",
    zipcode: "",
    status: "",
    verified: "",
    user: true,
    host: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [idPreview, setIdPreview] = useState<string | null>(null);

  const profileRef = useRef<HTMLInputElement | null>(null);
  const idRef = useRef<HTMLInputElement | null>(null);

  // -------------------- Populate form in edit/view mode --------------------
  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        dob: user.dob ? dayjs(user.dob) : null,
        address: user.address || "",
        city: user.city || "",
        zipcode: user.zipcode || "",
        status: user.status || "",
        verified: user.verified || "",
        user: user.user ?? true,
        host: user.host ?? false,
      });
      setProfilePreview(user.profileImage || null);
      setIdPreview(user.idImage || null);
    } else {
      setForm((prev) => ({ ...prev, dob: null }));
      setProfilePreview(null);
      setIdPreview(null);
    }
    setErrors({});
  }, [user, open]);

  // -------------------- Handle Input Change --------------------
  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // -------------------- Validation --------------------
  const validateForm = async () => {
    try {
      await validationSchema.validate(form, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err: any) {
      const errObj: Record<string, string> = {};
      err.inner.forEach((e: any) => {
        errObj[e.path] = e.message;
      });
      setErrors(errObj);
      return false;
    }
  };

  // -------------------- Handle Submit --------------------
  const handleSubmit = async () => {
    if (isViewMode) return;
    const isValid = await validateForm();
    if (!isValid) return;
    onAddUser({ ...form, dob: form.dob?.format("YYYY-MM-DD") });
    onClose();
  };

  // -------------------- Handle Profile Image --------------------
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const removeProfile = () => {
    setProfilePreview(null);
    if (profileRef.current) profileRef.current.value = "";
  };

  // -------------------- Handle ID Image --------------------
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setIdPreview(URL.createObjectURL(file));
  };

  const removeId = () => {
    setIdPreview(null);
    if (idRef.current) idRef.current.value = "";
  };

  // -------------------- JSX --------------------
  return (
    <AnimatePresence>
      {open && (
        <Modal open={open} onClose={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.25 }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box sx={styles.container}>
              {/* Header */}
              <Box sx={styles.header}>
                <Typography variant="h5" sx={styles.title}>
                  {mode === "add"
                    ? "Add New User"
                    : mode === "edit"
                      ? "Edit User"
                      : "User Details"}
                </Typography>
                <IconButton onClick={onClose} sx={{ color: "#fff" }}>
                  <CloseIcon />
                </IconButton>
              </Box>

              {/* Form */}
              <Box sx={styles.formGrid}>
                {/* Full Name */}
                <TextField
                  label="Full Name"
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                  fullWidth
                  disabled={isViewMode}
                  sx={styles.input}
                />

                {/* Email */}
                <TextField
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                  fullWidth
                  disabled={isViewMode}
                  sx={styles.input}
                />

                {/* Phone */}
                <TextField
                  label="Phone"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  fullWidth
                  disabled={isViewMode}
                  sx={styles.input}
                />

                {/* DOB */}
                <TextField
                  label="Date of Birth"
                  type="date"
                  value={form.dob ? form.dob.format("YYYY-MM-DD") : ""}
                  onChange={(e) => handleChange("dob", dayjs(e.target.value))}
                  error={!!errors.dob}
                  helperText={errors.dob}
                  fullWidth
                  disabled={isViewMode}
                  InputLabelProps={{ shrink: true }}
                  sx={styles.input}
                />

                {/* Address */}
                <TextField
                  label="Address"
                  value={form.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  error={!!errors.address}
                  helperText={errors.address}
                  fullWidth
                  multiline
                  rows={3}
                  disabled={isViewMode}
                  sx={styles.input}
                />

                {/* City */}
                <TextField
                  label="City"
                  value={form.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  error={!!errors.city}
                  helperText={errors.city}
                  fullWidth
                  disabled={isViewMode}
                  sx={styles.input}
                />

                {/* Zipcode */}
                <TextField
                  label="Zipcode"
                  value={form.zipcode}
                  onChange={(e) => handleChange("zipcode", e.target.value)}
                  error={!!errors.zipcode}
                  helperText={errors.zipcode}
                  fullWidth
                  disabled={isViewMode}
                  sx={styles.input}
                />

                {/* Status */}
                <TextField
                  select
                  label="Status"
                  value={form.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  error={!!errors.status}
                  helperText={errors.status}
                  fullWidth
                  disabled={isViewMode}
                  sx={styles.input}
                >
                  <MenuItem value="">Select Status</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </TextField>

                {/* Verified */}
                <TextField
                  select
                  label="Is Verified"
                  value={form.verified}
                  onChange={(e) => handleChange("verified", e.target.value)}
                  error={!!errors.verified}
                  helperText={errors.verified}
                  fullWidth
                  disabled={isViewMode}
                  sx={styles.input}
                >
                  <MenuItem value="">Select Verification</MenuItem>
                  <MenuItem value="Verified">Verified</MenuItem>
                  <MenuItem value="Unverified">Unverified</MenuItem>
                </TextField>

                {/* User / Host */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form.user}
                      onChange={(e) => handleChange("user", e.target.checked)}
                      sx={{
                        color: PurpleThemeColor,
                        "&.Mui-checked": { color: PurpleThemeColor },
                      }}
                    />
                  }
                  label="User"
                  sx={{ ml: 0 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form.host}
                      onChange={(e) => handleChange("host", e.target.checked)}
                      sx={{
                        color: PurpleThemeColor,
                        "&.Mui-checked": { color: PurpleThemeColor },
                      }}
                    />
                  }
                  label="Host"
                  sx={{ ml: 0 }}
                />
              </Box>

              {/* Profile Image */}
              <Box sx={styles.uploadSection}>
                <Typography variant="subtitle2">Profile Image</Typography>
                <Box sx={{ position: "relative", width: 140, height: 140 }}>
                  {profilePreview ? (
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                      }}
                    >
                      <Box
                        component="img"
                        src={profilePreview}
                        alt="Profile"
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: 2,
                          border: `1px solid ${PurpleThemeColor}`,
                        }}
                      />
                      <IconButton
                        size="small"
                        onClick={removeProfile}
                        sx={{
                          position: "absolute",
                          top: 4,
                          right: 4,
                          bgcolor: PurpleThemeColor,
                          color: "#fff",
                          "&:hover": { bgcolor: "#6e167d" },
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        border: `2px dashed ${PurpleThemeColor}`,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        color: PurpleThemeColor,
                      }}
                    >
                      No Image
                    </Box>
                  )}
                  <input
                    type="file"
                    hidden
                    ref={profileRef}
                    onChange={handleProfileChange}
                    accept="image/*"
                  />
                </Box>
                {!isViewMode && (
                  <Button
                    startIcon={<UploadFileIcon />}
                    onClick={() => profileRef.current?.click()}
                    sx={{
                      mt: 1,
                      borderColor: PurpleThemeColor,
                      color: PurpleThemeColor,
                      textTransform: "none",
                    }}
                    variant="outlined"
                  >
                    Upload
                  </Button>
                )}
              </Box>

              {/* User ID */}
              <Box sx={styles.uploadSection}>
                <Typography variant="subtitle2">User ID</Typography>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <Button
                    startIcon={<UploadFileIcon />}
                    variant="outlined"
                    onClick={() => idRef.current?.click()}
                    sx={{
                      borderColor: PurpleThemeColor,
                      color: PurpleThemeColor,
                      textTransform: "none",
                    }}
                  >
                    Upload ID
                  </Button>

                  <Box sx={{ position: "relative", width: 140, height: 100 }}>
                    {idPreview ? (
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          position: "relative",
                        }}
                      >
                        <Box
                          component="img"
                          src={idPreview}
                          alt="ID"
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: 2,
                            border: `1px solid ${PurpleThemeColor}`,
                          }}
                        />
                        <IconButton
                          size="small"
                          onClick={removeId}
                          sx={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            bgcolor: PurpleThemeColor,
                            color: "#fff",
                            "&:hover": { bgcolor: "#6e167d" },
                          }}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          border: `2px dashed ${PurpleThemeColor}`,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          color: PurpleThemeColor,
                        }}
                      >
                        No ID
                      </Box>
                    )}
                    <input
                      type="file"
                      hidden
                      ref={idRef}
                      onChange={handleIdChange}
                      accept="image/*,.pdf"
                    />
                  </Box>
                </Box>
              </Box>

              {/* Actions */}
              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                }}
              >
                <Button
                  onClick={onClose}
                  variant="outlined"
                  sx={{
                    borderColor: PurpleThemeColor,
                    color: PurpleThemeColor,
                  }}
                >
                  Cancel
                </Button>
                {!isViewMode && (
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{ bgcolor: PurpleThemeColor }}
                  >
                    {mode === "edit" ? "Update User" : "Add User"}
                  </Button>
                )}
              </Box>
            </Box>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

// -------------------- Styles --------------------
const styles: any = {
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", md: "80%" },
    maxWidth: 900,
    maxHeight: "90vh",
    bgcolor: "#fff",
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
    overflowY: "auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: PurpleThemeColor,
    color: "#fff",
    p: 2,
    borderRadius: "8px 8px 0 0",
    mb: 3,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 5,
    mb: 3,
  },
  input: {
    "& .MuiInputLabel-root": { color: PurpleThemeColor },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": { borderColor: PurpleThemeColor },
    },
    "& .MuiFormHelperText-root": { color: PurpleThemeColor },
  },
  uploadSection: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    mb: 3,
  },
  avatar: {
    width: 120,
    height: 120,
  },
  imageDelete: {
    position: "absolute",
    top: -8,
    right: -8,
    bgcolor: PurpleThemeColor,
    color: "#fff",
    "&:hover": { bgcolor: "#6e167d" },
  },
};

export default AddUserModal;
