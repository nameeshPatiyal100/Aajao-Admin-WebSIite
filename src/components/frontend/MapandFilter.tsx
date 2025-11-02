import React, { useEffect, useState } from "react";
import { Box, Typography, Card, Button, useMediaQuery } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MyLocationIcon from "@mui/icons-material/MyLocation";
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

// ✅ Recenter map button component
// const RecenterButton = ({ coordinates }: { coordinates: [number, number] }) => {
//   const map = useMap();

//   const handleRecenter = () => {
//     map.flyTo(coordinates, 14, { animate: true, duration: 1 });
//   };

//   return (
//     <Box
//       sx={{
//         position: "absolute",
//         top: 10,
//         right: 10,
//         zIndex: 9999,
//       }}
//     >
//       <Button
//         variant="contained"
//         onClick={handleRecenter}
//         sx={{
//           backgroundColor: "#c14365",
//           textTransform: "none",
//           fontSize: "0.8rem",
//           fontWeight: 600,
//           px: 2,
//           py: 0.5,
//           "&:hover": { backgroundColor: "#a83756" },
//         }}
//       >
//         Recenter
//       </Button>
//     </Box>
//   );
// };
const RecenterButton: React.FC<{ location: { lat: number; lng: number } }> = ({
  location,
}) => {
  const map = useMap();
  const handleRecenter = () => {
    map.setView(location, 14, { animate: true });
  };

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 20,
        right: 20,
        zIndex: 1000,
        width: 45,
        height: 45,
        borderRadius: "50%",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.2s ease",
        "&:hover": {
          backgroundColor: "#c14365",
          "& svg": { color: "#fff" },
        },
      }}
      onClick={handleRecenter}
    >
      <MyLocationIcon sx={{ color: "#c14365", fontSize: 26 }} />
    </Box>
  );
};

// ✅ Dual pulse marker effect
const MarkerPulse = ({ coordinates }: { coordinates: [number, number] }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const pulseIcon = L.divIcon({
      className: "custom-pulse",
      html: `
    <div class="pulse-wrapper">
      <div class="pulse-ring outer"></div>
      <div class="pulse-ring inner"></div>
    </div>
  `,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });

    const pulseMarker = L.marker(coordinates, { icon: pulseIcon }).addTo(map);

    if (!document.getElementById("pulse-style")) {
      const style = document.createElement("style");
      style.id = "pulse-style";
      style.innerHTML = `
    .pulse-wrapper {
      position: relative;
      width: 30px;
      height: 30px;
    }
    .pulse-ring {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      background: rgba(193, 67, 101, 0.6);
      opacity: 0.6;
    }
    .pulse-ring.outer {
      animation: pulseOuter 2s infinite;
    }
    .pulse-ring.inner {
      animation: pulseInner 2s infinite 0.5s;
      background: rgba(193, 67, 101, 0.8);
    }
    @keyframes pulseOuter {
      0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.8; }
      70% { transform: translate(-50%, -50%) scale(2.5); opacity: 0.2; }
      100% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.8; }
    }
    @keyframes pulseInner {
      0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.7; }
      70% { transform: translate(-50%, -50%) scale(1.8); opacity: 0.2; }
      100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.7; }
    }
  `;
      document.head.appendChild(style);
    }

    return () => {
      pulseMarker.remove();
    };
  }, [map, coordinates]);

  return null;
};

const MapandFilter: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [error, setError] = useState<string>("");

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
              <Marker position={location} icon={markerIcon}>
                <Popup>Your Current Location</Popup>
              </Marker>
              <MarkerPulse coordinates={[location.lat, location.lng]} />
              {/* <RecenterButton coordinates={[location.lat, location.lng]} /> */}
              <RecenterButton location={location} />
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
