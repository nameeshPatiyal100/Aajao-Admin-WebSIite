// components/CustomSnackbar.tsx
import React from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

interface CustomSnackbarProps {
  open: boolean;
  message: string;
  severity: AlertColor; // "success" | "error" | "warning" | "info"
  onClose: () => void;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  open,
  message,
  severity,
  onClose,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{
          width: "100%",
          minWidth: "300px",
          fontSize: "1rem",
          py: 2,
          px: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
