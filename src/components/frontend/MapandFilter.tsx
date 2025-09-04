import "../../styles/user/MapandFilter.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useEffect, useState } from "react";

import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  Typography,
  IconButton,
} from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { DateRangePicker } from "react-date-range";
import {
  Add,
  Remove,
  Wifi,
  Pool,
  Restaurant,
  LocalParking,
} from "@mui/icons-material";

const amenitiesList = [
  { id: 1, label: "WiFi", icon: <Wifi /> },
  { id: 2, label: "Pool", icon: <Pool /> },
  { id: 3, label: "Restaurant", icon: <Restaurant /> },
  { id: 4, label: "Parking", icon: <LocalParking /> },
];

const MapandFilter = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [error, setError] = useState(false);
  const [guests, setGuests] = useState(1);
  const [selectedAmenities, setSelectedAmenities] = useState<number[]>([]);
  //   const [dateRange, setDateRange] = useState([
  //     {
  //       startDate: new Date(),
  //       endDate: new Date(),
  //       key: "selection",
  //     },
  //   ]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError(true);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      () => {
        setError(true);
      }
    );
  }, []);

  const toggleAmenity = (id: number) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  return (
    <div className="outerMap">
      {/* Left Section */}
      <div className="filterSection">
        <Typography variant="h6" className="sectionHeading">
          Filters
        </Typography>

        {/* Search */}
        <TextField
          label="Search hotels"
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#c14365" },
            },
          }}
        />

        {/* Dropdown */}
        {/* <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <InputLabel sx={{ color: "#c14365", fontWeight: "bold" }}>
            Room Type
          </InputLabel>
          <Select
            defaultValue=""
            sx={{
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#c14365" },
            }}
          >
            <MenuItem value="single">Single</MenuItem>
            <MenuItem value="double">Double</MenuItem>
            <MenuItem value="suite">Suite</MenuItem>
          </Select>
        </FormControl> */}
        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <InputLabel
            sx={{
              color: "#c14365",
              fontWeight: "bold",
              "&.Mui-focused": { color: "#c14365" }, // keep label same on focus
            }}
          >
            Room Type
          </InputLabel>
          <Select
            defaultValue=""
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#c14365 !important", // default border
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#c14365 !important", // hover border
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#c14365 !important", // focus border
              },
            }}
          >
            <MenuItem value="single">Single</MenuItem>
            <MenuItem value="double">Double</MenuItem>
            <MenuItem value="suite">Suite</MenuItem>
          </Select>
        </FormControl>

        {/* Date Range */}
        {/* <Typography variant="subtitle1" className="sectionHeading">
          Booking Date
        </Typography>
        <DateRangePicker
          ranges={dateRange}
          onChange={(item) => setDateRange([item.selection])}
          moveRangeOnFirstSelection={false}
          rangeColors={["#c14365"]}
        /> */}

        {/* Amenities */}
        <Typography
          variant="subtitle1"
          className="sectionHeading"
          sx={{ mt: 2 }}
        >
          Amenities
        </Typography>
        <div className="amenitiesContainer">
          {amenitiesList.map((amenity) => (
            <Chip
              key={amenity.id}
              label={
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  {amenity.icon}
                  {amenity.label}
                </span>
              }
              clickable
              onClick={() => toggleAmenity(amenity.id)}
              sx={{
                border: "1px solid #c14365",
                fontSize: "0.95rem",
                padding: "0.5rem",
                minWidth: "120px",
                justifyContent: "center",
                fontWeight: "bold",
                color: selectedAmenities.includes(amenity.id)
                  ? "#fff"
                  : "#c14365", // text color
                backgroundColor: selectedAmenities.includes(amenity.id)
                  ? "#ab3864" // selected color
                  : "#fff", // default
                "&:hover": {
                  backgroundColor: selectedAmenities.includes(amenity.id)
                    ? "#922b50" // darker hover when selected
                    : "#f8e7ed", // light hover when not selected
                },
              }}
            />
          ))}
        </div>

        {/* Guests */}
        <Typography
          variant="subtitle1"
          className="sectionHeading"
          sx={{ mt: 5 }}
        >
          Number of Guests
        </Typography>
        <div className="guestCounter">
          <IconButton
            onClick={() => setGuests((g) => Math.max(1, g - 1))}
            sx={{
              border: "1px solid #c14365",
              borderRadius: 0,
              width: "100px",
              height: "40px",
            }}
          >
            <Remove />
          </IconButton>
          <div className="guestNumber">{guests}</div>
          <IconButton
            onClick={() => setGuests((g) => g + 1)}
            sx={{
              border: "1px solid #c14365",
              borderRadius: 0,
              width: "100px",
              height: "40px",
            }}
          >
            <Add />
          </IconButton>
        </div>

        {/* Apply Button */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            mt: 25,
            borderRadius: 3,
            textTransform: "none",
            backgroundColor: "#c14365",
          }}
          fullWidth
        >
          Apply Filters
        </Button>
      </div>

      {/* Right Section */}
      <div className="mapSection">
        {error ? (
          <div className="mapError">
            Location access denied. Cannot show map.
          </div>
        ) : position ? (
          <MapContainer
            center={position}
            zoom={13}
            style={{ height: "100%", width: "100%", borderRadius: "12px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>Your current location</Popup>
            </Marker>
          </MapContainer>
        ) : (
          <div className="mapLoading">Fetching location...</div>
        )}
      </div>
    </div>
  );
};

export default MapandFilter;
