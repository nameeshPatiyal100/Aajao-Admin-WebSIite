// "use client"

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  // Grid,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Typography,
  Paper,
  Box,
  Chip,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Button,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Home,
  LocationOn,
  AttachMoney,
  ContactPhone,
  Email,
  Schedule,
  PhotoCamera,
  Business,
  Person,
  Description,
  Category,
  LocalOffer,
  Widgets,
  Close,
} from "@mui/icons-material";
// import Grid from "@mui/material/Unstable_Grid2";
// import Grid from "@mui/material/Unstable_Grid2";
import Grid from "@mui/material/Grid";


// import Grid from "@mui/material/Grid";

const cities = ["New York", "London", "Paris", "Tokyo", "Mumbai", "Dubai"];
const states = [
  "California",
  "Texas",
  "Florida",
  "New York",
  "Nevada",
  "Washington",
];
const categories = [
  "Apartment",
  "Villa",
  "Studio",
  "Penthouse",
  "Townhouse",
  "Condo",
];
const tags = [
  "Beachfront",
  "Mountain View",
  "City Center",
  "Luxury",
  "Modern",
  "Historic",
];
const amenities = [
  "WiFi",
  "Parking",
  "Pool",
  "Gym",
  "Spa",
  "Concierge",
  "Pet Care",
  "Garden",
];

const FormSection = styled(Paper)(({ }) => ({
  padding: "24px",
  marginBottom: "20px",
  borderRadius: "16px",
  background: "linear-gradient(145deg, #ffffff 0%, #fefefe 100%)",
  border: "1px solid rgba(139, 69, 193, 0.08)",
  boxShadow: "0 4px 12px rgba(139, 69, 193, 0.06)",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    background: "linear-gradient(90deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)",
    borderRadius: "16px 16px 0 0",
  },
}));

const SectionTitle = styled(Typography)(({ }) => ({
  fontWeight: 700,
  fontSize: "1.25rem",
  color: "#1f2937",
  marginBottom: "20px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
}));

const StyledTextField = styled(TextField)(({ }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "rgba(139, 69, 193, 0.02)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      backgroundColor: "rgba(139, 69, 193, 0.04)",
    },
    "&.Mui-focused": {
      backgroundColor: "rgba(139, 69, 193, 0.06)",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#7c3aed",
        borderWidth: "2px",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(139, 69, 193, 0.2)",
      transition: "all 0.3s ease",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#6b7280",
    fontWeight: 500,
    "&.Mui-focused": {
      color: "#7c3aed",
      fontWeight: 600,
    },
  },
  "& .MuiInputAdornment-root .MuiSvgIcon-root": {
    color: "#a855f7",
  },
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ }) => ({
  margin: "8px 16px 8px 0",
  padding: "8px 16px",
  borderRadius: "12px",
  backgroundColor: "rgba(139, 69, 193, 0.03)",
  border: "1px solid rgba(139, 69, 193, 0.1)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    backgroundColor: "rgba(139, 69, 193, 0.08)",
    transform: "translateY(-1px)",
  },
  "& .MuiCheckbox-root": {
    color: "#a855f7",
    "&.Mui-checked": {
      color: "#7c3aed",
    },
  },
  "& .MuiFormControlLabel-label": {
    fontWeight: 500,
    color: "#374151",
  },
}));

const ImageUploadBox = styled(Box)(({ }) => ({
  border: "2px dashed rgba(139, 69, 193, 0.3)",
  borderRadius: "16px",
  padding: "32px 24px",
  textAlign: "center",
  backgroundColor: "rgba(139, 69, 193, 0.02)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  "&:hover": {
    borderColor: "#7c3aed",
    backgroundColor: "rgba(139, 69, 193, 0.06)",
    transform: "translateY(-2px)",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "3rem",
    color: "#a855f7",
    marginBottom: "12px",
  },
}));

const StyledDialog = styled(Dialog)(({ }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "20px",
    maxWidth: "1200px",
    width: "95vw",
    maxHeight: "90vh",
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ }) => ({
  background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
  color: "white",
  fontWeight: 700,
  fontSize: "1.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: "20px 20px 0 0",
}));

interface PropertyFormData {
  hostName: string;
  propertyName: string;
  propertyAddress: string;
  longitude: string;
  latitude: string;
  propertyDescription: string;
  price: string;
  minPrice: string;
  weeklyMinPrice: string;
  weeklyMaxPrice: string;
  monthlySecurityPrice: string;
  city: string;
  state: string;
  contactNumber: string;
  email: string;
  categories: string[];
  tags: string[];
  amenities: string[];
  status: string;
  luxury: boolean;
  petFriendly: boolean;
  smokingAllowed: boolean;
  inTime: string;
  outTime: string;
  images: FileList | null;
  coverImage: FileList | null;
}

interface PropertyModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: Partial<PropertyFormData>) => void;
}

const PropertyModal: React.FC<PropertyModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Partial<PropertyFormData>>({
    categories: [],
    tags: [],
    amenities: [],
    luxury: false,
    petFriendly: false,
    smokingAllowed: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files : value,
    }));
  };

  const handleSelectChange = (name: string) => (e: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    onSubmit?.(formData);
    onClose();
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        borderRadius: "12px",
      },
    },
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth={false}>
      <StyledDialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Home />
          Property Information
        </Box>
        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <Close />
        </IconButton>
      </StyledDialogTitle>

      <DialogContent
        sx={{ padding: "20px", maxHeight: "70vh", overflowY: "auto" }}
      >
        <FormSection elevation={0}>
          <SectionTitle>
            <Person />
            Host & Property Information
          </SectionTitle>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                <StyledTextField
                  fullWidth
                  label="Host Name"
                  name="hostName"
                  value={formData.hostName || ""}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Property Name"
                name="propertyName"
                value={formData.propertyName || ""}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Home />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Property Address"
                name="propertyAddress"
                value={formData.propertyAddress || ""}
                multiline
                rows={3}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ alignSelf: "flex-start", mt: 1 }}
                    >
                      <LocationOn />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <StyledTextField
                fullWidth
                type="number"
                label="Longitude"
                name="longitude"
                value={formData.longitude || ""}
                onChange={handleChange}
                inputProps={{ step: "any" }}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <StyledTextField
                fullWidth
                type="number"
                label="Latitude"
                name="latitude"
                value={formData.latitude || ""}
                onChange={handleChange}
                inputProps={{ step: "any" }}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <StyledTextField
                select
                fullWidth
                label="City"
                name="city"
                value={formData.city || ""}
                onChange={handleChange}
              >
                {cities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </StyledTextField>
            </Grid>
            <Grid item xs={6} md={3}>
              <StyledTextField
                select
                fullWidth
                label="State"
                name="state"
                value={formData.state || ""}
                onChange={handleChange}
              >
                {states.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </StyledTextField>
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                label="Property Description"
                name="propertyDescription"
                value={formData.propertyDescription || ""}
                multiline
                rows={4}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ alignSelf: "flex-start", mt: 1 }}
                    >
                      <Description />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </FormSection>

        {/* Pricing Information */}
        <FormSection elevation={0}>
          <SectionTitle>
            <AttachMoney />
            Pricing Information
          </SectionTitle>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <StyledTextField
                fullWidth
                type="number"
                label="Base Price (per night)"
                name="price"
                value={formData.price || ""}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledTextField
                fullWidth
                type="number"
                label="Minimum Price"
                name="minPrice"
                value={formData.minPrice || ""}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledTextField
                fullWidth
                type="number"
                label="Monthly Security Deposit"
                name="monthlySecurityPrice"
                value={formData.monthlySecurityPrice || ""}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                type="number"
                label="Weekly Minimum Price"
                name="weeklyMinPrice"
                value={formData.weeklyMinPrice || ""}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                type="number"
                label="Weekly Maximum Price"
                name="weeklyMaxPrice"
                value={formData.weeklyMaxPrice || ""}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </FormSection>

        {/* Contact Information */}
        <FormSection elevation={0}>
          <SectionTitle>
            <ContactPhone />
            Contact Information
          </SectionTitle>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Contact Number"
                name="contactNumber"
                value={formData.contactNumber || ""}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ContactPhone />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                type="email"
                label="Email Address"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </FormSection>

        {/* Property Details */}
        <FormSection elevation={0}>
          <SectionTitle>
            <Category />
            Property Details
          </SectionTitle>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel
                  sx={{
                    color: "#6b7280",
                    "&.Mui-focused": { color: "#7c3aed" },
                  }}
                >
                  Categories
                </InputLabel>
                <Select
                  multiple
                  value={formData.categories || []}
                  onChange={handleSelectChange("categories")}
                  input={
                    <OutlinedInput
                      label="Categories"
                      sx={{ borderRadius: "12px" }}
                    />
                  }
                  MenuProps={MenuProps}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          size="small"
                          sx={{
                            background:
                              "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                            color: "white",
                          }}
                        />
                      ))}
                    </Box>
                  )}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel
                  sx={{
                    color: "#6b7280",
                    "&.Mui-focused": { color: "#7c3aed" },
                  }}
                >
                  Tags
                </InputLabel>
                <Select
                  multiple
                  value={formData.tags || []}
                  onChange={handleSelectChange("tags")}
                  input={
                    <OutlinedInput label="Tags" sx={{ borderRadius: "12px" }} />
                  }
                  MenuProps={MenuProps}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          size="small"
                          sx={{
                            background:
                              "linear-gradient(135deg, #c084fc 0%, #e879f9 100%)",
                            color: "white",
                          }}
                        />
                      ))}
                    </Box>
                  )}
                >
                  {tags.map((tag) => (
                    <MenuItem key={tag} value={tag}>
                      <LocalOffer sx={{ mr: 1, color: "#a855f7" }} />
                      {tag}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel
                  sx={{
                    color: "#6b7280",
                    "&.Mui-focused": { color: "#7c3aed" },
                  }}
                >
                  Amenities
                </InputLabel>
                <Select
                  multiple
                  value={formData.amenities || []}
                  onChange={handleSelectChange("amenities")}
                  input={
                    <OutlinedInput
                      label="Amenities"
                      sx={{ borderRadius: "12px" }}
                    />
                  }
                  MenuProps={MenuProps}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          size="small"
                          sx={{
                            background:
                              "linear-gradient(135deg, #a855f7 0%, #d946ef 100%)",
                            color: "white",
                          }}
                        />
                      ))}
                    </Box>
                  )}
                >
                  {amenities.map((amenity) => (
                    <MenuItem key={amenity} value={amenity}>
                      <Widgets sx={{ mr: 1, color: "#a855f7" }} />
                      {amenity}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <StyledTextField
                select
                fullWidth
                label="Property Status"
                name="status"
                value={formData.status || ""}
                onChange={handleChange}
              >
                <MenuItem value="active">
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "#10b981",
                      }}
                    />
                    Active
                  </Box>
                </MenuItem>
                <MenuItem value="inactive">
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "#ef4444",
                      }}
                    />
                    Inactive
                  </Box>
                </MenuItem>
              </StyledTextField>
            </Grid>
          </Grid>
        </FormSection>

        {/* Property Options */}
        <FormSection elevation={0}>
          <SectionTitle>
            <Business />
            Property Features
          </SectionTitle>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                <StyledFormControlLabel
                  control={
                    <Checkbox
                      name="luxury"
                      checked={formData.luxury || false}
                      onChange={handleChange}
                    />
                  }
                  label="Luxury Property"
                />
                <StyledFormControlLabel
                  control={
                    <Checkbox
                      name="petFriendly"
                      checked={formData.petFriendly || false}
                      onChange={handleChange}
                    />
                  }
                  label="Pet Friendly"
                />
                <StyledFormControlLabel
                  control={
                    <Checkbox
                      name="smokingAllowed"
                      checked={formData.smokingAllowed || false}
                      onChange={handleChange}
                    />
                  }
                  label="Smoking Allowed"
                />
              </Box>
            </Grid>
          </Grid>
        </FormSection>

        {/* Check-in/Check-out Times */}
        <FormSection elevation={0}>
          <SectionTitle>
            <Schedule />
            Check-in & Check-out Times
          </SectionTitle>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                type="time"
                label="Check-in Time"
                name="inTime"
                value={formData.inTime || ""}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Schedule />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                type="time"
                label="Check-out Time"
                name="outTime"
                value={formData.outTime || ""}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Schedule />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </FormSection>

        {/* Image Upload */}
        <FormSection elevation={0}>
          <SectionTitle>
            <PhotoCamera />
            Property Images
          </SectionTitle>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{ mb: 2, color: "#374151" }}
              >
                Cover Image
              </Typography>
              <ImageUploadBox>
                <PhotoCamera />
                <Typography
                  variant="h6"
                  sx={{ mb: 1, color: "#7c3aed", fontWeight: 600 }}
                >
                  Upload Cover Image
                </Typography>
                <Typography variant="body2" sx={{ color: "#6b7280", mb: 2 }}>
                  Choose the main image for your property
                </Typography>
                <input
                  type="file"
                  name="coverImage"
                  accept="image/*"
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
              </ImageUploadBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{ mb: 2, color: "#374151" }}
              >
                Property Gallery
              </Typography>
              <ImageUploadBox>
                <PhotoCamera />
                <Typography
                  variant="h6"
                  sx={{ mb: 1, color: "#7c3aed", fontWeight: 600 }}
                >
                  Upload Multiple Images
                </Typography>
                <Typography variant="body2" sx={{ color: "#6b7280", mb: 2 }}>
                  Add multiple images to showcase your property
                </Typography>
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
              </ImageUploadBox>
            </Grid>
          </Grid>
        </FormSection>
      </DialogContent>

      <DialogActions
        sx={{ padding: "20px", background: "rgba(139, 69, 193, 0.02)" }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: "#a855f7",
            color: "#7c3aed",
            borderRadius: "12px",
            padding: "10px 24px",
            fontWeight: 600,
            "&:hover": {
              borderColor: "#7c3aed",
              backgroundColor: "rgba(139, 69, 193, 0.04)",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
            borderRadius: "12px",
            padding: "10px 24px",
            fontWeight: 600,
            boxShadow: "0 4px 12px rgba(139, 69, 193, 0.3)",
            "&:hover": {
              background: "linear-gradient(135deg, #6d28d9 0%, #9333ea 100%)",
              boxShadow: "0 6px 16px rgba(139, 69, 193, 0.4)",
            },
          }}
        >
          Save Property
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default PropertyModal;
