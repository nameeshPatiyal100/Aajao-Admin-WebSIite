import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { purpleTheme } from "../../../theme/purpleTheme";

const PropertiesHeader = () => (
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    flexWrap="wrap"
    gap={2}
    mb={4}
  >
    <Box>
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{
          background: `linear-gradient(135deg, ${purpleTheme.primary.main}, ${purpleTheme.secondary.main})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Property Management
      </Typography>
      <Typography color="text.secondary">
        Manage and monitor all properties
      </Typography>
    </Box>

    <Button
      variant="contained"
      startIcon={<AddIcon />}
      sx={{ borderRadius: 3, px: 4, py: 1.5 }}
    >
      Add Property
    </Button>
  </Box>
);

export default PropertiesHeader;
