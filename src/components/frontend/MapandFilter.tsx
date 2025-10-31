import React, { useEffect, useState } from "react";
import { Box, Typography, Card, Button } from "@mui/material";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// import couple3 from "../../assets/UI/couple3.png";
// import prebooking from "../../assets/UI/prebooking.png";
// import single from "../../assets/UI/single.png";
import prebooking from "../../assets/provided asset/booking.png";
import crown1 from "../../assets/UI/crown1.png";
import single from "../../assets/provided asset/single.png";
import couple3 from "../../assets/provided asset/couple.png";
import family from "../../assets/provided asset/family.png";
import sharing from "../../assets/provided asset/sharing.png";
import party from "../../assets/provided asset/party.png";

const categories = [
  { img: single, label: "Single" },
  { img: couple3, label: "Couple" },
  { img: family, label: "Family" },
  { img: sharing, label: "Sharing" },
  { img: party, label: "Party" },
];

const MapandFilter: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => setError("Location access denied. Showing fallback location.")
      );
    } else {
      setError("Geolocation not supported by your browser.");
    }
  }, []);

  return (
    <>
      {/* ✅ Responsive Top Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          minHeight: { xs: "auto", sm: 280, md: 300 },
          alignItems: "center",
          justifyContent: "space-evenly",
          p: { xs: 1.5, sm: 2 },
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
          backgroundColor: "#fff",
          mb: { xs: 2, sm: 3 },
        }}
      >
        {/* ✅ Category Section */}
        <Box
          sx={{
            width: "50%",
            // border:"1px solid black",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: { xs: 2, sm: 3, md: 4 },
            mb: { xs: 2, sm: 0 },
          }}
        >
          {categories.map((cat, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                width: { xs: "40%", sm: "auto" }, // ✅ 2 items per row on mobile
              }}
            >
              <Box
                component="img"
                src={cat.img}
                alt={cat.label}
                sx={{
                  width: { xs: 60, sm: 70, md: 80 },
                  height: { xs: 60, sm: 70, md: 80 },
                  objectFit: "contain",
                  mb: 0.5,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: "#c14365",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                {cat.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* ✅ Buttons Section */}
        {/* <Box
          sx={{
            width: { xs: "100%", sm: "70%", md: "25%" },
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            // border:"1px solid black",
            justifyContent: "space-between",
            gap: { xs: 2, sm: 3 },
            mt: { xs: 2, sm: 0 },
          }}
        >
          <Button
            variant="contained"
            startIcon={
              <Box
                component="img"
                src={prebooking}
                alt="Prebooking"
                sx={{ width: { xs: 35, sm: 50 }, height: { xs: 35, sm: 50 } }}
              />
            }
            sx={{
              backgroundColor: "#c14365",
              textTransform: "none",
              width: { xs: "100%", sm: 200 },
              fontSize: { xs: "0.9rem", sm: "1rem" },
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              "&:hover": { backgroundColor: "#a83756" },
            }}
          >
            Prebooking
          </Button>

          <Button
            variant="outlined"
            startIcon={
              <Box
                component="img"
                src={crown1}
                alt="Luxury"
                sx={{ width: { xs: 35, sm: 50 }, height: { xs: 35, sm: 50 } }}
              />
            }
            sx={{
              borderColor: "#c14365",
              color: "#c14365",
              textTransform: "none",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              width: { xs: "100%", sm: "auto" },
              "&:hover": {
                backgroundColor: "#c1436510",
                borderColor: "#c14365",
              },
            }}
          >
            Luxury Properties
          </Button>
        </Box> */}

        <Box
          sx={{
            width: { xs: "100%", sm: "80%", md: "30%" },
            display: "flex",
            // border: "1px solid black",
            flexDirection: "row",
            // flexDirection: { xs: "column", sm: "row", md: "row" },
            alignItems: "center",
            justifyContent: {
              xs: "center",
              sm: "space-between",
              md: "space-between",
            },
            gap: { xs: 2, sm: 3 },
            // flexWrap: { xs: "wrap", sm: "nowrap" },
            mt: { xs: 2, sm: 0 },
          }}
        >
          <Button
            variant="contained"
            startIcon={
              <Box
                component="img"
                src={prebooking}
                alt="Prebooking"
                sx={{
                  width: { xs: 28, sm: 35, md: 45 },
                  height: { xs: 28, sm: 35, md: 45 },
                }}
              />
            }
            sx={{
              backgroundColor: "#c14365",
              textTransform: "none",
              width: { xs: "48%", sm: "45%", md: 200 }, // ✅ half width on mobile
              fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" },
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              "&:hover": { backgroundColor: "#a83756" },
            }}
          >
            Prebooking
          </Button>

          <Button
            variant="outlined"
            startIcon={
              <Box
                component="img"
                src={crown1}
                alt="Luxury"
                sx={{
                  width: { xs: 28, sm: 35, md: 45 },
                  height: { xs: 28, sm: 35, md: 45 },
                }}
              />
            }
            sx={{
              borderColor: "#c14365",
              color: "#c14365",
              textTransform: "none",
              fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" },
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              width: { xs: "48%", sm: "45%", md: "auto" }, // ✅ half width on mobile
              "&:hover": {
                backgroundColor: "#c1436510",
                borderColor: "#c14365",
              },
            }}
          >
            Luxury Homes
          </Button>
        </Box>
      </Box>

      {/* ✅ Map Section */}
      {/* <Box sx={{ width: "100%", p: { xs: 1, sm: 2 } }}>
        <Card
          sx={{
            width: "100%",
            height: { xs: 300, sm: 400, md: 500 },
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: 4,
          }}
        >
          {location ? (
            <iframe
              title="user-location-map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${location.lat},${location.lng}&z=14&output=embed`}
            ></iframe>
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                color: "#c14365",
                backgroundColor: "#f9f9f9",
                textAlign: "center",
                p: 2,
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                {error ? "Location Error" : "Fetching your location..."}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {error || "Please allow location access to view the map."}
              </Typography>
            </Box>
          )}
        </Card>
      </Box> */}
      {/* ✅ Map Section */}
      {/* <Box sx={{ width: "100%", p: { xs: 1, sm: 2 } }}>
        <Card
          sx={{
            width: "100%",
            height: { xs: 300, sm: 400, md: 500 },
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: 4,
          }}
        >
          {location ? (
            // <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <LoadScript googleMapsApiKey="AIzaSyDUMMY-EXAMPLE-KEY-1234567890">
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={location}
                zoom={14}
                options={{
                  disableDefaultUI: false,
                  zoomControl: true,
                  mapTypeControl: false,
                  streetViewControl: false,
                }}
              >
                <Marker position={location} />
              </GoogleMap>
            </LoadScript>
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                color: "#c14365",
                backgroundColor: "#f9f9f9",
                textAlign: "center",
                p: 2,
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                {error ? "Location Error" : "Fetching your location..."}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {error || "Please allow location access to view the map."}
              </Typography>
            </Box>
          )}
        </Card>
      </Box> */}

      {/* ✅ Map Section (React Leaflet version – no API key needed) */}
      <Box sx={{ width: "100%", p: { xs: 1, sm: 2 } }}>
        <Card
          sx={{
            width: "100%",
            height: { xs: 300, sm: 400, md: 500 },
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: 4,
          }}
        >
          {location ? (
            <MapContainer
              center={location}
              zoom={14}
              style={{ width: "100%", height: "100%" }}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={location}>
                <Popup>Your Current Location</Popup>
              </Marker>
            </MapContainer>
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                color: "#c14365",
                backgroundColor: "#f9f9f9",
                textAlign: "center",
                p: 2,
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>
                {error ? "Location Error" : "Fetching your location..."}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {error || "Please allow location access to view the map."}
              </Typography>
            </Box>
          )}
        </Card>
      </Box>
    </>
  );
};

export default MapandFilter;
