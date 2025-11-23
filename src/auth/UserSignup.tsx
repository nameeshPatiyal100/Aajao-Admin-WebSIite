import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  LinearProgress,
  useMediaQuery,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { FECustomSnackbar } from "../components";

import PersonalInfo from "./PersonalInfo";
import AddressInfo from "./AddressInfo";
import IDInfo from "./IDInfo";

const PRIMARY = "#c14365";
const steps = ["Personal Info", "Address", "ID Details"];

const UserSignup = () => {
  const [activeStep, setActiveStep] = useState(0);
  const isMobile = useMediaQuery("(max-width:768px)");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success" as "success" | "error" | "info" | "warning",
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    contact: "",
    alternatePhone: "",

    address: "",
    country: "",
    state: "",
    city: "",
    pincode: "",

    docType: "",
    docNumber: "",
    file: null,

    isUser: true,
    isHost: false,
  });

  console.log(formData, "formData");

  const [errors, setErrors] = useState<any>({});

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = () => {
    console.log(formData);
    setSnackbar({
      open: true,
      message: "Signup Successful!",
      type: "success",
    });
  };

  const validateStep = () => {
    let newErr: any = {};

    if (activeStep === 0) {
      if (!formData.fullName) newErr.fullName = "Full Name is required";
      if (!formData.email) newErr.email = "Email is required";
      if (!formData.password) newErr.password = "Password is required";
      if (!formData.confirmPassword)
        newErr.confirmPassword = "Confirm Password is required";
      if (formData.password !== formData.confirmPassword)
        newErr.confirmPassword = "Passwords do not match";

      if (!formData.gender) newErr.gender = "Gender is required";
      if (!formData.dob) newErr.dob = "Date of Birth is required";
      if (!formData.contact) newErr.contact = "Contact Number is required";
    }

    if (activeStep === 1) {
      if (!formData.address) newErr.address = "Address is required";
      if (!formData.city) newErr.city = "City is required";
      if (!formData.pincode) newErr.pincode = "Pincode is required";
    }

    if (activeStep === 2) {
      if (!formData.docType) newErr.docType = "Document type is required";
      if (!formData.docNumber) newErr.docNumber = "Document number is required";
      if (!formData.file) newErr.file = "Please upload the document";
    }

    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setActiveStep((prev) => prev + 1);
  };
  const handleBack = () => setActiveStep((prev) => prev - 1);

  // const handleGoogleSignup = () => {
  //   alert("Google Signup clicked!");
  //   // Integrate Google OAuth here
  // };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column", // always column for easier mobile layout
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            flex: 1,
          }}
        >
          {/* LEFT IMAGE PANEL (desktop only) */}
          {!isMobile && (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          )}

          {/* RIGHT FORM PANEL */}
          <Box
            sx={{
              flex: 1,
              p: isMobile ? 2 : 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Paper sx={{ width: "100%", p: 4, borderRadius: 3, boxShadow: 3 }}>
              {/* Google Signup Button */}
              <Button
                fullWidth
                variant="contained"
                startIcon={<GoogleIcon sx={{ color: "#DB4437" }} />}
                onClick={handleSubmit}
                // onClick={handleGoogleSignup}
                sx={{
                  mb: 3,
                  backgroundColor: "#fff",
                  color: "#202124",
                  textTransform: "none",
                  fontWeight: 500,
                  py: 1.5,
                  border: "1px solid #dadce0",
                  "&:hover": {
                    backgroundColor: "#f7f7f7",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                  },
                }}
              >
                Sign up with Google
              </Button>

              {/* Progress Bar */}
              <LinearProgress
                variant="determinate"
                value={((activeStep + 1) / steps.length) * 100}
                sx={{
                  mb: 3,
                  height: 7,
                  borderRadius: 3,
                  "& .MuiLinearProgress-bar": { backgroundColor: PRIMARY },
                }}
              />

              {/* Stepper */}
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                sx={{
                  "& .MuiStepIcon-root.Mui-active": { color: PRIMARY },
                  "& .MuiStepIcon-root.Mui-completed": { color: PRIMARY },
                }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {/* Slide Content */}
              <Box sx={{ overflow: "hidden", mt: 3, width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    width: `${steps.length * 100}%`,
                    transform: `translateX(-${(activeStep * 100) / steps.length}%)`,
                    transition: "transform 0.4s ease",
                  }}
                >
                  <Box sx={{ width: `${100 / steps.length}%` }}>
                    <PersonalInfo
                      data={formData}
                      errors={errors}
                      onChange={handleChange}
                    />
                  </Box>
                  <Box sx={{ width: `${100 / steps.length}%` }}>
                    <AddressInfo
                      data={formData}
                      errors={errors}
                      onChange={handleChange}
                    />
                  </Box>
                  <Box sx={{ width: `${100 / steps.length}%` }}>
                    <IDInfo
                      data={formData}
                      errors={errors}
                      onChange={handleChange}
                    />
                  </Box>
                </Box>
              </Box>

              {/* Navigation Buttons */}
              <Box display="flex" justifyContent="space-between" mt={4}>
                {activeStep > 0 ? (
                  <Button
                    variant="outlined"
                    onClick={handleBack}
                    sx={{ borderColor: PRIMARY, color: PRIMARY }}
                  >
                    Back
                  </Button>
                ) : (
                  <Box />
                )}

                <Button
                  variant="contained"
                  onClick={
                    activeStep === steps.length - 1 ? handleSubmit : handleNext
                  }
                  sx={{ backgroundColor: PRIMARY }}
                >
                  {activeStep === steps.length - 1 ? "Submit" : "Next"}
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>

        {/* MOBILE IMAGE PANEL */}
        {isMobile && (
          <Box
            sx={{
              mt: 2,
              width: "100%",
              height: 200,
              backgroundImage:
                "url('https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 3,
            }}
          />
        )}
      </Box>
      <FECustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        type={snackbar.type}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
};

export default UserSignup;
