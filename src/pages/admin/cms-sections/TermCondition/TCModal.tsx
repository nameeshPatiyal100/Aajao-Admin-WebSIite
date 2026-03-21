import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

import { PurpleThemeColor } from "../../../../theme/themeColor";
import { tcValidationSchema } from "../../../../validations/admin-validations";

/* ================= Types ================= */

// interface TCModalProps {
//   open: boolean;
//   onClose: () => void;
//   onSubmit: (data: {
//     title: string;
//     description: string;
//     status: 0 | 1;
//   }) => void;
//   initialData?: {
//     title: string;
//     description: string;
//     status: 0 | 1;
//   };
// }
interface TCModalProps   {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: {
    title: string;
    description: string;
    status: 0 | 1;
  };
  loading?: boolean; // ✅ add this
}

/* ================= Component ================= */

export default function TCModal({
  open,
  onClose,
  onSubmit,
  initialData,
}: TCModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<0 | 1>(1);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    status: "",
  });

  /* ================= Load Data ================= */

  useEffect(() => {
    setErrors({
      title: "",
      description: "",
      status: "",
    });

    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setStatus(initialData.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus(1);
    }
  }, [initialData, open]);

  /* ================= Submit ================= */

  const handleSubmit = async () => {
    try {
      const formData = {
        title,
        description,
        status,
      };

      await tcValidationSchema.validate(formData, {
        abortEarly: false,
      });

      setErrors({
        title: "",
        description: "",
        status: "",
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
      <DialogContent sx={{ p: 4 }}>
        <Typography
          variant="h6"
          fontWeight={600}
          mb={3}
          color={PurpleThemeColor}
        >
          Manage Terms & Conditions
        </Typography>

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
            onChange={(e) =>
              setStatus(Number(e.target.value) as 0 | 1)
            }
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
            <MenuItem
              value={1}
              sx={{
                "&:hover": {
                  backgroundColor: PurpleThemeColor,
                  color: "#fff",
                },
              }}
            >
              Active
            </MenuItem>

            <MenuItem
              value={0}
              sx={{
                "&:hover": {
                  backgroundColor: PurpleThemeColor,
                  color: "#fff",
                },
              }}
            >
              Inactive
            </MenuItem>
          </TextField>

          {/* Buttons */}

          <Box display="flex" justifyContent="flex-end" gap={2}>
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
      </DialogContent>
    </Dialog>
  );
}