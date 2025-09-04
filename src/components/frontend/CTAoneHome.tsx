import { Box, Typography,Button} from "@mui/material";

const CTAoneHome = () => {
  return (
    <Box sx={{ bgcolor: "#C14365", py: 6, textAlign: "center", color: "#fff" }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Looking for a relaxing vacation?
      </Typography>
      <Button
        variant="contained"
        sx={{
          bgcolor: "#fff",
          color: "#C14365",
          fontWeight: "bold",
          px: 4,
          py: 1.5,
          "&:hover": {
            bgcolor: "#f8e4ec",
          },
        }}
      >
        View Rooms
      </Button>
    </Box>
  );
};
export default CTAoneHome;
