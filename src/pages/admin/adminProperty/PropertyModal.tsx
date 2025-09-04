import React, { useState, ChangeEvent } from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import "./PropertyModal.css";

interface PropertyFormData {
  hostName: string;
  propertyName: string;
  address: string;
  longitude: number | "";
  latitude: number | "";
  description: string;
  price: number | "";
  minPrice: number | "";
  city: string;
  zipcode: number | "";
  state: string;
  contactNumber: string;
  email: string;
  category: string[];
  tags: string[];
  amenities: string[];
  status: string;
  luxury: boolean;
  petFriendly: boolean;
  smokingAllowed: boolean;
  checkIn: string;
  checkOut: string;
  weeklyMin: number | "";
  weeklyMax: number | "";
  monthlySecurity: number | "";
  images: File[];
  coverImage: File | null;
}

interface PropertyModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: PropertyFormData) => void;
}

const PropertyModal: React.FC<PropertyModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<PropertyFormData>({
    hostName: "",
    propertyName: "",
    address: "",
    longitude: "",
    latitude: "",
    description: "",
    price: "",
    minPrice: "",
    city: "",
    zipcode: "",
    state: "",
    contactNumber: "",
    email: "",
    category: [],
    tags: [],
    amenities: [],
    status: "",
    luxury: false,
    petFriendly: false,
    smokingAllowed: false,
    checkIn: "",
    checkOut: "",
    weeklyMin: "",
    weeklyMax: "",
    monthlySecurity: "",
    images: [],
    coverImage: null,
  });

  // Handle text / number change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox
  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  // Handle select
  const handleSelect = (name: keyof PropertyFormData, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  // Handle file uploads
  const handleImageUpload = (
    e: ChangeEvent<HTMLInputElement>,
    isCover: boolean = false
  ) => {
    if (!e.target.files) return;
    if (isCover) {
      setFormData({ ...formData, coverImage: e.target.files[0] });
    } else {
      setFormData({
        ...formData,
        images: [...formData.images, ...Array.from(e.target.files)],
      });
    }
  };

  // Submit
  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      {/* <DialogTitle className="modal-title">Add / Edit Property</DialogTitle> */}
      <DialogTitle className="modal-title">
        <div className="modal-header">
          <span>Add / Edit Property</span>
          <IconButton className="close-btn" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent className="dialog-content">
        {/* General Information */}
        <h3 className="section-title">General Information</h3>
        <div className="form-row">
          <TextField
            label="Host Name"
            name="hostName"
            value={formData.hostName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Property Name"
            name="propertyName"
            value={formData.propertyName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
          />
          <TextField
            label="Longitude"
            type="number"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Latitude"
            type="number"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />
        </div>

        {/* Pricing */}
        <h3 className="section-title">Pricing</h3>
        <div className="form-row">
          <TextField
            label="Price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Minimum Price"
            type="number"
            name="minPrice"
            value={formData.minPrice}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Weekly Min Price"
            type="number"
            name="weeklyMin"
            value={formData.weeklyMin}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Weekly Max Price"
            type="number"
            name="weeklyMax"
            value={formData.weeklyMax}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Monthly Security Price"
            type="number"
            name="monthlySecurity"
            value={formData.monthlySecurity}
            onChange={handleChange}
            fullWidth
          />
        </div>

        {/* Location */}
        <h3 className="section-title">Location</h3>
        <div className="form-row">
          <FormControl fullWidth>
            <InputLabel>City</InputLabel>
            <Select
              value={formData.city}
              onChange={(e) => handleSelect("city", e.target.value)}
            >
              <MenuItem value="Delhi">Delhi</MenuItem>
              <MenuItem value="Mumbai">Mumbai</MenuItem>
              <MenuItem value="Bangalore">Bangalore</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="ZIP Code"
            type="number"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>State</InputLabel>
            <Select
              value={formData.state}
              onChange={(e) => handleSelect("state", e.target.value)}
            >
              <MenuItem value="Delhi">Delhi</MenuItem>
              <MenuItem value="Maharashtra">Maharashtra</MenuItem>
              <MenuItem value="Karnataka">Karnataka</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Contact */}
        <h3 className="section-title">Contact</h3>
        <div className="form-row">
          <TextField
            label="Contact Number"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
        </div>

        {/* Categories & Tags */}
        <h3 className="section-title">Categories & Tags</h3>
        <div className="form-row">
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              multiple
              value={formData.category}
              onChange={(e) => handleSelect("category", e.target.value)}
            >
              <MenuItem value="Hotel">Hotel</MenuItem>
              <MenuItem value="Villa">Villa</MenuItem>
              <MenuItem value="Apartment">Apartment</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Tags</InputLabel>
            <Select
              multiple
              value={formData.tags}
              onChange={(e) => handleSelect("tags", e.target.value)}
            >
              <MenuItem value="Luxury">Luxury</MenuItem>
              <MenuItem value="Budget">Budget</MenuItem>
              <MenuItem value="Family">Family</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Amenities</InputLabel>
            <Select
              multiple
              value={formData.amenities}
              onChange={(e) => handleSelect("amenities", e.target.value)}
            >
              <MenuItem value="Wifi">WiFi</MenuItem>
              <MenuItem value="Parking">Parking</MenuItem>
              <MenuItem value="Pool">Swimming Pool</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              onChange={(e) => handleSelect("status", e.target.value)}
            >
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Booked">Booked</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Options */}
        <h3 className="section-title">Options</h3>
        <div className="form-row">
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.luxury}
                onChange={handleCheckbox}
                name="luxury"
              />
            }
            label="Luxury Property"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.petFriendly}
                onChange={handleCheckbox}
                name="petFriendly"
              />
            }
            label="Pet Friendly"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.smokingAllowed}
                onChange={handleCheckbox}
                name="smokingAllowed"
              />
            }
            label="Smoking Allowed"
          />
        </div>

        {/* Check-in/out */}
        <h3 className="section-title">Check In / Out</h3>
        <div className="form-row">
          <TextField
            type="time"
            label="Check In Time"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            type="time"
            label="Check Out Time"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </div>

        {/* Images */}
        <h3 className="section-title">Property Images</h3>
        <div className="image-upload-row">
          <Button variant="outlined" component="label">
            Upload Images
            <input
              type="file"
              hidden
              multiple
              onChange={(e) => handleImageUpload(e)}
            />
          </Button>
          <div className="image-preview">
            {formData.images.map((file, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(file)}
                alt={`property-${idx}`}
              />
            ))}
          </div>
        </div>

        <h3 className="section-title">Cover Image</h3>
        <div className="image-upload-row">
          <Button variant="outlined" component="label">
            Upload Cover Image
            <input
              type="file"
              hidden
              onChange={(e) => handleImageUpload(e, true)}
            />
          </Button>
          <div className="image-preview">
            {formData.coverImage && (
              <img src={URL.createObjectURL(formData.coverImage)} alt="cover" />
            )}
          </div>
        </div>
      </DialogContent>

      <DialogActions className="dialog-actions">
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            backgroundColor: "#6a1b9a",
            "&:hover": {
              backgroundColor: "#4a148c", // darker shade on hover
            },
          }}
        >
          Save Property
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PropertyModal;
