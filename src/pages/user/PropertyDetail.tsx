import React from "react";
import Slider from "react-slick";
import {
  Box,
  Typography,
  IconButton,
  Breadcrumbs,
  Link,
  // useTheme,
  // useMediaQuery,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PhoneIcon from "@mui/icons-material/Phone";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import {
  HomePropCard,
  PropertyBookingBox,
  ReviewSliderAdvanced,
} from "../../components";

export const PropertyDetail: React.FC = () => {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const similarProperties = [
    {
      image: "/room2.jpg",
      name: "Luxury Apartment",
      description: "Modern interiors with a beautiful view.",
      location: "Chennai, India",
      price: "₹2000/night",
    },
    {
      image: "/room3.jpg",
      name: "Cozy Studio",
      description: "Perfect for solo travelers.",
      location: "Chennai, India",
      price: "₹1200/night",
    },
    {
      image: "/room4.jpg",
      name: "Family Apartment",
      description: "Spacious apartment for family stay.",
      location: "Chennai, India",
      price: "₹2500/night",
    },
    {
      image: "/room1.jpg",
      name: "Modern Flat",
      description: "Elegant interiors with premium amenities.",
      location: "Chennai, India",
      price: "₹1800/night",
    },
  ];

  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <Box
        onClick={onClick}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#c14365",
          borderRadius: "50%",
          width: 35,
          height: 35,
          position: "absolute",
          right: -15,
          top: "40%",
          zIndex: 10,
          cursor: "pointer",
          color: "#fff",
          "&:hover": { backgroundColor: "#ab3864" },
        }}
      >
        &gt;
      </Box>
    );
  };

  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <Box
        onClick={onClick}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#c14365",
          borderRadius: "50%",
          width: 35,
          height: 35,
          position: "absolute",
          left: -15,
          top: "40%",
          zIndex: 10,
          cursor: "pointer",
          color: "#fff",
          "&:hover": { backgroundColor: "#ab3864" },
        }}
      >
        &lt;
      </Box>
    );
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const chandigarhCoords: [number, number] = [30.7333, 76.7794];

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
        {/* Left Side */}
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

        {/* Right Side */}
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
      {/* Description */}
      <Box
        sx={{
          mt: 4,
          p: 3,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <Typography
          sx={{ fontSize: 22, fontWeight: 600, color: "#c14365", mb: 2 }}
        >
          Property Description
        </Typography>
        <Typography sx={{ fontSize: 16, lineHeight: 1.6, color: "#555" }}>
          This luxury apartment offers a perfect blend of comfort and elegance.
          Located in the heart of Chennai, the property features spacious rooms,
          modern interiors, and access to premium amenities like a swimming
          pool, parking facilities, and high-speed WiFi. Ideal for families and
          business travelers alike, this homestay ensures both relaxation and
          convenience.
        </Typography>
      </Box>
      // Inside return JSX, before Similar Properties section
      <ReviewSliderAdvanced propertyId="property-123" />
      {/* Similar Properties */}
      <Box sx={{ mt: 6 }}>
        <Typography sx={{ fontSize: 22, fontWeight: 600, mb: 3 }}>
          Similar Properties You May Like
        </Typography>
        <Box sx={{ position: "relative" }}>
          <Slider {...sliderSettings}>
            {similarProperties.map((prop, index) => (
              <HomePropCard key={index} {...prop} />
            ))}
          </Slider>
        </Box>
      </Box>
    </Box>
  );
};
