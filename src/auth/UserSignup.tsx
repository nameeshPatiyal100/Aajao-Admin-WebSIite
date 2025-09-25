// import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { DateRangePicker } from "react-date-range";
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

  return (
    <Box className="signup-container">
      <Box className="leftboxSignup">
        <img src={Signupbro} alt="" />
      </Box>
      <Box className="signup-box">
        <Typography variant="h4" className="signup-title">
          User Signup
        </Typography>
        <Typography variant="body1" className="signup-description">
          Please fill out the form below to create your account.
        </Typography>

        <form onSubmit={formik.handleSubmit} className="signup-form">
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

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
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />

          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />

          {/* Date of Birth */}
          <InputLabel shrink>Date of Birth</InputLabel>
          <input
            type="date"
            name="dob"
            className="custom-date"
            value={formik.values.dob}
            onChange={formik.handleChange}
          />
          {formik.touched.dob && formik.errors.dob && (
            <Typography className="error">{formik.errors.dob}</Typography>
          )}

          <TextField
            fullWidth
            label="Gender"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            helperText={formik.touched.gender && formik.errors.gender}
          />

          <TextField
            fullWidth
            label="Contact Number"
            name="contact"
            value={formik.values.contact}
            onChange={formik.handleChange}
            error={formik.touched.contact && Boolean(formik.errors.contact)}
            helperText={formik.touched.contact && formik.errors.contact}
          />

          <TextField
            fullWidth
            label="Full Address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />

          <TextField
            fullWidth
            label="Country"
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
          />

          <TextField
            fullWidth
            label="State"
            name="state"
            value={formik.values.state}
            onChange={formik.handleChange}
            error={formik.touched.state && Boolean(formik.errors.state)}
            helperText={formik.touched.state && formik.errors.state}
          />

          <TextField
            fullWidth
            label="City"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          />

          <TextField
            fullWidth
            label="Pincode"
            name="pincode"
            value={formik.values.pincode}
            onChange={formik.handleChange}
            error={formik.touched.pincode && Boolean(formik.errors.pincode)}
            helperText={formik.touched.pincode && formik.errors.pincode}
          />

          {/* Dropdown */}
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
            <Typography className="error">{formik.errors.docType}</Typography>
          )}

          <TextField
            fullWidth
            label="Document Number"
            name="docNumber"
            value={formik.values.docNumber}
            onChange={formik.handleChange}
            error={formik.touched.docNumber && Boolean(formik.errors.docNumber)}
            helperText={formik.touched.docNumber && formik.errors.docNumber}
          />

          {/* File Upload */}
          <input
            type="file"
            name="file"
            accept="image/*,application/pdf"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.currentTarget.files) {
                formik.setFieldValue("file", event.currentTarget.files[0]);
              }
            }}
          />
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
