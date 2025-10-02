import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  InputAdornment,
  Typography,
  Slider,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../../styles/user/PropertyListing.css";

const categories = ["Category 1", "Category 2", "Category 3", "Category 4"];

const PropertyListing = () => {
  const [locationName, setLocationName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [price, setPrice] = useState(""); // price input
  const [distance, setDistance] = useState<number>(5); // default 10km

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
        () => {
          setOpenDialog(true);
        }
      );
    } else {
      setOpenDialog(true);
    }
  }, []);

  return (
    <>
      {/* Location Permission Popup */}
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

      <Box className="plFilter">
        {/* Left Section */}
        <Box className="plFilterSecOne">
          {/* Search Bar without Icon */}
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search location..."
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#c14365",
                "& fieldset": {
                  borderColor: "#c14365",
                },
                "&:hover fieldset": {
                  borderColor: "#c14365",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#c14365",
              },
              minWidth: "250px",
            }}
          />

          {/* Category Multi-Select */}
          <Autocomplete
            multiple
            options={categories}
            value={selectedCategories}
            onChange={(e, newValue) => setSelectedCategories(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Filter by Category"
                variant="outlined"
              />
            )}
            sx={{
              minWidth: "250px",
              "& .MuiOutlinedInput-root": {
                color: "#c14365",
                "& fieldset": {
                  borderColor: "#c14365",
                },
                "&:hover fieldset": {
                  borderColor: "#c14365",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#c14365",
              },
              "& .MuiChip-root": {
                backgroundColor: "#c14365",
                color: "#fff",
                "& .MuiChip-deleteIcon": {
                  color: "#fff",
                },
              },
            }}
          />
        </Box>

        {/* Right Section: Price + Distance */}
        <Box className="plFilterSectwo" sx={{ display: "flex", gap: 2 }}>
          {/* Price Filter as Dropdown */}
          <TextField
            select
            label="Price Range"
            value={price || "lowToHigh"} // default Low to High
            onChange={(e) => setPrice(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon sx={{ color: "#c14365" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              flex: 1,
              "& .MuiOutlinedInput-root": {
                color: "#c14365",
                "& fieldset": {
                  borderColor: "#c14365",
                },
                "&:hover fieldset": {
                  borderColor: "#c14365",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#c14365",
              },
            }}
          >
            <MenuItem value="lowToHigh" selected>Low to High</MenuItem>
            <MenuItem value="highToLow">High to Low</MenuItem>
          </TextField>

          {/* Distance Filter */}
          <Box
            sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocationOnIcon sx={{ color: "#c14365" }} />
              <Typography
                variant="body2"
                sx={{ color: "#c14365", fontWeight: 600 }}
              >
                Distance: {distance} KM
              </Typography>
            </Box>
            <Slider
              value={distance}
              onChange={(e, newValue) => setDistance(newValue as number)}
              min={1}
              max={50}
              step={1}
              valueLabelDisplay="auto"
              sx={{
                color: "#c14365",
                "& .MuiSlider-thumb": {
                  backgroundColor: "#fff",
                  border: "2px solid #c14365",
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Search Button Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          sx={{
            backgroundColor: "#c14365",
            "&:hover": { backgroundColor: "#a83250" },
            paddingX: 3,
            paddingY: 1,
            fontWeight: 600,
            borderRadius: "8px",
          }}
        >
          Click here to search
        </Button>
      </Box>
    </>
  );
};

export default PropertyListing;
