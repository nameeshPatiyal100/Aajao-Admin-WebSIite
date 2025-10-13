import React, { useEffect, useState } from "react";
// import "../../styles/user/MapandFilter.css";
import { Box, Typography, Card, Button } from "@mui/material";

import prebooking from "../../assets/UI/prebooking.png";
import crown1 from "../../assets/UI/crown1.png";
import single from "../../assets/UI/single.png";
import couple3 from "../../assets/UI/couple3.png";
import family from "../../assets/UI/family.png";
import sharing from "../../assets/UI/sharing.png";

const categories = [
  { img: single, label: "Single" },
  { img: couple3, label: "Couple" },
  { img: family, label: "Family" },
  { img: sharing, label: "Sharing" },
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
        () => {
          setError("Location access denied. Showing fallback location.");
        }
      );
    } else {
      setError("Geolocation not supported by your browser.");
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "300px",
          // marginTop: 2,
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          borderRadius: "12px", // optional, for smoother edges
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)", // 👈 shadow added
          backgroundColor: "#fff", // helps shadow show better
        }}
      >
        <Box
          sx={{
            width: "50%",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
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
              }}
            >
              <Box
                component="img"
                src={cat.img}
                alt={cat.label}
                sx={{
                  width: 80,
                  height: 80,
                  objectFit: "contain",
                  mb: 0.5,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: "#c14365", // theme color
                  fontSize: "1rem",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                }}
              >
                {cat.label}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            width: "25%",
            height: "150px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            startIcon={
              <Box
                component="img"
                src={prebooking}
                alt="Prebooking"
                sx={{ width: 50, height: 50 }}
              />
            }
            sx={{
              backgroundColor: "#c14365",
              textTransform: "none",
              width: 200,
              fontSize: "1rem",
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
                sx={{ width: 50, height: 50 }}
              />
            }
            sx={{
              borderColor: "#c14365",
              color: "#c14365",
              textTransform: "none",
              fontSize: "1rem",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#c1436510",
                borderColor: "#c14365",
              },
            }}
          >
            Luxury Properties
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          // mt: 4,
          p: { xs: 1, sm: 2 },
        }}
      >
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
