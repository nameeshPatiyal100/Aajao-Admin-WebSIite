import React, { useEffect, useState } from "react";
import { Box, Typography, Card, Button, useMediaQuery } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { motion } from "motion/react";

import RecenterButton from "./RecenterButton";
// import HotelTooltip from "./HotelTooltip";
import MarkerPulse from "./MarkerPulse";
import HotelMarkers from "./HotelMarkers";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import prebooking from "../../assets/provided asset/booking.png";
import crown1 from "../../assets/provided asset/LUX.png";
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

  const [hotels, setHotels] = useState<
    {
      id: number;
      name: string;
      price: number;
      lat: number;
      lng: number;
      image: string;
    }[]
  >([]);

  // const markerColor = "#c14365";
  const hotelIcon = new L.DivIcon({
    className: "custom-hotel-marker",
    html: `
    <div style="
      background-color: #c14365;
      color: white;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid white;
      box-shadow: 0 0 6px rgba(0,0,0,0.3);
      font-size: 18px;
      cursor: pointer;
    ">
      🏠
    </div>
  `,
    // iconAnchor: [18, 36],
    // popupAnchor: [0, -36],
    iconSize: [38, 48],
    iconAnchor: [19, 48],
    popupAnchor: [0, -45],
  });

  useEffect(() => {
    if (location) {
      // ✅ Dummy nearby hotels data (same shape as future API)
      const dummyHotels = [
        {
          id: 1,
          name: "Himalayan View Resort",
          price: 3200,
          lat: location.lat + 0.01,
          lng: location.lng + 0.01,
          image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        },
        {
          id: 2,
          name: "Mountain Breeze Inn",
          price: 2800,
          lat: location.lat - 0.008,
          lng: location.lng + 0.009,
          image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
        },
        {
          id: 3,
          name: "Snow Valley Retreat",
          price: 4000,
          lat: location.lat + 0.007,
          lng: location.lng - 0.006,
          image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        },
        {
          id: 4,
          name: "River Edge Lodge",
          price: 2600,
          lat: location.lat - 0.009,
          lng: location.lng - 0.005,
          image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
        },
      ];

      // ✅ Simulate API call delay
      setTimeout(() => setHotels(dummyHotels), 1000);
    }
  }, [location]);

  const markerIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl:
      "[https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png](https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png)",
    iconSize: [32, 48],
    iconAnchor: [16, 48],
  });

  const isMobile = useMediaQuery("(max-width:600px)");

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
            width: { xs: "100%", sm: "70%", md: "50%" },
            display: "flex",
            flexWrap: "wrap",
            // border: "1px solid black",
            justifyContent: {
              xs: "center",
              sm: "space-between",
              md: "space-between",
            },
            // justifyContent: "space-between",
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
                flexDirection: isMobile ? "column" : "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                width: { xs: "30%", sm: "auto" }, // ✅ 3 items in one row, 2 below on mobile
                gap: isMobile ? 1 : 0,
              }}
            >
              <Box
                component="img"
                src={cat.img}
                alt={cat.label}
                sx={{
                  width: { xs: 45, sm: 60 },
                  height: { xs: 45, sm: 60 },
                  objectFit: "contain",
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: "#c14365",
                  fontSize: { xs: "0.8rem", sm: "1rem" },
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                {cat.label}{" "}
              </Typography>{" "}
            </Box>
          ))}{" "}
        </Box>

        {/* ✅ Action Buttons */}
        <Box
          sx={{
            width: { xs: "100%", sm: "80%", md: "50%" },
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            // border: "1px solid black",
            gap: { xs: 2, sm: 3 },
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
                  width: { xs: 28, sm: 35, md: 40 },
                  height: { xs: 28, sm: 35, md: 40 },
                }}
              />
            }
            sx={{
              backgroundColor: "#c14365",
              textTransform: "none",
              width: { xs: "48%", sm: "45%", md: 300 },
              fontSize: { xs: "0.85rem", sm: "0.95rem" },
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
                  width: { xs: 28, sm: 35, md: 40 },
                  height: { xs: 28, sm: 35, md: 40 },
                }}
              />
            }
            sx={{
              borderColor: "#c14365",
              color: "#c14365",
              textTransform: "none",
              fontSize: { xs: "0.85rem", sm: "0.95rem" },
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              width: { xs: "48%", sm: "45%", md: "45%" },
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
      <Box sx={{ width: "100%", p: { xs: 1, sm: 2 }, position: "relative" }}>
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
              scrollWheelZoom
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* ✅ User’s location */}
              <Marker position={location} icon={markerIcon}>
                <Popup>Your Current Location</Popup>
              </Marker>

              <MarkerPulse coordinates={[location.lat, location.lng]} />
              <RecenterButton location={location} />

              {/* ✅ Custom Hotel Markers */}
              {/* <HotelMarkers hotels={hotels} hotelIcon={hotelIcon} /> */}
              <HotelMarkers hotels={hotels} hotelIcon={hotelIcon} />

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
