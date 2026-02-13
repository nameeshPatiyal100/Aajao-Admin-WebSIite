import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchTagsDropdown } from "../../../features/admin/propertyTag/tagsDropdown.slice";
import { fetchAmenetiesDropdown } from "../../../features/admin/propertyAmenity/amenitiesDropdown.slice";
import { fetchCateDropdown } from "../../../features/admin/propertyCategory/categoryDropdown.slice";
import { fetchPropertyById } from "../../../features/admin/properties/propertyById.slice";
import HostAssignField from "./HostAssignField";
import MultiImageUpload from "../../../components/MultiImageUpload";
import { TableLoader } from "../../../components/admin/common/TableLoader";
import {
  PurpleThemeColor,
  ThemeColors,
  FieldLabelColor,
} from "../../../theme/themeColor";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { setupPropertySchema } from "../../../validations/admin-validations";
import type { FormValues } from "./types";
import { DEFAULT_FORM_VALUES } from "./types";
import CloseIcon from "@mui/icons-material/Close";
import FormTopBar from "./FormTopBar";
import {
  Button,
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";

export default function PropertiesForm() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const [descInput, setDescInput] = useState("");

  const { data: propertyData, loading } = useAppSelector(
    (state) => state.propertyById
  );
  const { tagsList } = useAppSelector((state) => state.tagsDropdown);
  const { amenitiesList } = useAppSelector((state) => state.amenitiesDropdown);
  const { categoriesList } = useAppSelector((state) => state.categoryDropdown);
  useEffect(() => {
    dispatch(fetchTagsDropdown());
    dispatch(fetchAmenetiesDropdown());
    dispatch(fetchCateDropdown());
  }, [dispatch]);

  const isImage = (url: string) => /\.(jpg|jpeg|png|webp|gif)$/i.test(url);

  const getFileName = (url: string) => url.split("/").pop() || "Document";

  const isViewMode = false;
  useEffect(() => {
    if (id) {
      dispatch(fetchPropertyById(Number(id)));
    }
  }, [id, dispatch]);

  const formik = useFormik<FormValues>({
    enableReinitialize: true,
    initialValues: propertyData ?? DEFAULT_FORM_VALUES,
    validationSchema: setupPropertySchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  // console.log("Formik images:", formik.values.images);

  const handleDeleteDocument = (
    file: File | { afile_id: number; url: string } | null,
    fieldName: "cover_image" | "documents",
    index?: number
  ) => {
    if (!file) return;

    // ✅ If file came from API → delete on backend
    if (!(file instanceof File)) {
      const afileId = file.afile_id;

      console.log("Deleting afile_id:", afileId);
      console.log("Property ID:", formik.values.id);

      // 🔥 API call
      // dispatch(deletePropertyFile({ afile_id: afileId, property_id: formik.values.id }));
    }

    // ✅ Clear from formik
    if (fieldName === "cover_image") {
      formik.setFieldValue("cover_image", null);
    }

    if (fieldName === "documents" && typeof index === "number") {
      const updatedDocs = [...formik.values.documents];
      updatedDocs.splice(index, 1);
      formik.setFieldValue("documents", updatedDocs);
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    formik.setFieldValue("cover_image", file);
  };

  return (
    <>
      {loading ? (
        <TableLoader />
      ) : (
        <Box
          sx={{
            backgroundColor: ThemeColors.background,
            minHeight: "100vh",
            fontFamily: "Inter, sans-serif",
          }}
        >
          <FormTopBar ThemeColors={ThemeColors} />
          <Box sx={{ p: 3, backgroundColor: "#f9fafb" }}>
            <form onSubmit={formik.handleSubmit}>
              <Box display="grid" gridTemplateColumns="1fr 1fr" gap={3}>
                {/* Name Field */}
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && !!formik.errors.name}
                  helperText={
                    formik.touched.name &&
                    typeof formik.errors.name === "string"
                      ? formik.errors.name
                      : ""
                  }
                  sx={{
                    gridColumn: "1 / -1",
                    ...FieldLabelColor,
                  }}
                />
                <HostAssignField
                  value={formik.values.hostName}
                  onSelect={(host) => {
                    formik.setFieldValue("hostId", host.host_id);
                    formik.setFieldValue("hostName", host.user_fullName);
                  }}
                  onClear={() => {
                    formik.setFieldValue("hostId", "");
                    formik.setFieldValue("hostName", "");
                  }}
                  disabled={isViewMode}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.description && !!formik.errors.description
                  }
                  helperText={
                    formik.touched.description &&
                    typeof formik.errors.description === "string"
                      ? formik.errors.description
                      : ""
                  }
                  sx={{
                    gridColumn: "1 / -1",
                    ...FieldLabelColor,
                  }}
                />

                <TextField
                  label="Address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.address && !!formik.errors.address}
                  helperText={
                    formik.touched.address &&
                    typeof formik.errors.address === "string"
                      ? formik.errors.address
                      : ""
                  }
                  sx={{
                    ...FieldLabelColor,
                  }}
                />

                <TextField
                  label="City"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.city && !!formik.errors.city}
                  helperText={
                    formik.touched.city &&
                    typeof formik.errors.city === "string"
                      ? formik.errors.city
                      : ""
                  }
                  sx={{
                    ...FieldLabelColor,
                  }}
                />
                <TextField
                  label="Latitude"
                  name="latitude"
                  value={formik.values.latitude}
                  onChange={formik.handleChange}
                  sx={{ ...FieldLabelColor }}
                />

                <TextField
                  label="Longitude"
                  name="longitude"
                  value={formik.values.longitude}
                  onChange={formik.handleChange}
                  sx={{ ...FieldLabelColor }}
                />

                <TextField
                  label="Zip Code"
                  name="zip_code"
                  value={formik.values.zip_code}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.zip_code && !!formik.errors.zip_code}
                  helperText={
                    formik.touched.zip_code &&
                    typeof formik.errors.zip_code === "string"
                      ? formik.errors.zip_code
                      : ""
                  }
                  sx={{
                    ...FieldLabelColor,
                  }}
                />

                <TextField
                  label="Country"
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.country && !!formik.errors.country}
                  helperText={
                    formik.touched.country &&
                    typeof formik.errors.country === "string"
                      ? formik.errors.country
                      : ""
                  }
                  sx={{
                    ...FieldLabelColor,
                  }}
                />

                <TextField
                  label="State"
                  name="state"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.state && !!formik.errors.state}
                  helperText={
                    formik.touched.state &&
                    typeof formik.errors.state === "string"
                      ? formik.errors.state
                      : ""
                  }
                  sx={{
                    ...FieldLabelColor,
                  }}
                />

                <TextField
                  label="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && !!formik.errors.email}
                  helperText={
                    formik.touched.email &&
                    typeof formik.errors.email === "string"
                      ? formik.errors.email
                      : ""
                  }
                  sx={{
                    ...FieldLabelColor,
                  }}
                />

                <TextField
                  label="Phone"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && !!formik.errors.phone}
                  helperText={
                    formik.touched.phone &&
                    typeof formik.errors.phone === "string"
                      ? formik.errors.phone
                      : ""
                  }
                  sx={{
                    ...FieldLabelColor,
                  }}
                />

                <TextField
                  label="Check in Time"
                  // type="time"
                  name="check_in_time"
                  value={formik.values.check_in_time}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.check_in_time &&
                    !!formik.errors.check_in_time
                  }
                  helperText={
                    formik.touched.check_in_time &&
                    typeof formik.errors.check_in_time === "string"
                      ? formik.errors.check_in_time
                      : ""
                  }
                  sx={{
                    ...FieldLabelColor,
                  }}
                />

                <TextField
                  name="check_out_time"
                  value={formik.values.check_out_time}
                  label="Check out Time"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.check_out_time &&
                    typeof formik.errors.check_out_time === "string"
                      ? formik.errors.check_out_time
                      : ""
                  }
                  error={
                    formik.touched.check_out_time &&
                    !!formik.errors.check_out_time
                  }
                  sx={{
                    ...FieldLabelColor,
                  }}
                />
                <TextField
                  label="Price"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.price && !!formik.errors.price}
                  helperText={
                    formik.touched.price &&
                    typeof formik.errors.price === "string"
                      ? formik.errors.price
                      : ""
                  }
                  sx={{
                    ...FieldLabelColor,
                  }}
                />

                <TextField
                  label="Minimum Price"
                  name="minimum_price"
                  value={formik.values.minimum_price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.minimum_price &&
                    !!formik.errors.minimum_price
                  }
                  helperText={
                    formik.touched.minimum_price &&
                    typeof formik.errors.minimum_price === "string"
                      ? formik.errors.minimum_price
                      : ""
                  }
                  sx={{
                    ...FieldLabelColor,
                  }}
                />

                <TextField
                  label="Weekly Minimum Price"
                  name="weekly_minimum_price"
                  value={formik.values.weekly_minimum_price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.weekly_minimum_price &&
                    !!formik.errors.weekly_minimum_price
                  }
                  helperText={
                    formik.touched.weekly_minimum_price &&
                    typeof formik.errors.weekly_minimum_price === "string"
                      ? formik.errors.weekly_minimum_price
                      : ""
                  }
                  sx={{
                    ...FieldLabelColor,
                  }}
                />

                <TextField
                  label="Weekly Maximum Price"
                  name="weekly_maximum_price"
                  value={formik.values.weekly_maximum_price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.weekly_maximum_price &&
                    !!formik.errors.weekly_maximum_price
                  }
                  helperText={
                    formik.touched.weekly_maximum_price &&
                    typeof formik.errors.weekly_maximum_price === "string"
                      ? formik.errors.weekly_maximum_price
                      : ""
                  }
                  sx={{
                    ...FieldLabelColor,
                  }}
                />

                <TextField
                  label="Monthly Security"
                  name="monthly_security"
                  value={formik.values.monthly_security}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.monthly_security &&
                    !!formik.errors.monthly_security
                  }
                  helperText={
                    formik.touched.monthly_security &&
                    typeof formik.errors.monthly_security === "string"
                      ? formik.errors.monthly_security
                      : ""
                  }
                  sx={{
                    ...FieldLabelColor,
                  }}
                />

                <FormControl
                  fullWidth
                  sx={{ gridColumn: "1 / -1", ...FieldLabelColor }}
                >
                  <InputLabel>Categories</InputLabel>
                  <Select
                    multiple
                    name="categories"
                    value={formik.values.categories}
                    onChange={formik.handleChange}
                    input={<OutlinedInput label="Categories" />}
                    renderValue={(selected) =>
                      (selected as number[])
                        .map(
                          (id) => categoriesList.find((c) => c.id === id)?.name
                        )
                        .join(", ")
                    }
                  >
                    {categoriesList.map((cat) => (
                      <MenuItem key={cat.id} value={cat.id}>
                        <Checkbox
                          checked={formik.values.categories.includes(cat.id)}
                          sx={{
                            color: "#881f9b",
                            "&.Mui-checked": {
                              color: "#881f9b",
                            },
                          }}
                        />
                        <ListItemText primary={cat.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl
                  fullWidth
                  sx={{ gridColumn: "1 / -1", ...FieldLabelColor }}
                >
                  <InputLabel>Amenities</InputLabel>
                  <Select
                    multiple
                    name="amenities"
                    value={formik.values.amenities}
                    onChange={formik.handleChange}
                    input={<OutlinedInput label="Amenities" />}
                    renderValue={(selected) =>
                      (selected as number[])
                        .map(
                          (id) =>
                            amenitiesList.find((a) => a.amn_id === id)
                              ?.amn_title
                        )
                        .join(", ")
                    }
                  >
                    {amenitiesList.map((amenity) => (
                      <MenuItem key={amenity.amn_id} value={amenity.amn_id}>
                        <Checkbox
                          checked={formik.values.amenities.includes(
                            amenity.amn_id
                          )}
                          sx={{
                            color: "#881f9b",
                            "&.Mui-checked": {
                              color: "#881f9b",
                            },
                          }}
                        />
                        <ListItemText primary={amenity.amn_title} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl
                  fullWidth
                  sx={{ gridColumn: "1 / -1", ...FieldLabelColor }}
                >
                  <InputLabel>Tags</InputLabel>
                  <Select
                    multiple
                    name="tags"
                    value={formik.values.tags}
                    onChange={formik.handleChange}
                    input={<OutlinedInput label="Tags" />}
                    renderValue={(selected) =>
                      tagsList
                        .filter((t) => selected.includes(t.tag_id))
                        .map((t) => t.tag_name)
                        .join(", ")
                    }
                  >
                    {tagsList.map((tag) => (
                      <MenuItem key={tag.tag_id} value={tag.tag_id}>
                        <Checkbox
                          checked={formik.values.tags.includes(tag.tag_id)}
                          sx={{
                            color: "#881f9b",
                            "&.Mui-checked": {
                              color: "#881f9b",
                            },
                          }}
                        />
                        <ListItemText primary={tag.tag_name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  select
                  label="Verification"
                  name="is_verified"
                  value={formik.values.is_verified}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.is_verified && !!formik.errors.is_verified
                  }
                  helperText={
                    formik.touched.is_verified &&
                    typeof formik.errors.is_verified === "string"
                      ? formik.errors.is_verified
                      : ""
                  }
                  sx={{
                    ...FieldLabelColor,
                  }}
                >
                  <MenuItem value="0">Pending</MenuItem>
                  <MenuItem value="1">Approved</MenuItem>
                  <MenuItem value="2">Rejected</MenuItem>
                </TextField>

                <TextField
                  select
                  label="Luxury"
                  name="is_luxury"
                  value={formik.values.is_luxury}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.is_luxury && !!formik.errors.is_luxury}
                  helperText={
                    formik.touched.is_luxury &&
                    typeof formik.errors.is_luxury === "string"
                      ? formik.errors.is_luxury
                      : ""
                  }
                  sx={{
                    ...FieldLabelColor,
                  }}
                >
                  <MenuItem value="1">Yes</MenuItem>
                  <MenuItem value="0">No</MenuItem>
                </TextField>

                <TextField
                  select
                  label="Pet Friendly"
                  name="is_pet_friendly"
                  value={formik.values.is_pet_friendly}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.is_pet_friendly &&
                    !!formik.errors.is_pet_friendly
                  }
                  helperText={
                    formik.touched.is_pet_friendly &&
                    typeof formik.errors.is_pet_friendly === "string"
                      ? formik.errors.is_pet_friendly
                      : ""
                  }
                  sx={{
                    ...FieldLabelColor,
                  }}
                >
                  <MenuItem value="1">Yes</MenuItem>
                  <MenuItem value="0">No</MenuItem>
                </TextField>

                <TextField
                  select
                  label="Smoking Free"
                  name="is_smoking_free"
                  value={formik.values.is_smoking_free}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.is_smoking_free &&
                    !!formik.errors.is_smoking_free
                  }
                  helperText={
                    formik.touched.is_smoking_free &&
                    typeof formik.errors.is_smoking_free === "string"
                      ? formik.errors.is_smoking_free
                      : ""
                  }
                  sx={{
                    ...FieldLabelColor,
                  }}
                >
                  <MenuItem value="1">Yes</MenuItem>
                  <MenuItem value="0">No</MenuItem>
                </TextField>

                <TextField
                  select
                  label="Status"
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.status && !!formik.errors.status}
                  helperText={
                    formik.touched.status &&
                    typeof formik.errors.status === "string"
                      ? formik.errors.status
                      : ""
                  }
                  sx={{
                    ...FieldLabelColor,
                  }}
                >
                  <MenuItem value="1">Active</MenuItem>
                  <MenuItem value="0">Inactive</MenuItem>
                </TextField>

                <Box sx={{ gridColumn: "1 / -1" }}>
                  <Typography variant="subtitle1" mb={1} fontWeight={600}>
                    Description Points
                  </Typography>

                  <TextField
                    fullWidth
                    placeholder="Type a point and press Enter"
                    value={descInput}
                    onChange={(e) => setDescInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && descInput.trim()) {
                        e.preventDefault();
                        formik.setFieldValue("description_points", [
                          ...formik.values.description_points,
                          descInput.trim(),
                        ]);
                        setDescInput("");
                      }
                    }}
                    sx={{ ...FieldLabelColor }}
                  />

                  {/* 📌 Styled Points List */}
                  <Box mt={2} display="flex" flexDirection="column" gap={1}>
                    {/* 📌 Styled Points List */}
                    {formik.values.description_points.length === 0 && (
                      <Typography mt={1.5} fontSize={13} color="#9ca3af">
                        No description points added yet.
                      </Typography>
                    )}

                    {formik.values.description_points.length > 0 && (
                      <Box mt={2} display="flex" flexDirection="column" gap={1}>
                        {formik.values.description_points.map(
                          (point, index) => (
                            <Box
                              key={index}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                                p: 1.2,
                                borderRadius: 1.5,
                                border: "1px solid #e5e7eb",
                                backgroundColor: "#fafafa",
                                transition: "all 0.2s ease",
                                "&:hover": {
                                  backgroundColor: "#f3e8ff",
                                  borderColor: "#c084fc",
                                },
                              }}
                            >
                              {/* 🔢 Number badge */}
                              <Box
                                sx={{
                                  minWidth: 26,
                                  height: 26,
                                  borderRadius: "50%",
                                  backgroundColor: "#881f9b",
                                  color: "#fff",
                                  fontSize: 13,
                                  fontWeight: 600,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {index + 1}
                              </Box>

                              {/* 📝 Text */}
                              <Typography
                                sx={{
                                  flex: 1,
                                  fontSize: 14,
                                  color: "#374151",
                                  wordBreak: "break-word",
                                }}
                              >
                                {point}
                              </Typography>

                              {/* ❌ Delete */}
                              <IconButton
                                size="small"
                                onClick={() =>
                                  formik.setFieldValue(
                                    "description_points",
                                    formik.values.description_points.filter(
                                      (_, i) => i !== index
                                    )
                                  )
                                }
                                sx={{
                                  color: "#9ca3af",
                                  "&:hover": {
                                    color: "#dc2626",
                                    backgroundColor: "rgba(220,38,38,0.08)",
                                  },
                                }}
                              >
                                <CloseIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          )
                        )}
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>

              <Box sx={{ gridColumn: "1 / -1" }}>
                <Typography variant="subtitle1" mb={1}>
                  Cover Image
                </Typography>
                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    color: PurpleThemeColor,
                    borderColor: PurpleThemeColor,
                    "&:hover": {
                      borderColor: "#6f137f",
                      backgroundColor: "rgba(111,19,127,0.05)",
                    },
                  }}
                >
                  Upload Image
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleCoverImageChange}
                  />
                </Button>

                {formik.values.cover_image && (
                  <Box
                    sx={{
                      position: "relative",
                      mt: 2,
                      width: 200,
                      height: 200,
                      borderRadius: 2,
                      border: "1px solid #ddd",
                      overflow: "hidden",
                    }}
                  >
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        backgroundColor: "rgba(255,255,255,0.8)",
                      }}
                      onClick={() =>
                        handleDeleteDocument(
                          formik.values.cover_image,
                          "cover_image"
                        )
                      }
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>

                    <Box
                      component="img"
                      src={
                        formik.values.cover_image instanceof File
                          ? URL.createObjectURL(formik.values.cover_image)
                          : formik.values.cover_image.url
                      }
                      alt="Cover"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                )}
              </Box>

              <MultiImageUpload
                formik={formik}
                fieldName="images"
                label="Property Gallery"
                maxImages={8}
              />

              <Box sx={{ gridColumn: "1 / -1", mt: 4 }}>
                <Typography variant="subtitle1" mb={1}>
                  Property Documents (Images only, Max 5)
                </Typography>

                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    color: PurpleThemeColor,
                    borderColor: PurpleThemeColor,
                  }}
                >
                  Upload Images
                  <input
                    hidden
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      const existing = formik.values.documents || [];

                      if (existing.length + files.length > 5) {
                        alert("Maximum 5 documents allowed");
                        return;
                      }

                      formik.setFieldValue("documents", [
                        ...existing,
                        ...files,
                      ]);
                    }}
                  />
                </Button>

                {/* 🖼 Image Preview */}
                <Box mt={2} display="flex" gap={2} flexWrap="wrap">
                  {formik.values.documents.map((doc, index) => (
                    <Box key={index} sx={{ position: "relative", width: 120 }}>
                      <IconButton
                        size="small"
                        sx={{ position: "absolute", top: 4, right: 4 }}
                        onClick={() =>
                          handleDeleteDocument(doc, "documents", index)
                        }
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>

                      <Box
                        component="img"
                        src={
                          doc instanceof File
                            ? URL.createObjectURL(doc)
                            : doc.url
                        }
                        sx={{ width: "100%", height: 120, objectFit: "cover" }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Actions */}
              <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: PurpleThemeColor,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "#6f137f",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      )}
    </>
  );
}
