import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import login_illustration from "../../../assets/admin/login_illustration.png";
import * as Yup from "yup";
import { Lock, Eye, EyeOff, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
// import { CustomSnackbar } from "../../../components";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { adminLogin } from "../../../features/admin/adminAuth/adminAuth.thunk";

const MotionBox = motion(Box);

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const { loading, isAuthenticated } = useAppSelector(
    (state) => state.adminAuth
  );

  const { message, severity } = useAppSelector((state) => state.ui);

  /* 🔁 Redirect after successful login */
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(
        adminLogin({
          username: values.email,
          password: values.password,
        })
      );
    },
  });

  const PURPLE = "#7C3AED";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
      }}
    >
      {/* LEFT IMAGE SECTION */}
      <Box
        sx={{
          flex: 1.2,
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #7C3AED, #A855F7)",
          color: "#fff",
          px: 8,
        }}
      >
        <MotionBox
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          maxWidth={520}
        >
          <Typography variant="h2" fontWeight={800} mb={2}>
            Admin Console
          </Typography>

          <Typography variant="body1" sx={{ opacity: 0.9, mb: 5 }}>
            Control users, properties, bookings, and revenue from one powerful
            admin dashboard.
          </Typography>

          <Box
            component="img"
            src={login_illustration}
            alt="Admin Illustration"
            sx={{ width: "100%" }}
          />
        </MotionBox>
      </Box>

      {/* RIGHT FORM SECTION */}
      <Box
        sx={{
          flex: 0.9,
          display: "flex",
          alignItems: "stretch",
          backgroundColor: "#F9FAFB",
        }}
      >
        <MotionBox
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          sx={{
            width: "100%",
            background: "#ffffff",
            px: { xs: 3, sm: 6 },
            py: { xs: 6, sm: 8 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            boxShadow: "-20px 0 40px rgba(0,0,0,0.05)",
          }}
        >
          {/* Header */}
          <Box mb={4}>
            <Typography
              variant="h4"
              fontWeight={800}
              mb={1}
              sx={{
                background: "linear-gradient(135deg, #7C3AED, #A855F7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Admin Login
            </Typography>

            <Typography color="text.secondary">
              Sign in to access the admin dashboard
            </Typography>
          </Box>

          {/* API ERROR */}
          {severity === "error" && message && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {message}
            </Alert>
          )}

          {/* FORM */}
          <Box component="form" onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              label="Email address"
              margin="normal"
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail size={18} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              margin="normal"
              {...formik.getFieldProps("password")}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={18} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((p) => !p)}>
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    checked={formik.values.rememberMe}
                    onChange={formik.handleChange}
                  />
                }
                label="Remember me"
              />

              <Typography
                component="a"
                href="/forgot-password"
                sx={{ fontSize: 14, fontWeight: 500, color: PURPLE }}
              >
                Forgot password?
              </Typography>
            </Box>

            <Button
              type="submit"
              fullWidth
              size="large"
              disabled={loading}
              sx={{
                mt: 4,
                py: 1.8,
                background: "linear-gradient(135deg, #7C3AED, #A855F7)",
                color: "#fff",
                fontWeight: 700,
                borderRadius: 3,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>

            {/* SUCCESS SNACKBAR */}
            {/* <CustomSnackbar
              open={severity === "success" && !!message}
              message={message || ""}
              severity="success"
            /> */}
          </Box>
        </MotionBox>
      </Box>
    </Box>
  );
};

export default AdminLogin;
