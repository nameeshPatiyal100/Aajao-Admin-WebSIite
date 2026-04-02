import { useState, ChangeEvent, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Chip,
  Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { ThemeColors } from "../../../theme/themeColor";
import { homePageSchema } from "../../../validations/admin-validations";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  fetchProperties,
  fetchTestimonials,
} from "../../../features/admin/CMS/propDDhomepageCms.slice";
import { fetchCmsHomePage } from "../../../features/admin/CMS/cmsPageHomepage.slice";
import { updateCmsHomePage } from "../../../features/admin/CMS/cmsHomepageUpdate.slice";
import CustomSnackbar from "../../../components/admin/snackbar/CustomSnackbar";
import { deleteCmsHomepageImage } from "../../../features/admin/CMS/cmsHomepageDeleteImage.slice";
import { TableLoader } from "../../../components/admin/common/TableLoader";

interface Property {
  id: number;
  name: string;
};

interface Testimonial {
  id: number;
  name: string;
};

export default function HomePageSection() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { properties, testimonials, propertyLoading, testimonialLoading } =
    useAppSelector((state) => state.propDDhomepageCms);
  const { data: cmsData, loading: cmsLoading } = useAppSelector(
    (state) => state.cmsPageHomepage
  );

  const [propertyInput, setPropertyInput] = useState("");
  const [testimonialInput, setTestimonialInput] = useState("");

  const {
    loading: updateLoading,
    success,
    error,
    message,
  } = useAppSelector((state) => state.cmsHomepageUpdate);
  const {
    loading: deleteLoading,
    success: deleteSuccess,
    error: deleteError,
    message: deleteMessage,
  } = useAppSelector((state) => state.cmsHomepageDeleteImage);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarType, setSnackbarType] = useState<"success" | "error">(
    "success"
  );

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
  const [isLocalImage, setIsLocalImage] = useState(false);
  const [testimonialTitle, setTestimonialTitle] = useState("");
  const [testimonialDesc, setTestimonialDesc] = useState("");
  const [selectedTestimonials, setSelectedTestimonials] = useState<
    Testimonial[]
  >([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    dispatch(fetchCmsHomePage(10));
  }, []);

  useEffect(() => {
    if (cmsData) {
      setFeatureTitle(cmsData.featureTitle);
      setFeatureDesc(cmsData.featureDesc);
      setSelectedProperties(
        cmsData.selectedProperties
          .filter((item: any) => item.name !== null)
          .map((item: any) => ({ id: item.id, name: item.name as string }))
      );

      setLabelTitle(cmsData.labelTitle);
      setLabelDesc(cmsData.labelDesc);
      setImagePreview(cmsData.image);

      setButtonTitle(cmsData.buttonTitle);
      setButtonUrl(cmsData.buttonUrl);
      setButtonTarget(cmsData.buttonTarget);

      setTestimonialTitle(cmsData.testimonialTitle);
      setTestimonialDesc(cmsData.testimonialDesc);
      setSelectedTestimonials(
        cmsData.selectedTestimonials
          .filter((item: any) => item.name !== null)
          .map((item: any) => ({ id: item.id, name: item.name as string }))
      );
    }
  }, [cmsData]);

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
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
  
      setImage(file);
      setImagePreview(cmsData?.image || URL.createObjectURL(file));
      setIsLocalImage(false); 
    }
  };

  const handleRemoveImage = async () => {
    try {
      if (isLocalImage) {
        setImage(null);
        setImagePreview(null);
        setIsLocalImage(false);
        return;
      }
      await dispatch(
        deleteCmsHomepageImage({
          cp_page_id: 10,
          cp_section_id: 2,
        })
      ).unwrap();
  
      setImage(null);
      setImagePreview(null);
  
    } catch (err) {
      console.error(err);
    }
  };
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

      formData.append("cp_page_id", "10");
      formData.append("featureTitle", featureTitle);
      formData.append("featureDesc", featureDesc);
      const propertyIds = selectedProperties.map((item) => item.id);
      formData.append("properties", JSON.stringify(propertyIds));

      formData.append("labelTitle", labelTitle);
      formData.append("labelDesc", labelDesc);
      if (image) formData.append("image", image);

      formData.append("buttonTitle", buttonTitle);
      formData.append("buttonUrl", buttonUrl);
      formData.append("buttonTarget", buttonTarget);

      formData.append("testimonialTitle", testimonialTitle);
      formData.append("testimonialDesc", testimonialDesc);
      const testimonialIds = selectedTestimonials.map((item) => item.id);
      formData.append("testimonials", JSON.stringify(testimonialIds));
      await dispatch(updateCmsHomePage(formData)).unwrap();
    } catch (err: any) {
      if (err instanceof yup.ValidationError) {
        const formattedErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) {
            formattedErrors[error.path] = error.message;
          }
        });
        setErrors(formattedErrors);
      } else {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (success) {
      setSnackbarMsg(message || "Updated Successfully");
      setSnackbarType("success");
      setSnackbarOpen(true);
      dispatch(fetchCmsHomePage(10));
    }

    if (error) {
      setSnackbarMsg(error);
      setSnackbarType("error");
      setSnackbarOpen(true);
    }
  }, [success, error]);
  useEffect(() => {
    if (deleteSuccess) {
      setSnackbarMsg(deleteMessage || "Image deleted successfully");
      setSnackbarType("success");
      setSnackbarOpen(true);

      dispatch(fetchCmsHomePage(10));
    }
  
    if (deleteError) {
      setSnackbarMsg(deleteError);
      setSnackbarType("error");
      setSnackbarOpen(true);
    }
  }, [deleteSuccess, deleteError]);

  const inputStyle = {
    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
      borderColor: ThemeColors.primary,
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: ThemeColors.primary,
    },
  };

  if (cmsLoading || updateLoading || deleteLoading) {
    return <TableLoader />;
  }
  return (
    <>
      <Box p={0}>
        <style>
          {`@keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }`}
        </style>

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
              />
            )}
          />
        </Stack>

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
        </Stack>

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

        {/* ✅ ONLY CHANGE */}
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            mt: 4,
            backgroundColor: ThemeColors.primary,
            "&:hover": { backgroundColor: ThemeColors.primary },
          }}
        >
          Submit
        </Button>
      </Box>

      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMsg}
        severity={snackbarType}
        onClose={() => setSnackbarOpen(false)}
      />
    </>
  );
}
