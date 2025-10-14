import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Breadcrumbs,
  Link,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PhoneIcon from "@mui/icons-material/Phone";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { PropertyBookingBox, ReviewSliderAdvanced,CancellationPolicyModal } from "../../components";
// import {  } from "../../components";

export const PropertyDetail: React.FC = () => {
  const chandigarhCoords: [number, number] = [30.7333, 76.7794];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rules, _setRules] = useState<string[]>([
    "No smoking inside the property.",
    "Pets are not allowed.",
    "Please respect quiet hours after 10 PM.",
  ]);

  const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <Box
      sx={{
        padding: 3,
        maxWidth: 1600,
        margin: "0 auto",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      {/* Breadcrumb */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <IconButton sx={{ color: "#c14365" }}>
          <ArrowBackIcon />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">Property Detail</Typography>
        </Breadcrumbs>
      </Box>

      {/* Main Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        {/* Left Section */}
        <Box
          sx={{
            flex: { xs: "1 1 100%", md: "0 0 68%" },
            display: "flex",
            flexDirection: "column",
            gap: 2,
            backgroundColor: "#f9f9f9",
            p: 2,
            borderRadius: 2,
            boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          <Box
            component="img"
            src="/room1.jpg"
            alt="cover"
            sx={{
              width: "100%",
              height: { xs: 220, sm: 300, md: 400 },
              objectFit: "cover",
              borderRadius: 2,
            }}
          />

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {["/room2.jpg", "/room3.jpg", "/room4.jpg", "/room1.jpg"].map(
              (img, i) => (
                <Box
                  component="img"
                  key={i}
                  src={img}
                  alt={`room${i}`}
                  sx={{
                    flex: "1 0 22%",
                    minWidth: 80,
                    height: { xs: 80, sm: 100, md: 120 },
                    objectFit: "cover",
                    borderRadius: 1,
                    cursor: "pointer",
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                />
              )
            )}
          </Box>

          {/* Booking Box */}
          <PropertyBookingBox />
        </Box>

        {/* Right Section */}
        <Box
          sx={{
            flex: { xs: "1 1 100%", md: "0 0 30%" },
            display: "flex",
            flexDirection: "column",
            gap: 2,
            height: "100%",
          }}
        >
          {/* Owner Box */}
          <Box
            sx={{
              p: 2,
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: 20, mb: 1 }}>
              Owner's Details
            </Typography>
            <Typography sx={{ fontWeight: 600, fontSize: 16, mb: 1 }}>
              Mr Joe Doe
            </Typography>
            <Typography sx={{ fontSize: 14, color: "#666", mb: 1 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Architecto alias, sap
            </Typography>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1,
                border: "2px solid #c14365",
                borderRadius: 1,
                color: "#c14365",
                fontWeight: 600,
                cursor: "pointer",
                "&:hover": { backgroundColor: "#c14365", color: "#fff" },
              }}
            >
              <PhoneIcon />
              Contact agent
            </Box>
          </Box>

          {/* Map Box */}
          <Box
            sx={{
              height: { xs: 200, sm: 250, md: 300 },
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
            }}
          >
            <MapContainer
              center={chandigarhCoords}
              zoom={13}
              scrollWheelZoom={false}
              style={{ width: "100%", height: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              />
              <Marker position={chandigarhCoords} icon={markerIcon}>
                <Popup>Property located in Chandigarh</Popup>
              </Marker>
            </MapContainer>
          </Box>
        </Box>
      </Box>

      {/* Property Description */}
      <Box
        sx={{
          mt: 4,
          p: 3,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
          fontFamily: "Roboto, sans-serif",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 20, sm: 22 },
            fontWeight: 700,
            color: "#c14365",
            mb: 2,
          }}
        >
          Property Description
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 14, sm: 16 },
            lineHeight: 1.8,
            color: "#555",
            mb: 3,
          }}
        >
          This luxury apartment offers a perfect blend of comfort and elegance.
          Located in the heart of Chennai, it features spacious rooms, modern
          interiors, and access to premium amenities such as a swimming pool,
          parking facilities, and high-speed WiFi.
        </Typography>

        {/* Cancellation Policy Button */}
        <Button
          variant="outlined"
          sx={{
            borderColor: "#c14365",
            color: "#c14365",
            borderRadius: "8px",
            px: 3,
            py: 1,
            fontWeight: 600,
            textTransform: "none",
            "&:hover": { bgcolor: "#c14365", color: "#fff" },
          }}
          onClick={() => setIsModalOpen(true)}
        >
          Cancellation Policy
        </Button>
      </Box>

      {/* 🏠 Property Rules */}
      <Box
        sx={{
          mt: 3,
          p: 3,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 20, sm: 22 },
            fontWeight: 700,
            color: "#c14365",
            mb: 2,
          }}
        >
          Property Rules
        </Typography>

        {rules.length > 0 ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {rules.map((rule, index) => (
              <Typography
                key={index}
                sx={{ fontSize: { xs: 14, sm: 16 }, color: "#555" }}
              >
                • {rule}
              </Typography>
            ))}
          </Box>
        ) : (
          <Typography
            sx={{
              fontSize: { xs: 14, sm: 16 },
              color: "#777",
              fontStyle: "italic",
            }}
          >
            No rules
          </Typography>
        )}
      </Box>

      <ReviewSliderAdvanced propertyId="property-123" />

      {/* Modal */}
      <CancellationPolicyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Box>
  );
};
