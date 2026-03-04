import { useState, ChangeEvent } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem,
  // IconButton,
  Chip,
  Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { ThemeColors } from "../../../theme/themeColor";
import { homePageSchema } from "../../../validations/admin-validations";
import * as yup from "yup";

interface Property {
  id: number;
  name: string;
}

interface Testimonial {
  id: number;
  name: string;
}

const fakeProperties: Property[] = [
  { id: 1, name: "Villa Sunset" },
  { id: 2, name: "Ocean View Apartment" },
  { id: 3, name: "City Center Flat" },
];

const fakeTestimonials: Testimonial[] = [
  { id: 1, name: "John Review" },
  { id: 2, name: "Emily Review" },
  { id: 3, name: "David Review" },
];

export default function HomePageSection() {
  const navigate = useNavigate();

  /* ================= STATE ================= */

  const [featureTitle, setFeatureTitle] = useState("");
  const [featureDesc, setFeatureDesc] = useState("");
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);

  const [labelTitle, setLabelTitle] = useState("");
  const [labelDesc, setLabelDesc] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [buttonTitle, setButtonTitle] = useState("");
  const [buttonUrl, setButtonUrl] = useState("");
  const [buttonTarget, setButtonTarget] = useState("_self");

  const [testimonialTitle, setTestimonialTitle] = useState("");
  const [testimonialDesc, setTestimonialDesc] = useState("");
  const [selectedTestimonials, setSelectedTestimonials] = useState<
    Testimonial[]
  >([]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  /* ================= IMAGE ================= */

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]); // store actual file for formData
    }
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    try {
      const validationData = {
        featureTitle,
        featureDesc,
        labelTitle,
        labelDesc,
        testimonialTitle,
        testimonialDesc,
      };

      await homePageSchema.validate(validationData, {
        abortEarly: false,
      });

      setErrors({});

      /* ✅ Create FormData */
      const formData = new FormData();

      formData.append("featureTitle", featureTitle);
      formData.append("featureDesc", featureDesc);
      formData.append("properties", JSON.stringify(selectedProperties));

      formData.append("labelTitle", labelTitle);
      formData.append("labelDesc", labelDesc);
      if (image) formData.append("image", image);
      formData.append("buttonTitle", buttonTitle);
      formData.append("buttonUrl", buttonUrl);
      formData.append("buttonTarget", buttonTarget);

      formData.append("testimonialTitle", testimonialTitle);
      formData.append("testimonialDesc", testimonialDesc);
      formData.append("testimonials", JSON.stringify(selectedTestimonials));

      /* 🔥 Log FormData Properly */
      console.log("=== FORM DATA ===");
      for (const pair of formData.entries()) {
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

  /* ================= STYLES ================= */

  const inputStyle = {
    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
      borderColor: ThemeColors.primary,
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: ThemeColors.primary,
    },
  };

  return (
    <Box p={0}>
      {/* Back Button Right */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ color: ThemeColors.primary }}
        >
          Back
        </Button>
      </Box>

      <Typography
        variant="h4"
        fontWeight={700}
        mb={4}
        sx={{ color: ThemeColors.primary }}
      >
        Home Page CMS Form
      </Typography>

      {/* ================= Feature Section ================= */}
      <Typography variant="h6" mb={2} sx={{ color: ThemeColors.primary }}>
        Feature Section
      </Typography>

      <Stack spacing={2} mb={4}>
        <TextField
          label="Title"
          value={featureTitle}
          onChange={(e) => setFeatureTitle(e.target.value)}
          error={!!errors.featureTitle}
          helperText={errors.featureTitle}
          sx={inputStyle}
        />

        <TextField
          label="Description"
          multiline
          rows={3}
          value={featureDesc}
          onChange={(e) => setFeatureDesc(e.target.value)}
          error={!!errors.featureDesc}
          helperText={errors.featureDesc}
          sx={inputStyle}
        />

        <Autocomplete
          multiple
          options={fakeProperties}
          getOptionLabel={(option) => option.name}
          value={selectedProperties}
          onChange={(_, value) => setSelectedProperties(value)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                label={option.name}
                deleteIcon={<CloseIcon />}
              />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} label="Select Properties" />
          )}
        />
      </Stack>

      {/* ================= Label Section ================= */}
      <Typography variant="h6" mb={2} sx={{ color: ThemeColors.primary }}>
        Label Section
      </Typography>

      <Stack spacing={2} mb={4}>
        <TextField
          label="Title"
          value={labelTitle}
          onChange={(e) => setLabelTitle(e.target.value)}
          error={!!errors.labelTitle}
          helperText={errors.labelTitle}
          sx={inputStyle}
        />

        <TextField
          label="Description"
          multiline
          rows={3}
          value={labelDesc}
          onChange={(e) => setLabelDesc(e.target.value)}
          error={!!errors.labelDesc}
          helperText={errors.labelDesc}
          sx={inputStyle}
        />

        <Button
          variant="outlined"
          component="label"
          sx={{
            borderColor: ThemeColors.primary,
            color: ThemeColors.primary,
          }}
        >
          Upload Image
          <input hidden type="file" onChange={handleImageUpload} />
        </Button>

        <TextField
          label="Button Title"
          value={buttonTitle}
          onChange={(e) => setButtonTitle(e.target.value)}
          sx={inputStyle}
        />

        <TextField
          label="Button URL"
          value={buttonUrl}
          onChange={(e) => setButtonUrl(e.target.value)}
          sx={inputStyle}
        />

        <TextField
          select
          label="Button Opener"
          value={buttonTarget}
          onChange={(e) => setButtonTarget(e.target.value)}
          sx={inputStyle}
        >
          <MenuItem value="_self">Same Tab</MenuItem>
          <MenuItem value="_blank">New Tab</MenuItem>
        </TextField>
      </Stack>

      {/* ================= Testimonial Section ================= */}
      <Typography variant="h6" mb={2} sx={{ color: ThemeColors.primary }}>
        Testimonial Section
      </Typography>

      <Stack spacing={2} mb={4}>
        <TextField
          label="Title"
          value={testimonialTitle}
          onChange={(e) => setTestimonialTitle(e.target.value)}
          error={!!errors.testimonialTitle}
          helperText={errors.testimonialTitle}
          sx={inputStyle}
        />

        <TextField
          label="Description"
          multiline
          rows={3}
          value={testimonialDesc}
          onChange={(e) => setTestimonialDesc(e.target.value)}
          error={!!errors.testimonialDesc}
          helperText={errors.testimonialDesc}
          sx={inputStyle}
        />

        <Autocomplete
          multiple
          options={fakeTestimonials}
          getOptionLabel={(option) => option.name}
          value={selectedTestimonials}
          onChange={(_, value) => setSelectedTestimonials(value)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                label={option.name}
                deleteIcon={<CloseIcon />}
              />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} label="Select Testimonials" />
          )}
          sx={inputStyle}
        />
      </Stack>

      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          backgroundColor: ThemeColors.primary,
          px: 4,
        }}
      >
        Submit
      </Button>
    </Box>
  );
}
