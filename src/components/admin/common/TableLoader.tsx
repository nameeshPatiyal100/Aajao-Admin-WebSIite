import { Box, Typography } from "@mui/material";
import { RingLoader } from "react-spinners";

interface Props {
  size?: number;
  text?: string;
  minHeight?: number | string;
}

export const TableLoader = ({
  size = 72, // ✅ BIG loader
  text = "Loading data...",
  minHeight = 180,
}: Props) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight={minHeight}
      gap={2}
    >
      <RingLoader
        size={size}
        color="#881f9b"
        speedMultiplier={0.9} // slightly smoother
      />

      <Typography
        variant="body2"
        sx={{
          color: "#6b7280",
          fontWeight: 500,
          letterSpacing: "0.3px",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};
