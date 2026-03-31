import { useState, ChangeEvent, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem,
  Chip,
  Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { ThemeColors } from "../../../theme/themeColor";
import { homePageSchema } from "../../../validations/admin-validations";
import * as yup from "yup";

/* ✅ RTK */
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  fetchProperties,
  fetchTestimonials,
} from "../../../features/admin/CMS/propDDhomepageCms.slice";

interface Property {
  id: number;
  name: string;
}

interface Testimonial {
  id: number;
  name: string;
}

export default function HomePageSection() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  /* ================= RTK STATE ================= */

  const {
    properties,
    testimonials,
    propertyLoading,
    testimonialLoading,
  } = useAppSelector((state) => state.propDDhomepageCms);

  const [propertyInput, setPropertyInput] = useState("");
  const [testimonialInput, setTestimonialInput] = useState("");

  /* ================= STATE ================= */

  const [featureTitle, setFeatureTitle] = useState("");
  const [featureDesc, setFeatureDesc] = useState("");
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
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

  /* ================= API CALLS ================= */

  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(fetchProperties(propertyInput));
    }, 500);
    return () => clearTimeout(delay);
  }, [propertyInput]);

  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(fetchTestimonials(testimonialInput));
    }, 500);
    return () => clearTimeout(delay);
  }, [testimonialInput]);

  /* ================= IMAGE ================= */

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
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
      formData.append(
        "testimonials",
        JSON.stringify(selectedTestimonials)
      );

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
      {/* Spinner animation */}
      <style>
        {`@keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }`}
      </style>

      {/* Back Button */}
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

        {/* ✅ PROPERTY DROPDOWN */}
        <Autocomplete
          multiple
          options={properties}
          getOptionLabel={(option) => option.name}
          value={selectedProperties}
          loading={propertyLoading}
          isOptionEqualToValue={(o, v) => o.id === v.id}
          onChange={(_, value) => setSelectedProperties(value)}
          onInputChange={(_, value) => setPropertyInput(value)}
          ListboxProps={{
            style: { maxHeight: 200, overflow: "auto" },
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                label={option.name}
                deleteIcon={<CloseIcon />}
                sx={{
                  backgroundColor: ThemeColors.primary,
                  color: "#fff",
                }}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Properties"
              sx={inputStyle}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {propertyLoading && (
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          border: `2px solid ${ThemeColors.primary}`,
                          borderTop: "2px solid transparent",
                          borderRadius: "50%",
                          animation: "spin 1s linear infinite",
                          mr: 1,
                        }}
                      />
                    )}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
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
            width: "fit-content",
          }}
        >
          Upload Image
          <input hidden type="file" onChange={handleImageUpload} />
        </Button>

        {imagePreview && (
          <Box position="relative" width={200} height={150} mt={2}>
            <img
              src={imagePreview}
              alt="preview"
              style={{ width: "100%", height: "100%" }}
            />
            <Box
              position="absolute"
              top={5}
              right={5}
              onClick={handleRemoveImage}
            >
              <CloseIcon />
            </Box>
          </Box>
        )}

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

      {/* ================= TESTIMONIAL ================= */}
      <Autocomplete
        multiple
        options={testimonials}
        getOptionLabel={(option) => option.name}
        value={selectedTestimonials}
        loading={testimonialLoading}
        isOptionEqualToValue={(o, v) => o.id === v.id}
        onChange={(_, value) => setSelectedTestimonials(value)}
        onInputChange={(_, value) => setTestimonialInput(value)}
        ListboxProps={{
          style: { maxHeight: 200, overflow: "auto" },
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              label={option.name}
              deleteIcon={<CloseIcon />}
              sx={{
                backgroundColor: ThemeColors.primary,
                color: "#fff",
              }}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Testimonials"
            sx={inputStyle}
          />
        )}
      />

      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
}