import React from "react";
import { Box, Typography } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ Custom Map Marker
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [32, 48],
  iconAnchor: [16, 48],
  popupAnchor: [0, -40],
});

interface ResponsiveMapProps {
  coordinates: [number, number];
  popupText?: string;
}

const PropDetailMap: React.FC<ResponsiveMapProps> = ({
  coordinates,
  popupText = "Property Location",
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: 250, sm: 320, md: 400 },
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        "& .leaflet-container": {
          width: "100%",
          height: "100%",
        },
        transition: "all 0.4s ease",
        "&:hover": {
          boxShadow: "0 10px 30px rgba(193, 67, 101, 0.3)",
          transform: "scale(1.01)",
        },
      }}
    >
      {/* ✅ Map Container */}
      <MapContainer
        center={coordinates}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100%", zIndex: 1 }}
      >
        {/* Modern & Clean Map Tiles */}
        <TileLayer
        //   url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        //   url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        //   url="https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png"
        
          attribution='&copy; <a href="http://carto.com/attributions">CARTO</a>'
        />

        {/* Marker */}
        <Marker position={coordinates} icon={markerIcon}>
          <Popup>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {popupText}
            </Typography>
          </Popup>
        </Marker>
      </MapContainer>

      {/* ✅ Overlay Gradient for Professional Feel */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.25) 100%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* ✅ Optional Floating Label on Top */}
      <Box
        sx={{
          position: "absolute",
          top: 10,
          left: 15,
          backgroundColor: "#c14365",
          color: "#fff",
          px: 2,
          py: 0.5,
          borderRadius: "20px",
          fontSize: { xs: "0.75rem", sm: "0.85rem" },
          fontWeight: 600,
          zIndex: 3,
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      >
        Property Map
      </Box>

      {/* ✅ Marker Pulse Animation */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -100%)",
          width: 20,
          height: 24,
          borderRadius: "50%",
          backgroundColor: "rgba(193, 67, 101, 0.6)",
          animation: "pulse 1.5s infinite",
          zIndex: 1,
          "@keyframes pulse": {
            "0%": {
              transform: "translate(-50%, -100%) scale(0.8)",
              opacity: 0.7,
            },
            "50%": {
              transform: "translate(-50%, -100%) scale(1.2)",
              opacity: 0.3,
            },
            "100%": {
              transform: "translate(-50%, -100%) scale(0.8)",
              opacity: 0.7,
            },
          },
        }}
      />
    </Box>
  );
};

export default PropDetailMap;
