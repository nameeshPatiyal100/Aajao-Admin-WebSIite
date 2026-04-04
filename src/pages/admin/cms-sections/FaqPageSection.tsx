import { useState, ChangeEvent, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem,
  IconButton,
} from "@mui/material";
import { faqPageSchema } from "../../../validations/admin-validations";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { ThemeColors } from "../../../theme/themeColor";
import * as yup from "yup";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  updateCmsFAQPage,
  getCmsFAQPage,
  resetCmsFAQState,
} from "../../../features/admin/CMS/cmsFAQPageUpdate.slice";

import {
  deleteCmsHomepageImage,
  resetDeleteImage,
} from "../../../features/admin/CMS/cmsHomepageDeleteImage.slice";

import { TableLoader } from "../../../components/admin/common/TableLoader";
import CustomSnackbar from "../../../components/admin/snackbar/CustomSnackbar";

export default function FaqPageSection() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data, loading, fetchLoading, success, error, message } =
    useAppSelector((state) => state.cmsFAQPageUpdate);

  const deleteState = useAppSelector((state) => state.cmsHomepageDeleteImage);

  const [headerTitle, setHeaderTitle] = useState("");
  const [headerDesc, setHeaderDesc] = useState("");
  const [contactTitle, setContactTitle] = useState("");
  const [contactDesc, setContactDesc] = useState("");
  const [contactBtnTitle, setContactBtnTitle] = useState("");
  const [contactBtnUrl, setContactBtnUrl] = useState("");
  const [contactTarget, setContactTarget] = useState("_self");
  const [labelTitle, setLabelTitle] = useState("");
  const [labelDesc, setLabelDesc] = useState("");
  const [labelBtnTitle, setLabelBtnTitle] = useState("");
  const [labelBtnUrl, setLabelBtnUrl] = useState("");
  const [labelTarget, setLabelTarget] = useState("_self");

  const [labelImage, setLabelImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as any,
  });

  const inputStyle = {
    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
      borderColor: "#7B1FA2",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#7B1FA2",
    },
  };

  /* ================= GET ================= */
  useEffect(() => {
    dispatch(getCmsFAQPage(11));
  }, [dispatch]);

  /* ================= SET DATA ================= */
  useEffect(() => {
    if (data) {
      setHeaderTitle(data.headerTitle || "");
      setHeaderDesc(data.headerDesc || "");

      setContactTitle(data.contactTitle || "");
      setContactDesc(data.contactDesc || "");
      setContactBtnTitle(data.contactBtnTitle || "");
      setContactBtnUrl(data.contactBtnUrl || "");
      setContactTarget(data.contactTarget || "_self");

      setLabelTitle(data.labelTitle || "");
      setLabelDesc(data.labelDesc || "");
      setLabelBtnTitle(data.labelBtnTitle || "");
      setLabelBtnUrl(data.labelBtnUrl || "");
      setLabelTarget(data.labelTarget || "_self");

      setPreview(data.labelImage || null);
      setLabelImage(null);
    }
  }, [data]);

  /* ================= UPDATE RESPONSE ================= */
  useEffect(() => {
    if (success) {
      setSnackbar({
        open: true,
        message: message || "Updated successfully",
        severity: "success",
      });
      dispatch(getCmsFAQPage(11));
      dispatch(resetCmsFAQState());
    }

    if (error) {
      setSnackbar({
        open: true,
        message: error,
        severity: "error",
      });
      dispatch(resetCmsFAQState());
    }
  }, [success, error]);

  /* ================= DELETE RESPONSE ================= */
  useEffect(() => {
    if (deleteState.success) {
      setSnackbar({
        open: true,
        message: deleteState.message || "Image deleted",
        severity: "success",
      });
      dispatch(getCmsFAQPage(11));
      dispatch(resetDeleteImage());
    }

    if (deleteState.error) {
      setSnackbar({
        open: true,
        message: deleteState.error,
        severity: "error",
      });
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
    if (labelImage) {
      // Local image remove
      setLabelImage(null);
      setPreview(null);
      setSnackbar({
        open: true,
        message: "Image removed",
        severity: "success",
      });
    } else if (preview) {
      // Backend image delete
      dispatch(
        deleteCmsHomepageImage({
          cp_page_id: 11,
          cp_section_id: 6,
        })
      );
      setPreview(null);
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    try {
      const formValues = {
        headerTitle,
        headerDesc,
        contactTitle,
        contactDesc,
        contactBtnTitle,
        contactBtnUrl,
        labelTitle,
        labelDesc,
        labelBtnTitle,
        labelBtnUrl,
      };

      await faqPageSchema.validate(formValues, { abortEarly: false });
      setErrors({});

      const formData = new FormData();

      formData.append("cp_page_id", "11");

      formData.append("headerTitle", headerTitle);
      formData.append("headerDesc", headerDesc);

      formData.append("contactTitle", contactTitle);
      formData.append("contactDesc", contactDesc);
      formData.append("contactBtnTitle", contactBtnTitle);
      formData.append("contactBtnUrl", contactBtnUrl);
      formData.append("contactTarget", contactTarget);

      formData.append("labelTitle", labelTitle);
      formData.append("labelDesc", labelDesc);
      formData.append("labelBtnTitle", labelBtnTitle);
      formData.append("labelBtnUrl", labelBtnUrl);
      formData.append("labelTarget", labelTarget);

      if (labelImage) {
        formData.append("adminFaqPageimage", labelImage);
      }

      dispatch(updateCmsFAQPage(formData));
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
  if (fetchLoading) {
    return <TableLoader text="Loading FAQ CMS..." />;
  }

  return (
    <Box position="relative">
      {(loading || deleteState.loading) && (
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(255,255,255,0.5)",
            zIndex: 10,
          }}
        >
          <TableLoader text="Processing..." />
        </Box>
      )}

      {/* Header */}
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ color: ThemeColors.primary }}
        >
          FAQ Page
        </Typography>

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ color: "#7B1FA2" }}
        >
          Back
        </Button>
      </Box>

      {/* ================= FAQ Header ================= */}
      <Typography
        variant="h6"
        fontWeight={600}
        mb={2}
        sx={{ color: ThemeColors.primary }}
      >
        FAQ Header
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
          rows={3}
          value={headerDesc}
          onChange={(e) => setHeaderDesc(e.target.value)}
          error={!!errors.headerDesc}
          helperText={errors.headerDesc}
          fullWidth
          sx={inputStyle}
        />
      </Stack>

      {/* ================= FAQ Contact ================= */}
      <Typography
        variant="h6"
        fontWeight={600}
        mb={2}
        sx={{ color: ThemeColors.primary }}
      >
        FAQ Contact
      </Typography>

      <Stack spacing={2} mb={4}>
        <TextField
          label="Title"
          value={contactTitle}
          onChange={(e) => setContactTitle(e.target.value)}
          fullWidth
          sx={inputStyle}
        />
        <TextField
          label="Description"
          multiline
          rows={3}
          value={contactDesc}
          onChange={(e) => setContactDesc(e.target.value)}
          fullWidth
          sx={inputStyle}
        />
        <TextField
          label="Button Title"
          value={contactBtnTitle}
          onChange={(e) => setContactBtnTitle(e.target.value)}
          fullWidth
          sx={inputStyle}
        />
        <TextField
          label="Button URL"
          value={contactBtnUrl}
          onChange={(e) => setContactBtnUrl(e.target.value)}
          fullWidth
          sx={inputStyle}
        />
        <TextField
          select
          label="Open In"
          value={contactTarget}
          onChange={(e) => setContactTarget(e.target.value)}
          fullWidth
          sx={inputStyle}
        >
          <MenuItem value="_self">Same Window</MenuItem>
          <MenuItem value="_blank">New Window</MenuItem>
        </TextField>
      </Stack>

      {/* ================= FAQ Label ================= */}
      <Typography
        variant="h6"
        fontWeight={600}
        mb={2}
        sx={{ color: ThemeColors.primary }}
      >
        FAQ Label
      </Typography>

      <Stack spacing={2} mb={4}>
        <TextField
          label="Title"
          value={labelTitle}
          onChange={(e) => setLabelTitle(e.target.value)}
          fullWidth
          sx={inputStyle}
        />
        <TextField
          label="Description"
          multiline
          rows={3}
          value={labelDesc}
          onChange={(e) => setLabelDesc(e.target.value)}
          fullWidth
          sx={inputStyle}
        />
        <TextField
          label="Button Title"
          value={labelBtnTitle}
          onChange={(e) => setLabelBtnTitle(e.target.value)}
          fullWidth
          sx={inputStyle}
        />
        <TextField
          label="Button URL"
          value={labelBtnUrl}
          onChange={(e) => setLabelBtnUrl(e.target.value)}
          fullWidth
          sx={inputStyle}
        />
        <TextField
          select
          label="Open In"
          value={labelTarget}
          onChange={(e) => setLabelTarget(e.target.value)}
          fullWidth
          sx={inputStyle}
        >
          <MenuItem value="_self">Same Window</MenuItem>
          <MenuItem value="_blank">New Window</MenuItem>
        </TextField>

        <Button
          variant="outlined"
          component="label"
          sx={{ borderColor: "#7B1FA2", color: "#7B1FA2" }}
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
        sx={{ backgroundColor: "#7B1FA2", px: 4 }}
      >
        Submit
      </Button>

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Box>
  );
}
