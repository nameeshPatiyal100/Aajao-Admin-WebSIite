import { useParams } from "react-router-dom";
import {
  PurpleThemeColor,
  ThemeColors,
  FieldLabelColor,
} from "../../../theme/themeColor";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import FormTopBar from "./FormTopBar";
import { setupPropertySchema } from "../../../validations/admin-validations";
import type { FormValues } from "./types";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
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
import { faker } from "@faker-js/faker";
import MultiImageUpload from "../../../components/MultiImageUpload";

const bool01 = (): "0" | "1" => faker.helpers.arrayElement(["0", "1"]);
const categoriesList = [
  { id: 1, name: "Luxury" },
  { id: 2, name: "Budget" },
  { id: 3, name: "Pet Friendly" },
  { id: 4, name: "Family" },
  { id: 5, name: "Romantic" },
];
const tagsList = [
  { id: 1, name: "Pool" },
  { id: 2, name: "WiFi" },
  { id: 3, name: "Parking" },
  { id: 4, name: "Breakfast" },
  { id: 5, name: "Air Conditioning" },
];

const amenitiesList = [
  { id: 1, name: "WiFi" },
  { id: 2, name: "Air Conditioning" },
  { id: 3, name: "Parking" },
  { id: 4, name: "Swimming Pool" },
  { id: 5, name: "Gym" },
  { id: 6, name: "Breakfast" },
  { id: 7, name: "Pets Allowed" },
  { id: 8, name: "TV" },
  { id: 9, name: "Kitchen" },
  { id: 10, name: "Washer/Dryer" },
  { id: 11, name: "Hot Tub" },
  { id: 12, name: "Fireplace" },
];

const usersList = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Sarah Smith" },
  { id: 3, name: "Michael Brown" },
  { id: 4, name: "Luis Cook" },
  { id: 5, name: "John Cook" },
];
const dummyImages = Array.from({ length: 5 }).map(() =>
  faker.image.url({ width: 400, height: 300 })
);
let fakeData: FormValues = {
  id: faker.string.uuid(),
  name: faker.company.name(),
  host_name: faker.person.fullName(),
  user_id: faker.helpers.arrayElement(usersList).id,
  description: faker.lorem.paragraph(),
  address: faker.location.streetAddress(),
  city: faker.location.city(),
  zip_code: faker.location.zipCode(),
  country: faker.location.country(),
  state: faker.location.state(),
  phone: faker.phone.number(),
  email: faker.internet.email(),
  website_url: faker.internet.url(),
  check_in_time: faker.date
    .between({ from: "2024-01-01T12:00:00", to: "2024-01-01T16:00:00" })
    .toTimeString()
    .slice(0, 5),
  check_out_time: faker.date
    .between({ from: "2024-01-01T08:00:00", to: "2024-01-01T11:00:00" })
    .toTimeString()
    .slice(0, 5),
  price: faker.number.int({ min: 80, max: 500 }),
  minimum_price: faker.number.int({ min: 60, max: 100 }),
  weekly_minimum_price: faker.number.int({ min: 400, max: 1200 }),
  weekly_maximum_price: faker.number.int({ min: 1300, max: 3000 }),
  monthly_security: faker.number.int({ min: 500, max: 2000 }),
  status: bool01(),
  is_verified: faker.helpers.arrayElement(["0", "1", "2"]),
  is_luxury: bool01(),
  is_pet_friendly: bool01(),
  is_smoking_free: bool01(),
  categories: faker.helpers.arrayElements(
    categoriesList.map((c) => c.id),
    faker.number.int({ min: 1, max: 3 })
  ),
  tags: faker.helpers.arrayElements(
    tagsList.map((t) => t.id),
    faker.number.int({ min: 1, max: 3 })
  ),
  amenities: faker.helpers.arrayElements(
    amenitiesList.map((a) => a.id),
    faker.number.int({ min: 1, max: 3 })
  ),
  cover_image: null,
  images: dummyImages,
};

export default function PropertiesForm() {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<FormValues | null>(null);
  useEffect(() => {
    if (id) {
      setFormData(fakeData);
    }
  }, [id]);

  const formik = useFormik<FormValues>({
    enableReinitialize: true,
    initialValues: {
      id: formData?.id || "",
      name: formData?.name || "",
      host_name: formData?.host_name || "",
      user_id: formData?.user_id || "",
      description: formData?.description || "",
      address: formData?.address || "",
      city: formData?.city || "",
      zip_code: formData?.zip_code || "",
      country: formData?.country || "",
      state: formData?.state || "",
      phone: formData?.phone || "",
      email: formData?.email || "",
      website_url: formData?.website_url || "",
      check_in_time: formData?.check_in_time || "",
      check_out_time: formData?.check_out_time || "",
      price: formData?.price || 0,
      minimum_price: formData?.minimum_price || 0,
      weekly_minimum_price: formData?.weekly_minimum_price || 0,
      weekly_maximum_price: formData?.weekly_maximum_price || 0,
      monthly_security: formData?.monthly_security || 0,
      status: formData?.status || "0",
      is_verified: formData?.is_verified || "0",
      is_luxury: formData?.is_luxury || "0",
      is_pet_friendly: formData?.is_pet_friendly || "0",
      is_smoking_free: formData?.is_smoking_free || "0",
      categories: formData?.categories || [],
      tags: formData?.tags || [],
      amenities: formData?.amenities || [],
      cover_image: null,
      images: formData?.images || [],
    },
    validationSchema: setupPropertySchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue("cover_image", file);
    }
  };
  return (
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
                formik.touched.name && typeof formik.errors.name === "string"
                  ? formik.errors.name
                  : ""
              }
              sx={{
                gridColumn: "1 / -1",
                ...FieldLabelColor,
              }}
            />

            <TextField
              select
              fullWidth
              label="User"
              name="user_id"
              value={formik.values.user_id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.user_id && !!formik.errors.user_id}
              helperText={
                formik.touched.user_id &&
                typeof formik.errors.user_id === "string"
                  ? formik.errors.user_id
                  : ""
              }
              sx={{
                ...FieldLabelColor,
              }}
            >
              {usersList.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Host Name"
              name="host_name"
              value={formik.values.host_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.host_name && !!formik.errors.host_name}
              helperText={
                formik.touched.host_name &&
                typeof formik.errors.host_name === "string"
                  ? formik.errors.host_name
                  : ""
              }
              sx={{
                ...FieldLabelColor,
              }}
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
              error={formik.touched.description && !!formik.errors.description}
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
                formik.touched.city && typeof formik.errors.city === "string"
                  ? formik.errors.city
                  : ""
              }
              sx={{
                ...FieldLabelColor,
              }}
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
                formik.touched.state && typeof formik.errors.state === "string"
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
                formik.touched.email && typeof formik.errors.email === "string"
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
                formik.touched.phone && typeof formik.errors.phone === "string"
                  ? formik.errors.phone
                  : ""
              }
              sx={{
                ...FieldLabelColor,
              }}
            />

            <TextField
              label="Website Url"
              name="website_url"
              value={formik.values.website_url}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.website_url && !!formik.errors.website_url}
              helperText={
                formik.touched.website_url &&
                typeof formik.errors.website_url === "string"
                  ? formik.errors.website_url
                  : ""
              }
              sx={{
                ...FieldLabelColor,
              }}
            />

            <TextField
              label="Check in Time"
              type="time"
              name="check_in_time"
              value={formik.values.check_in_time}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.check_in_time && !!formik.errors.check_in_time
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
              label="Check out Time"
              type="time"
              name="check_out_time"
              value={formik.values.check_out_time}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.check_out_time && !!formik.errors.check_out_time
              }
              helperText={
                formik.touched.check_out_time &&
                typeof formik.errors.check_out_time === "string"
                  ? formik.errors.check_out_time
                  : ""
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
                formik.touched.price && typeof formik.errors.price === "string"
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
                formik.touched.minimum_price && !!formik.errors.minimum_price
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
                    .map((id) => categoriesList.find((c) => c.id === id)?.name)
                    .join(", ")
                }
              >
                {categoriesList.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    <Checkbox
                      checked={formik.values.categories.includes(cat.id)}
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
                    .map((id) => amenitiesList.find((a) => a.id === id)?.name)
                    .join(", ")
                }
              >
                {amenitiesList.map((amenity) => (
                  <MenuItem key={amenity.id} value={amenity.id}>
                    <Checkbox
                      checked={formik.values.amenities.includes(amenity.id)}
                    />
                    <ListItemText primary={amenity.name} />
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
                  (selected as number[])
                    .map((id) => tagsList.find((t) => t.id === id)?.name)
                    .join(", ")
                }
              >
                {tagsList.map((tag) => (
                  <MenuItem key={tag.id} value={tag.id}>
                    <Checkbox checked={formik.values.tags.includes(tag.id)} />
                    <ListItemText primary={tag.name} />
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
              error={formik.touched.is_verified && !!formik.errors.is_verified}
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
          </Box>

          <Box sx={{ gridColumn: "1 / -1" }}>
            <Typography variant="subtitle1" mb={1}>
              Cover Image
            </Typography>

            {/* Upload Button */}
            <Button variant="outlined" component="label">
              Upload Image
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleImageChange}
              />
            </Button>

            {/* Image Preview with top-right remove icon */}
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
                {/* Remove Icon */}
                <IconButton
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    backgroundColor: "rgba(255,255,255,0.8)",
                    "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
                  }}
                  onClick={() => {
                    formik.setFieldValue("cover_image", null);
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>

                {/* Image */}
                <Box
                  component="img"
                  src={URL.createObjectURL(formik.values.cover_image)}
                  alt="Preview"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            )}
          </Box>
          <MultiImageUpload formik={formik} fieldName="images" label="Property Gallery" maxImages={8} />

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
  );
}
