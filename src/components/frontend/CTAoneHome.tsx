import { Box, Typography, Button } from "@mui/material";

const CTAoneHome = () => {
  return (
    <Box
      sx={{
        backgroundImage: "url('/room5.webp')", // ✅ replace with your image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        py: 15,
        textAlign: "center",
        color: "#fff",
        position: "relative",
      }}
    >
      {/* Overlay for better readability */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0,0,0,0.5)",
        }}
      />

      {/* Content */}
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{
            fontFamily: "'Playfair Display', serif", // elegant font
            fontSize: { xs: "1.8rem", md: "2.5rem" },
            letterSpacing: 1,
          }}
        >
          Looking for a relaxing vacation?
        </Typography>

        <Button
          variant="contained"
          sx={{
            bgcolor: "#fff",
            color: "#C14365",
            fontWeight: "bold",
            fontFamily: "'Roboto', sans-serif",
            px: 4,
            py: 1.5,
            borderRadius: "30px",
            boxShadow: 3,
            "&:hover": {
              bgcolor: "#f8e4ec",
            },
          }}
        >
          View Rooms
        </Button>
      </Box>
    </Box>
  );
};

export default CTAoneHome;
