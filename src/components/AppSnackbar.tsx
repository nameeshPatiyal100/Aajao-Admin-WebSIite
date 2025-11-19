import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface AppSnackbarProps {
  open: boolean;
  message: string;
  severity?: "success" | "error" | "warning" | "info";
  onClose: () => void;
}

const AppSnackbar: React.FC<AppSnackbarProps> = ({
  open,
  message,
  severity = "info",
  onClose,
}) => {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      sx={{
        "& .MuiPaper-root": {
          background: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <Alert
        severity={severity}
        variant="filled"
        onClose={onClose}
        sx={{
          width: 280,
          borderRadius: "14px",
          py: 1.6,
          px: 2,
          fontSize: "0.95rem",
          fontWeight: 500,
          textAlign: "center",
          boxShadow: "0px 12px 26px rgba(0,0,0,0.16)",
          backdropFilter: "blur(8px)",
          bgcolor:
            severity === "success"
              ? "rgba(56, 142, 60, 0.9)"
              : severity === "error"
              ? "rgba(211, 47, 47, 0.9)"
              : severity === "warning"
              ? "rgba(245, 124, 0, 0.9)"
              : "rgba(25, 118, 210, 0.9)",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;
