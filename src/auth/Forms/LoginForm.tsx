import { useState } from "react";
import {
  ToggleButton,
  ToggleButtonGroup,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import loginPage from "../../assets/UI/loginpagesvg.svg";
import "../../styles/LoginForm.css";

export const LoginForm = () => {;
  const [userType, setUserType] = useState<"renter" | "host">("renter");
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="login-container">
      {/* Left Side Form */}
      <div className="login-form-section">
        <div className="login-box">
          {/* Heading & Description */}
          <h2 className="login-title">Login to Your Account</h2>
          <p className="login-description">
            Please enter your details to continue. New here? Create an account
            in just a few steps.
          </p>

          {/* Toggle Button */}
          <ToggleButtonGroup
            value={userType}
            exclusive
            onChange={(_, value) => {
              if (value !== null) setUserType(value);
            }}
            sx={{ 
              display: "flex",
              justifyContent: "center",
              mb: 3,
              height: "40px",
              borderRadius: "30px",
              overflow: "hidden",
              "& .MuiToggleButton-root": {
                textTransform: "capitalize",
                px: 4,
                py: 1.2,
                border: "1px solid #C14365",
                color: "#C14365",
                fontWeight: 600,
                borderRadius: 0,
                transition: "all 0.25s ease-in-out",

                "&:first-of-type": {
                  borderTopLeftRadius: "30px",
                  borderBottomLeftRadius: "30px",
                },
                "&:last-of-type": {
                  borderTopRightRadius: "30px",
                  borderBottomRightRadius: "30px",
                },

                // 🔥 Hover effect on unselected items
                "&:hover": {
                  backgroundColor: "#f8d6e2",
                  color: "#C14365",
                  borderColor: "#C14365",
                },

                // 🔥 Selected Button
                "&.Mui-selected": {
                  backgroundColor: "#C14365",
                  color: "#ffffff",
                  borderColor: "#C14365",
                  boxShadow: "0 0 8px rgba(193, 67, 101, 0.6)",
                },

                // 🔥 Hover on selected button (improved)
                "&.Mui-selected:hover": {
                  backgroundColor: "#a93250",
                  borderColor: "#a93250",
                  color: "#fff",
                  boxShadow: "0 0 10px rgba(169, 50, 80, 0.7)",
                },
              },
            }}
          >
            <ToggleButton value="renter">Renter</ToggleButton>
            <ToggleButton value="host">Host</ToggleButton>
          </ToggleButtonGroup>

          {/* Email Field */}
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: "#C14365",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#C14365",
              },
            }}
          />

          {/* Password Field */}
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: "#C14365",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#C14365",
              },
            }}
          />

          {/* Remember Me + Forgot Password */}
          <div className="form-options">
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  sx={{
                    color: "#C14365",
                    "&.Mui-checked": {
                      color: "#C14365",
                    },
                  }}
                />
              }
              label="Remember Me"
            />
            <Link to="/auth/forget" className="forgot-password">
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              mb: 2,
              backgroundColor: "#C14365",
              color: "#fff",
              borderRadius: "8px",
              padding: "12px",
              fontWeight: 600,
              "&:hover": { backgroundColor: "#a93250" },
            }}
          >
            Login
          </Button>

          {/* Google Button */}
          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            sx={{
              borderColor: "#C14365",
              color: "#C14365",
              borderRadius: "8px",
              padding: "12px",
              fontWeight: 600,
              "&:hover": {
                borderColor: "#a93250",
                backgroundColor: "#ffe4ec",
              },
            }}
          >
            Login with Google
          </Button>
          <div className="singuponLogin">
            <Link to="/auth/signup" className="forgot-password">
              Don't Have Account? Sign-up
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side Image */}
      <div className="login-image-section">
        <img src={loginPage} alt="Login" className="login-image" />
      </div>
    </div>
  );
};
