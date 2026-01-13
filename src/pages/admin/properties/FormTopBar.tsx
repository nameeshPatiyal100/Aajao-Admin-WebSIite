import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface FormTopBarProps {
  ThemeColors: {
    primary: string;
  };
}
export default function FormTopBar({ ThemeColors }: FormTopBarProps) {
  return (
    <Box display="flex" flexDirection="column" gap={3} mb={4}>
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        flexWrap="wrap"
        justifyContent="space-between"
        width="100%"
      >
        <Typography
          variant="h4"
          sx={{
            color: ThemeColors.primary,
            fontWeight: 700,
          }}
        >
          Properties
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/admin/properties"
          sx={{
            backgroundColor: ThemeColors.primary,
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "#3730a3",
            },
          }}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
}
