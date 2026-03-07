import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Modal from "react-modal";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { PageRecord } from "./types";

interface Props {
  open: boolean;
  handleClose: () => void;
  selectedPage: PageRecord | null;
  handleSubmit: (updatedData: PageRecord) => void;
  ThemeColors: any;
}

Modal.setAppElement("#root");

export default function PageEditModal({
  open,
  handleClose,
  selectedPage,
  handleSubmit,
  ThemeColors,
}: Props) {
  const [formData, setFormData] = useState<PageRecord | null>(null);

  useEffect(() => {
    if (selectedPage) {
      setFormData(selectedPage);
    }
  }, [selectedPage]);

  if (!formData) return null;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) =>
      prev
        ? {
            ...prev,
            [name]: name === "status" ? Number(value) : value,
          }
        : prev
    );
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData) {
      handleSubmit(formData);
    }
  };

  /* Purple focus style for all fields */
  const inputFocusStyle = {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: ThemeColors.primary,
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: ThemeColors.primary,
    },
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={handleClose}
      style={{
        content: {
          maxWidth: "460px",
          margin: "auto",
          borderRadius: "12px",
          padding: "20px",
          height: "auto",
          inset: "40px",
        },
        overlay: {
          backgroundColor: "rgba(0,0,0,0.5)",
        },
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight={700}>
          Edit Page
        </Typography>

        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Form */}
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          {/* Title */}
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
            sx={inputFocusStyle}
          />

          {/* Slug */}
          <TextField
            label="Slug"
            name="slug"
            value={formData.slug}
            fullWidth
            disabled
            sx={inputFocusStyle}
          />

          {/* Status */}
          <TextField
            select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            fullWidth
            sx={inputFocusStyle}
          >
            <MenuItem value={0}>Draft</MenuItem>
            <MenuItem value={1}>Publish</MenuItem>
          </TextField>

          {/* URL */}
          <TextField
            label="URL"
            name="url"
            value={formData.url}
            onChange={handleChange}
            fullWidth
            required
            sx={inputFocusStyle}
          />

          {/* Buttons */}
          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
            mt={2}
          >
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                borderColor: ThemeColors.primary,
                color: ThemeColors.primary,
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: ThemeColors.primary,
                "&:hover": {
                  backgroundColor: ThemeColors.primary,
                },
              }}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
    </Modal>
  );
}