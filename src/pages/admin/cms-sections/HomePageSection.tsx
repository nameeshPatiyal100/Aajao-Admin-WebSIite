import { useState, ChangeEvent } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem,
  IconButton,
  Chip,
  Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { ThemeColors } from "../../../theme/themeColor";

interface Property {
  id: number;
  name: string;
}

interface Testimonial {
  id: number;
  name: string;
}

/* Fake selectable data */
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

  const [featureTitle, setFeatureTitle] = useState("");
  const [featureDesc, setFeatureDesc] = useState("");
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);

  const [labelTitle, setLabelTitle] = useState("");
  const [labelDesc, setLabelDesc] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [buttonTitle, setButtonTitle] = useState("");
  const [buttonUrl, setButtonUrl] = useState("");
  const [buttonTarget, setButtonTarget] = useState("_self");

  const [testimonialTitle, setTestimonialTitle] = useState("");
  const [testimonialDesc, setTestimonialDesc] = useState("");
  const [selectedTestimonials, setSelectedTestimonials] = useState<Testimonial[]>([]);

  /* Image Upload */
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = URL.createObjectURL(e.target.files[0]);
      setImage(file);
    }
  };

  const inputStyle = {
    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
      borderColor: ThemeColors.primary,
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: ThemeColors.primary,
    },
  };

  const handleSubmit = () => {
    const payload = {
      featureSection: {
        title: featureTitle,
        description: featureDesc,
        properties: selectedProperties,
      },
      labelSection: {
        title: labelTitle,
        description: labelDesc,
        image,
        buttonTitle,
        buttonUrl,
        buttonTarget,
      },
      testimonialSection: {
        title: testimonialTitle,
        description: testimonialDesc,
        testimonials: selectedTestimonials,
      },
    };

    console.log("Form Data:", payload);
  };

  return (
    <Box p={0}>

      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ color: ThemeColors.primary }}
      >
        Back
      </Button>

      {/* Form Title */}
      <Typography variant="h4" fontWeight={700} mb={4}>
        Home Page CMS Form
      </Typography>

      {/* ================= Feature Section ================= */}
      <Typography variant="h6" fontWeight={600} mb={2}>
        Feature Section
      </Typography>

      <Stack spacing={2} mb={4}>
        <TextField
          label="Title"
          value={featureTitle}
          onChange={(e) => setFeatureTitle(e.target.value)}
          fullWidth
          sx={inputStyle}
        />

        <TextField
          label="Description"
          multiline
          rows={3}
          value={featureDesc}
          onChange={(e) => setFeatureDesc(e.target.value)}
          fullWidth
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
            <TextField {...params} label="Select Properties" sx={inputStyle} />
          )}
        />
      </Stack>

      {/* ================= Label Section ================= */}
      <Typography variant="h6" fontWeight={600} mb={2}>
        Label Section
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

        {/* Image Upload */}
        <Button
          variant="outlined"
          component="label"
          sx={{
            borderColor: ThemeColors.primary,
            color: ThemeColors.primary,
          }}
        >
          Upload Image
          <input hidden type="file" accept="image/*" onChange={handleImageUpload} />
        </Button>

        {image && (
          <Box position="relative" width="200px">
            <img src={image} alt="preview" width="100%" />
            <IconButton
              size="small"
              onClick={() => setImage(null)}
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

        <TextField
          label="Button Title"
          value={buttonTitle}
          onChange={(e) => setButtonTitle(e.target.value)}
          fullWidth
          sx={inputStyle}
        />

        <TextField
          label="Button URL"
          value={buttonUrl}
          onChange={(e) => setButtonUrl(e.target.value)}
          fullWidth
          sx={inputStyle}
        />

        <TextField
          select
          label="Button Opener"
          value={buttonTarget}
          onChange={(e) => setButtonTarget(e.target.value)}
          fullWidth
          sx={inputStyle}
        >
          <MenuItem value="_self">Same Tab</MenuItem>
          <MenuItem value="_blank">New Tab</MenuItem>
        </TextField>
      </Stack>

      {/* ================= Testimonial Section ================= */}
      <Typography variant="h6" fontWeight={600} mb={2}>
        Testimonial Section
      </Typography>

      <Stack spacing={2} mb={4}>
        <TextField
          label="Title"
          value={testimonialTitle}
          onChange={(e) => setTestimonialTitle(e.target.value)}
          fullWidth
          sx={inputStyle}
        />

        <TextField
          label="Description"
          multiline
          rows={3}
          value={testimonialDesc}
          onChange={(e) => setTestimonialDesc(e.target.value)}
          fullWidth
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
            <TextField {...params} label="Select Testimonials" sx={inputStyle} />
          )}
        />
      </Stack>

      {/* Submit */}
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