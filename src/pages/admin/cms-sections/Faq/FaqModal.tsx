import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { PurpleThemeColor } from "../../../../theme/themeColor";
import { faqValidationSchema } from "../../../../validations/admin-validations";
import { TableLoader } from "../../../../components/admin/common/TableLoader";

/* ================= Types ================= */

interface FaqModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description: string;
    status: 0 | 1;
    display_order: number; // ✅ added
  }) => void;
  initialData?: {
    title: string;
    description: string;
    status: 0 | 1;
    display_order?: number; // ✅ optional for edit
  };
  loading?: boolean;
}

/* ================= Component ================= */

export default function FaqModal({
  open,
  onClose,
  onSubmit,
  initialData,
  loading,
}: FaqModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<0 | 1>(1);
  const [displayOrder, setDisplayOrder] = useState<number>(1); // ✅ new

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    status: "",
    display_order: "", // ✅ new
  });

  /* ================= Load Data ================= */

  useEffect(() => {
    setErrors({
      title: "",
      description: "",
      status: "",
      display_order: "",
    });

    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setStatus(initialData.status);
      setDisplayOrder(initialData.display_order || 1); // ✅ load
    } else {
      setTitle("");
      setDescription("");
      setStatus(1);
      setDisplayOrder(1);
    }
  }, [initialData, open]);

  /* ================= Submit ================= */

  const handleSubmit = async () => {
    try {
      const formData = {
        title,
        description,
        status,
        display_order: displayOrder,
      };

      await faqValidationSchema.validate(formData, {
        abortEarly: false,
      });

      setErrors({
        title: "",
        description: "",
        status: "",
        display_order: "",
      });

      onSubmit(formData);
    } catch (err: any) {
      const validationErrors: any = {};

      err.inner.forEach((error: any) => {
        validationErrors[error.path] = error.message;
      });

      setErrors(validationErrors);
    }
  };

  /* ================= UI ================= */

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent sx={{ p: 4, position: "relative" }}>
        {/* ❌ Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            color: "#999",
            "&:hover": {
              color: "#000",
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Header */}
        <Typography
          variant="h6"
          fontWeight={600}
          mb={3}
          color={PurpleThemeColor}
        >
          Manage FAQ
        </Typography>

        {/* ✅ Loader OR Form */}
        {loading ? (
          <Box
            minHeight={300}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <TableLoader text="Fetching FAQ details..." />
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" gap={3}>
            {/* Title */}
            <TextField
              label="Title"
              value={title}
              error={!!errors.title}
              helperText={errors.title}
              fullWidth
              onChange={(e) => setTitle(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: PurpleThemeColor,
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: PurpleThemeColor,
                },
              }}
            />

            {/* Description */}
            <TextField
              label="Description"
              value={description}
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description}
              fullWidth
              onChange={(e) => setDescription(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: PurpleThemeColor,
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: PurpleThemeColor,
                },
              }}
            />

            {/* Status */}
            <TextField
              select
              label="Status"
              value={status}
              error={!!errors.status}
              helperText={errors.status}
              onChange={(e) => setStatus(Number(e.target.value) as 0 | 1)}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: PurpleThemeColor,
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: PurpleThemeColor,
                },
              }}
            >
              <MenuItem value={1}>Active</MenuItem>
              <MenuItem value={0}>Inactive</MenuItem>
            </TextField>

            {/* Display Order */}
            <TextField
              label="Display Order"
              type="number"
              value={displayOrder}
              error={!!errors.display_order}
              helperText={errors.display_order}
              fullWidth
              onChange={(e) => setDisplayOrder(Number(e.target.value))}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: PurpleThemeColor,
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: PurpleThemeColor,
                },
              }}
            />

            {/* Buttons */}
            <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
              <Button
                variant="outlined"
                onClick={onClose}
                sx={{
                  borderColor: PurpleThemeColor,
                  color: PurpleThemeColor,
                }}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  backgroundColor: PurpleThemeColor,
                  "&:hover": {
                    backgroundColor: PurpleThemeColor,
                  },
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
