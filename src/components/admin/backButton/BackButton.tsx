// components/BackButton.tsx
import { Button, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MotionButton = motion.create(Button);

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <Tooltip title="Go back" arrow>
      <MotionButton
        onClick={() => navigate(-1)}
        variant="contained"
        color="secondary"
        startIcon={<ArrowBackIcon />}
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        sx={{
          borderRadius: 2,
          textTransform: "none",
          fontWeight: 500,
        }}
      >
        Back
      </MotionButton>
    </Tooltip>
  );
}
