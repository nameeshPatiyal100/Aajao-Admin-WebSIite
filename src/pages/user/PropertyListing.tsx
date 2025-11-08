import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  InputAdornment,
  Typography,
  Slider,
  IconButton,
  Drawer,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Link } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { HomePropCard } from "../../components";
import "../../styles/user/PropertyListing.css";

const PropertyListing = () => {
  const [locationName, setLocationName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [distance, setDistance] = useState<number>(5);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const priceOptions = [
    "₹0–₹1,000",
    "₹1,000–₹5,000",
    "₹5,000–₹10,000",
    "₹10,000+",
  ];
  const amenitiesOptions = ["WiFi", "Parking", "Pool", "AC", "TV", "Kitchen"];

  const togglePrice = (price: string) =>
    setSelectedPrices((prev) =>
      prev.includes(price) ? prev.filter((p) => p !== price) : [...prev, price]
    );

  const toggleAmenity = (amenity: string) =>
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );

  const properties = Array.from({ length: 15 }, (_, i) => ({
    image: `https://picsum.photos/400/250?random=${i + 1}`,
    name: `Property ${i + 1}`,
    description: "Beautiful stay with modern amenities and comfort.",
    location: "India",
    price: `₹${4000 + i * 300}/night`,
  }));

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            setLocationName(data.display_name || "");
          } catch {
            setLocationName("");
          }
        },
        () => setOpenDialog(true)
      );
    } else setOpenDialog(true);
  }, []);

  const filterContent = (
    <Box className="sidebarContent">
      {/* Search Field */}
      <Typography sx={{ color: "#c14365", fontWeight: 600, mb: 1 }}>
        Search
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search location..."
        value={locationName}
        onChange={(e) => setLocationName(e.target.value)}
        InputProps={{
          endAdornment: locationName && (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setLocationName("")}
                sx={{
                  color: "#c14365",
                  "&:hover": { backgroundColor: "rgba(193, 67, 101, 0.1)" },
                }}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "#c14365",
            "& fieldset": { borderColor: "#c14365" },
          },
          mb: 3,
        }}
      />

      {/* Distance Slider */}
      <Typography sx={{ color: "#c14365", fontWeight: 600 }}>
        Distance: {distance} KM
      </Typography>
      <Slider
        value={distance}
        onChange={(_e, val) => setDistance(val as number)}
        min={1}
        max={50}
        valueLabelDisplay="auto"
        sx={{
          color: "#c14365",
          "& .MuiSlider-thumb": {
            backgroundColor: "#fff",
            border: "2px solid #c14365",
          },
          mb: 3,
        }}
      />

      {/* Price Filter */}
      <Typography sx={{ color: "#c14365", fontWeight: 600, mb: 1 }}>
        Price Range
      </Typography>
      {priceOptions.map((price) => (
        <FormControlLabel
          key={price}
          control={
            <Checkbox
              checked={selectedPrices.includes(price)}
              onChange={() => togglePrice(price)}
              // sx={{ color: "#c14365" }}
              sx={{
                color: "#c14365", // default color when unchecked
                "&.Mui-checked": {
                  color: "#c14365", // color when checked
                },
              }}
            />
          }
          label={price}
        />
      ))}

      {/* Amenities Filter */}
      <Typography sx={{ color: "#c14365", fontWeight: 600, mt: 2, mb: 1 }}>
        Amenities
      </Typography>
      {amenitiesOptions.map((amenity) => (
        <FormControlLabel
          key={amenity}
          control={
            <Checkbox
              checked={selectedAmenities.includes(amenity)}
              onChange={() => toggleAmenity(amenity)}
              // sx={{ color: "#c14365 !impotant" }}
              sx={{
                color: "#c14365", // default color when unchecked
                "&.Mui-checked": {
                  color: "#c14365", // color when checked
                },
              }}
            />
          }
          label={amenity}
        />
      ))}

      <Button
        fullWidth
        variant="contained"
        startIcon={<SearchIcon />}
        sx={{
          mt: 3,
          py: 1,
          backgroundColor: "#c14365",
          "&:hover": { backgroundColor: "#a83250" },
        }}
      >
        Search
      </Button>
    </Box>
  );

  return (
    <>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Location Access Needed</DialogTitle>
        <DialogContent>
          Please allow access to your location for better search results.
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{ color: "#c14365" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Hamburger for Mobile */}
      <IconButton
        className="sidebarToggle"
        onClick={toggleDrawer}
        // sx={{
        //   position: "fixed",
        //   top: 90,
        //   left: 20,
        //   zIndex: 1300,
        //   backgroundColor: "#c14365",
        //   color: "#fff",
        //   "&:hover": { backgroundColor: "#a83250" },
        // }}
      >
        <MenuIcon />
      </IconButton>

      <Box className="propertyPageContainer">
        {/* Desktop Sidebar */}
        <Box className="sidebarSection">{filterContent}</Box>

        {/* Mobile Drawer */}
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={toggleDrawer}
          sx={{ "& .MuiDrawer-paper": { width: 280, padding: "20px" } }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6" sx={{ color: "#c14365", fontWeight: 600 }}>
              Filters
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <CloseIcon sx={{ color: "#c14365" }} />
            </IconButton>
          </Box>
          {filterContent}
        </Drawer>

        {/* Property Grid */}
        <Box className="propertyListingContainer">
          {properties.map((prop, idx) => (
            // <HomePropCard key={idx} {...prop} />
            <Link
              to={`/property/detail/1`}
              key={idx}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <HomePropCard {...prop} />
            </Link>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default PropertyListing;
