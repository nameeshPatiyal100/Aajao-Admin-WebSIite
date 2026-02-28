import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  Zoom,
} from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { PurpleThemeColor } from "../../../theme/themeColor";

interface DeleteConfirmDialogProps {
  open: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  open,
  title = "Delete Coupon",
  message = "Are you sure you want to delete this coupon? This action cannot be undone.",
  onClose,
  onConfirm,
  loading = false,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Zoom}
      PaperProps={{
        sx: {
          borderRadius: 4,
          padding: 3,
          width: 420,
          textAlign: "center",
        },
      }}
    >
      <DialogContent>
        {/* Icon */}
        <Box
          sx={{
            width: 70,
            height: 70,
            margin: "0 auto 16px",
            borderRadius: "50%",
            backgroundColor: "#fff3f3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <WarningAmberRoundedIcon
            sx={{ fontSize: 40, color: "error.main" }}
          />
        </Box>

        {/* Title */}
        <Typography variant="h6" fontWeight={700} mb={1}>
          {title}
        </Typography>

        {/* Message */}
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: "center",
          gap: 2,
          mt: 2,
        }}
      >
        {/* Cancel Button - Purple */}
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: PurpleThemeColor,
            color: PurpleThemeColor,
            px: 3,
            borderRadius: 2,
            "&:hover": {
              borderColor: PurpleThemeColor,
              backgroundColor: "rgba(124,58,237,0.08)",
            },
          }}
        >
          Cancel
        </Button>

        {/* Delete Button */}
        <Button
          onClick={onConfirm}
          variant="contained"
          disabled={loading}
          sx={{
            backgroundColor: "error.main",
            px: 3,
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "#c62828",
            },
          }}
        >
          {loading ? (
            <CircularProgress size={20} sx={{ color: "#fff" }} />
          ) : (
            "Delete"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;