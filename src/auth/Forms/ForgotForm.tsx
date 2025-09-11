import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import "../../styles/ForgetPasswordForm.css";
import { useNavigate } from 'react-router-dom';
import bgImage from "../../assets/UI/forgotpasswordback.jpg"; // <-- add your background image here

export const ForgetPasswordForm = () => {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);


  const navigate = useNavigate();


  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "otp" && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Email validation
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const returnToLogin = () => {
    navigate("/auth/login");
  }

  const handleSubmit = () => {
    if (step === "email") {
      if (!email) {
        setError("Email is required");
        return;
      }
      if (!validateEmail(email)) {
        setError("Please enter a valid email address");
        return;
      }
      setError("");
      setStep("otp");
      setTimer(30); // reset timer
    } else {
      if (!otp) {
        setError("OTP is required");
        return;
      }
      setError("");
      alert(`OTP Submitted: ${otp}`); // replace with your API call
    }
  };

  return (
    <Box
      className="forget-container"
      sx={{ backgroundImage: `url(${bgImage})` }}
    >
      <Box className="forget-box">
        <Typography variant="h4" fontWeight={700} mb={1} color="#C14365">
          Forgot Password
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          {step === "email"
            ? "Don’t worry, enter your email below to reset your password."
            : `We sent an OTP to your email: ${email}`}
        </Typography>

        {/* Email Field */}
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          disabled={step === "otp"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error && step === "email"}
          helperText={step === "email" ? error : ""}
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
              borderColor: "#C14365",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#C14365",
            },
          }}
        />

        {/* OTP Field */}
        {step === "otp" && (
          <TextField
            label="Enter OTP"
            fullWidth
            margin="normal"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            error={!!error && step === "otp"}
            helperText={step === "otp" ? error : ""}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: "#C14365",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#C14365",
              },
            }}
          />
        )}

        {/* Timer */}
        {step === "otp" && (
          <Typography variant="body2" color="text.secondary" mb={2}>
            Resend OTP in {timer}s
          </Typography>
        )}

        {/* Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#C14365",
            color: "#fff",
            borderRadius: "8px",
            py: 1.5,
            fontWeight: 600,
            "&:hover": { backgroundColor: "#a93250" },
          }}
          onClick={handleSubmit}
        >
          {step === "email" ? "Submit" : "Submit OTP"}
        </Button>
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#522d37",
            color: "#fff",
            borderRadius: "8px",
            py: 1.5,
            fontWeight: 600,
            "&:hover": { backgroundColor: "#a93250" },
          }}
          onClick={returnToLogin}
        >
          Retrun to Login
        </Button>
      </Box>
    </Box>
  );
};
