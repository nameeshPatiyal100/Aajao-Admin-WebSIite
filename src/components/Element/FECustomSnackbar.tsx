import React, { useState, useEffect } from "react";
import { Snackbar, AlertColor, Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import { motion } from "framer-motion";

interface CustomSnackbarProps {
  open: boolean;
  message: string;
  type?: AlertColor; // "success" | "error" | "info" | "warning"
  duration?: number;
  onClose?: () => void;
}

const ICONS = {
  success: <CheckCircleIcon sx={{ fontSize: 28 }} />,
  error: <ErrorIcon sx={{ fontSize: 28 }} />,
  info: <InfoIcon sx={{ fontSize: 28 }} />,
  warning: <WarningIcon sx={{ fontSize: 28 }} />,
};

const COLORS = {
  success: "#4CAF50",
  error: "#F44336",
  info: "#2196F3",
  warning: "#FF9800",
};

const FECustomSnackbar: React.FC<CustomSnackbarProps> = ({
  open,
  message,
  type = "info",
  duration = 3000,
  onClose,
}) => {
  const [show, setShow] = useState(open);

  useEffect(() => {
    setShow(open);
  }, [open]);

  const handleClose = () => {
    setShow(false);
    onClose?.();
  };

  return (
    <Snackbar
      open={show}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{ mt: 2 }}
    >
      <motion.div
        initial={{ opacity: 0, x: 50, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 50, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            px: 2.5,
            py: 1.7,
            borderRadius: "14px",
            minWidth: 280,
            background: "rgba(255, 255, 255, 0.25)",
            backdropFilter: "blur(12px)",
            border: `1px solid ${COLORS[type]}40`,
            boxShadow: `0px 8px 20px ${COLORS[type]}40`,
          }}
        >
          <Box sx={{ color: COLORS[type] }}>{ICONS[type]}</Box>

          <Box>
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: 700,
                color: COLORS[type],
                letterSpacing: 0.3,
                textTransform: "capitalize",
                mb: "2px",
              }}
            >
              {type}
            </Typography>

            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#333",
              }}
            >
              {message}
            </Typography>
          </Box>
        </Box>
      </motion.div>
    </Snackbar>
  );
};

export default FECustomSnackbar;
