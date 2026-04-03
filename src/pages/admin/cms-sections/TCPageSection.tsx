import { useState, ChangeEvent, useEffect } from "react";
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

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  getCmsTCPage,
  updateCmsTCPage,
  resetCmsTCState,
} from "../../../features/admin/CMS/cmsTCPageUpdate.slice";

import {
  deleteCmsHomepageImage,
  resetDeleteImage,
} from "../../../features/admin/CMS/cmsHomepageDeleteImage.slice";

import { TableLoader } from "../../../components/admin/common/TableLoader";
import CustomSnackbar from "../../../components/admin/snackbar/CustomSnackbar";

export default function TCPageSection() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loading, success, error, message, data, fetchLoading } =
    useAppSelector((state) => state.cmsTCPageUpdate);

  const deleteState = useAppSelector((state) => state.cmsHomepageDeleteImage);

  const cp_page_id = 12;
  const cp_section_id = 8;

  const [headerTitle, setHeaderTitle] = useState("");
  const [headerDesc, setHeaderDesc] = useState("");
  const [labelTitle, setLabelTitle] = useState("");
  const [labelDesc, setLabelDesc] = useState("");
  const [labelImage, setLabelImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarType, setSnackbarType] = useState<"success" | "error">(
    "success"
  );

  const inputStyle = {
    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
      borderColor: "#881f9b",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#881f9b",
    },
  };

  /* ================= GET ================= */
  useEffect(() => {
    dispatch(getCmsTCPage(cp_page_id));
  }, [dispatch]);

  /* ================= PREFILL ================= */
  useEffect(() => {
    if (data) {
      setHeaderTitle(data.headerTitle || "");
      setHeaderDesc(data.headerDesc || "");
      setLabelTitle(data.labelTitle || "");
      setLabelDesc(data.labelDesc || "");
      setPreview(data.labelImage || null);
      setLabelImage(null); // important reset
    }
  }, [data]);

  /* ================= UPDATE RESPONSE ================= */
  useEffect(() => {
    if (success) {
      setSnackbarOpen(true);
      setSnackbarMsg(message || "Updated successfully");
      setSnackbarType("success");

      dispatch(getCmsTCPage(cp_page_id));
      dispatch(resetCmsTCState());
    }

    if (error) {
      setSnackbarOpen(true);
      setSnackbarMsg(error);
      setSnackbarType("error");

      dispatch(resetCmsTCState());
    }
  }, [success, error]);

  /* ================= DELETE RESPONSE ================= */
  useEffect(() => {
    if (deleteState.success) {
      setSnackbarOpen(true);
      setSnackbarMsg(deleteState.message || "Image deleted");
      setSnackbarType("success");

      setPreview(null);
      setLabelImage(null);

      dispatch(getCmsTCPage(cp_page_id));
      dispatch(resetDeleteImage());
    }

    if (deleteState.error) {
      setSnackbarOpen(true);
      setSnackbarMsg(deleteState.error);
      setSnackbarType("error");

      dispatch(resetDeleteImage());
    }
  }, [deleteState.success, deleteState.error]);

  /* ================= IMAGE UPLOAD ================= */
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLabelImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  /* ================= DELETE IMAGE ================= */
  const handleDeleteImage = () => {
    // LOCAL IMAGE (not uploaded yet)
    if (labelImage) {
      setLabelImage(null);
      setPreview(null);

      setSnackbarOpen(true);
      setSnackbarMsg("Image removed");
      setSnackbarType("success");
      return;
    }

    // SERVER IMAGE
    if (preview) {
      dispatch(
        deleteCmsHomepageImage({
          cp_page_id,
          cp_section_id,
        })
      );
    }
  };

  /* ================= SUBMIT ================= */
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

      formData.append("cp_page_id", String(cp_page_id));
      formData.append("headerTitle", headerTitle);
      formData.append("headerDesc", headerDesc);
      formData.append("labelTitle", labelTitle);
      formData.append("labelDesc", labelDesc);

      if (labelImage) {
        formData.append("adminTCPageimage", labelImage);
      }

      dispatch(updateCmsTCPage(formData));
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

  /* ================= LOADER ================= */
  if (fetchLoading || loading || deleteState.loading) {
    return <TableLoader text="Processing..." />;
  }

  return (
    <Box>
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMsg}
        severity={snackbarType}
        onClose={() => setSnackbarOpen(false)}
      />

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

      {/* HEADER */}
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

      {/* LABEL */}
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
              onClick={handleDeleteImage}
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
