import {
  Avatar,
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  // Link,
  // Grid,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
// import Grid from "@mui/material/Grid";

import { LockIcon, Eye, EyeOff, Mail } from "lucide-react";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./adminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  // Form handling with Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Here you would handle the authentication logic after successfully login user can redirect to the admindashboard.
      console.log("Form submitted:", values);

      // Simulating an authentication error for demonstration
      // In a real application, you would make an API call here
      setSubmitError(""); // Clear previous errors

      // Example of handling authentication - remove this mock code in production
      if (values.email !== "admin@example.com") {
        setSubmitError("Invalid email or password");
        return;
      }

      // if (values.email === "admin@example.com") {
      navigate("/admin/dashboard");
      // }
      // If authentication succeeds, you can redirect the user
      // history.push("/dashboard"); // Uncomment when using react-router
    },
  });

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="AdminLoginMainContainer">
      <Container maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            marginTop: 8,
            borderRadius: 2,
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                bgcolor: "secondary.main",
                width: 56,
                height: 56,
                mb: 2,
              }}
            >
              <LockIcon size={28} />
            </Avatar>

            <Typography component="h1" variant="h5" fontWeight="500" mb={3}>
              Admin Login
            </Typography>

            {submitError && (
              <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                {submitError}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              noValidate
              sx={{
                width: "100%",
              }}
            >
              <TextField
                id="email"
                name="email"
                label="Email Address"
                fullWidth
                margin="normal"
                variant="outlined"
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={20} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                id="password"
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                variant="outlined"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon size={20} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    id="rememberMe"
                    name="rememberMe"
                    color="primary"
                    checked={formik.values.rememberMe}
                    onChange={formik.handleChange}
                  />
                }
                label="Remember me"
                sx={{ mt: 1 }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  bgcolor: "secondary.main",
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: 1.5,
                }}
              >
                Log In
              </Button>
              <div className="custom-grid-container">
                <div className="custom-grid-item left">
                  <a href="/forgot-password">Forgot password?</a>
                </div>
                <div className="custom-grid-item right">
                  <a href="/register">Create an account</a>
                </div>
              </div>

              {/* <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
                <Grid item xs={12}>
                  <Link
                    component={RouterLink}
                    to="/forgot-password"
                    variant="body2"
                    underline="hover"
                  >
                    Forgot password?
                  </Link>
                </Grid>

                <Grid item xs={12}>
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="body2"
                    underline="hover"
                  >
                    Create an account
                  </Link>
                </Grid>
              </Grid> */}
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
