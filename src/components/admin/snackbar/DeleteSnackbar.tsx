import React from "react";
import {
  Snackbar,
  Alert,
  IconButton,
  SnackbarCloseReason,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";

export type SnackbarType = "success" | "error" | "warning" | "info";

interface DeleteSnackbarProps {
  open: boolean;
  message: string;
  type?: SnackbarType;
  autoHideDuration?: number;
  onClose?: (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => void;
}

const iconMap: Record<SnackbarType, React.ReactNode> = {
  success: <CheckCircleIcon />,
  error: <ErrorIcon />,
  warning: <WarningIcon />,
  info: <InfoIcon />,
};

const DeleteSnackbar: React.FC<DeleteSnackbarProps> = ({
  open,
  message,
  type = "success",
  autoHideDuration = 4000,
  onClose,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{
        "& .MuiSnackbarContent-root": {
          width: "100%",
          maxWidth: "500px",
        },
      }}
    >
      <Alert
        severity={type}
        variant="filled"
        icon={iconMap[type]}
        onClose={onClose}
        sx={{
          width: "100%",
          fontSize: "0.95rem",
          padding: "14px 18px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          alignItems: "center",
        }}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={(e) => onClose?.(e)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default DeleteSnackbar;
