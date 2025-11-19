import React from "react";
import { Box, Typography, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";

const BookingConfirmed: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 3,
        bgcolor: "#f9fafb",
      }}
    >
      {/* Illustration or Icon */}
      <CheckCircleOutlineIcon sx={{ fontSize: 100, color: "#4caf50", mb: 2 }} />

      {/* Title */}
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Booking Confirmed!
      </Typography>

      {/* Subtitle */}
      <Typography
        variant="body1"
        sx={{ color: "text.secondary", mb: 3, maxWidth: 400 }}
      >
        Your booking has been successfully confirmed. We’ve sent you a
        confirmation email with the details of your stay.
      </Typography>

      {/* Button */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#c14365",
          borderRadius: "10px",
          px: 4,
          py: 1.5,
          textTransform: "none",
          fontWeight: 600,
          color: "#fff",
          "&:hover": {
            backgroundColor: "#a63655", // darker shade for hover
          },
        }}
        onClick={() => navigate("/")}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default BookingConfirmed;
