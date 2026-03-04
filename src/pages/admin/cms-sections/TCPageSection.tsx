import { useState, ChangeEvent } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { tcPageSchema } from "../../../validations/admin-validations";

export default function TCPageSection() {
  const navigate = useNavigate();

  const [headerTitle, setHeaderTitle] = useState("");
  const [headerDesc, setHeaderDesc] = useState("");

  /* Label Section */
  const [labelTitle, setLabelTitle] = useState("");
  const [labelDesc, setLabelDesc] = useState("");
  const [labelImage, setLabelImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const inputStyle = {
    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
      borderColor: "#881f9b",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#881f9b",
    },
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLabelImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async () => {
    try {
      const formValues = {
        headerTitle,
        headerDesc,
        labelTitle,
        labelDesc,
      };

      await tcPageSchema.validate(formValues, { abortEarly: false });
      setErrors({});

      const formData = new FormData();

      formData.append("headerTitle", headerTitle);
      formData.append("headerDesc", headerDesc);
      formData.append("labelTitle", labelTitle);
      formData.append("labelDesc", labelDesc);

      if (labelImage) {
        formData.append("labelImage", labelImage);
      }

      console.log("===== TC FormData Output =====");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const formattedErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) {
            formattedErrors[error.path] = error.message;
          }
        });
        setErrors(formattedErrors);
      }
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Typography variant="h4" fontWeight={700} sx={{ color: "#881f9b" }}>
          Term & Condition CMS Page
        </Typography>

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ color: "#881f9b" }}
        >
          Back
        </Button>
      </Box>
      <Typography
        variant="h6"
        fontWeight={600}
        mb={2}
        sx={{ color: "#881f9b" }}
      >
        Header Section
      </Typography>

      <Stack spacing={2} mb={4}>
        <TextField
          label="Title"
          value={headerTitle}
          onChange={(e) => setHeaderTitle(e.target.value)}
          error={!!errors.headerTitle}
          helperText={errors.headerTitle}
          fullWidth
          sx={inputStyle}
        />
        <TextField
          label="Description"
          multiline
          rows={4}
          value={headerDesc}
          onChange={(e) => setHeaderDesc(e.target.value)}
          error={!!errors.headerDesc}
          helperText={errors.headerDesc}
          fullWidth
          sx={inputStyle}
        />
      </Stack>
      <Typography
        variant="h6"
        fontWeight={600}
        mb={2}
        sx={{ color: "#881f9b" }}
      >
        Label Section
      </Typography>
      <Stack spacing={2} mb={4}>
        <TextField
          label="Title"
          value={labelTitle}
          onChange={(e) => setLabelTitle(e.target.value)}
          error={!!errors.labelTitle}
          helperText={errors.labelTitle}
          fullWidth
          sx={inputStyle}
        />
        <TextField
          label="Description"
          multiline
          rows={4}
          value={labelDesc}
          onChange={(e) => setLabelDesc(e.target.value)}
          error={!!errors.labelDesc}
          helperText={errors.labelDesc}
          fullWidth
          sx={inputStyle}
        />
        <Button
          variant="outlined"
          component="label"
          sx={{ borderColor: "#881f9b", color: "#881f9b" }}
        >
          Upload Image
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </Button>

        {preview && (
          <Box position="relative" width="200px">
            <img src={preview} alt="preview" width="100%" />
            <IconButton
              size="small"
              onClick={() => {
                setLabelImage(null);
                setPreview(null);
              }}
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                backgroundColor: "#fff",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        )}
      </Stack>
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          backgroundColor: "#881f9b",
          px: 4,
        }}
      >
        Submit
      </Button>
    </Box>
  );
}
