import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../styles/UserSignup.css";
import Signupbro from "../assets/UI/Signupbro.svg";

// Validation schema with Yup
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
  fullName: Yup.string().required("Required"),
  dob: Yup.date().required("Required"),
  gender: Yup.string().required("Required"),
  contact: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  pincode: Yup.string().required("Required"),
  docType: Yup.string().required("Required"),
  docNumber: Yup.string().required("Required"),
  file: Yup.mixed().required("Required"),
});

const UserSignup: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  //   const [dob, setDob] = useState<Date | null>(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      dob: "",
      gender: "",
      contact: "",
      address: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      docType: "",
      docNumber: "",
      file: null,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Values:", values);
      alert("Form submitted successfully!");
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  return (
    <Box className="signup-container">
      <Box className="leftboxSignup">
        <img src={Signupbro} alt="" />
      </Box>

      {/* right box */}

      <Box className="signup-box">
        <Typography variant="h4" className="signup-title">
          User Signup
        </Typography>
        <Typography variant="body1" className="signup-description">
          Please fill out the form below to create your account.
        </Typography>

        <form onSubmit={formik.handleSubmit} className="signup-form">
          <Box className="inputsUserinfoProfile">
            <Box className="inputboxChilduserProfile">
              <Typography className="userProfileFormLabel">Email</Typography>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Box>
            <Box className="inputboxChilduserProfile">
              <Typography className="userProfileFormLabel">
                Full Name
              </Typography>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
                helperText={formik.touched.fullName && formik.errors.fullName}
              />
            </Box>
          </Box>

          <Box className="inputsUserinfoProfile">
            <Box className="inputboxChilduserProfile">
              <Typography className="userProfileFormLabel">Password</Typography>
              <TextField
                fullWidth
                type="password"
                label="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Box>
            <Box className="inputboxChilduserProfile">
              <Typography className="userProfileFormLabel">
                Confirm Password
              </Typography>
              <TextField
                fullWidth
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
            </Box>
          </Box>

          <Box className="inputsUserinfoProfile">
            <Box className="inputboxChilduserProfile">
              <Typography className="userProfileFormLabel">DOB</Typography>
              {/* <InputLabel shrink>Date of Birth</InputLabel> */}
              <TextField
                type="date"
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                value={formik.values.dob}
                onChange={formik.handleChange}
                name="dob"
              />
              {formik.touched.dob && formik.errors.dob && (
                <Typography className="error">{formik.errors.dob}</Typography>
              )}
            </Box>
            <Box className="inputboxChilduserProfile">
              <Typography className="userProfileFormLabel">Gender</Typography>
              <TextField
                select
                variant="outlined"
                fullWidth
                margin="normal"
                label="Gender"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
                helperText={formik.touched.gender && formik.errors.gender}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Box>
          </Box>

          <Box className="inputsUserinfoProfile">
            <Box className="inputsUserinfoProfile">
              <Box
                className="inputboxChilduserProfile"
                style={{ width: "100%" }}
              >
                <Typography className="userProfileFormLabel">
                  Address
                </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Full Address"
                  margin="normal"
                  multiline
                  rows={3}
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Box>
            </Box>
          </Box>

          <Box className="inputsUserinfoProfile">
            <Box className="inputboxChilduserProfile">
              <Typography className="userProfileFormLabel">
                Contact Number
              </Typography>
              <TextField
                fullWidth
                label="Contact Number"
                name="contact"
                value={formik.values.contact}
                onChange={formik.handleChange}
                error={formik.touched.contact && Boolean(formik.errors.contact)}
                helperText={formik.touched.contact && formik.errors.contact}
              />
            </Box>
            <Box className="inputboxChilduserProfile">
              <Typography className="userProfileFormLabel">Country</Typography>
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
              />
            </Box>
          </Box>

          <Box className="inputsUserinfoProfile">
            <Box className="inputboxChilduserProfile">
              <Typography className="userProfileFormLabel">State</Typography>
              <TextField
                select
                variant="outlined"
                fullWidth
                margin="normal"
                label="State"
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
              >
                <MenuItem value="state1">State 1</MenuItem>
                <MenuItem value="state2">State 2</MenuItem>
              </TextField>
              {/* <TextField fullWidth label="State" /> */}
            </Box>
            <Box className="inputboxChilduserProfile">
              <Typography className="userProfileFormLabel">City</Typography>
              <TextField
                select
                variant="outlined"
                fullWidth
                margin="normal"
                label="City"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              >
                <MenuItem value="city1">City 1</MenuItem>
                <MenuItem value="city2">City 2</MenuItem>
              </TextField>
              {/* <TextField fullWidth label="City" /> */}
            </Box>
          </Box>

          <Box className="inputsUserinfoProfile">
            <Box className="inputboxChilduserProfile">
              <Typography className="userProfileFormLabel">Pin code</Typography>
              <TextField
                fullWidth
                label="Pincode"
                name="pincode"
                value={formik.values.pincode}
                onChange={formik.handleChange}
                error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                helperText={formik.touched.pincode && formik.errors.pincode}
              />
              {/* <TextField fullWidth label="State" /> */}
            </Box>
            <Box className="inputboxChilduserProfile">
              <Typography className="userProfileFormLabel">Doc Type</Typography>
              <FormControl fullWidth>
                <InputLabel>Select Doc Type</InputLabel>
                <Select
                  name="docType"
                  value={formik.values.docType}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="Aadhar">Aadhar</MenuItem>
                  <MenuItem value="Passport">Passport</MenuItem>
                  <MenuItem value="Driving License">Driving License</MenuItem>
                </Select>
              </FormControl>
              {formik.touched.docType && formik.errors.docType && (
                <Typography className="error">
                  {formik.errors.docType}
                </Typography>
              )}
              {/* <TextField fullWidth label="City" /> */}
            </Box>
          </Box>
          <Box className="inputsUserinfoProfile">
            <Box className="inputboxChilduserProfile">
              <Typography className="userProfileFormLabel">
                Document Number
              </Typography>
              <TextField
                fullWidth
                label="Document Number"
                name="docNumber"
                value={formik.values.docNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.docNumber && Boolean(formik.errors.docNumber)
                }
                helperText={formik.touched.docNumber && formik.errors.docNumber}
              />
              {/* <TextField fullWidth label="State" /> */}
            </Box>
            <Box className="inputboxChilduserProfile">
              <Typography className="userProfileFormLabel">City</Typography>
              <TextField
                select
                variant="outlined"
                fullWidth
                margin="normal"
                label="City"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              >
                <MenuItem value="city1">City 1</MenuItem>
                <MenuItem value="city2">City 2</MenuItem>
              </TextField>
              {/* <TextField fullWidth label="City" /> */}
            </Box>
          </Box>

          <Box className="inputboxChilduserProfile" style={{ width: "100%" }}>
            <Typography className="userProfileFormLabel">Upload ID</Typography>
            <Box className="uploadBox">
              <Button
                variant="contained"
                component="label"
                className="chooseFileBtn"
              >
                Choose File
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
              {image && (
                <Box className="imagePreview">
                  <img src={image} alt="Preview" className="previewImg" />
                  <IconButton
                    className="removeImgBtn"
                    onClick={handleRemoveImage}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Box>
          {formik.touched.file && formik.errors.file && (
            <Typography className="error">{formik.errors.file}</Typography>
          )}

          <Button type="submit" variant="contained" className="submit-btn">
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default UserSignup;
