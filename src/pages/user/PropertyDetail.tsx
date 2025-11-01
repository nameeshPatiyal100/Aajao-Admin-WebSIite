import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  Breadcrumbs,
  Link,
  Button,
  Rating,
  Avatar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PhoneIcon from "@mui/icons-material/Phone";
import "leaflet/dist/leaflet.css";
import "../../styles/user/PropertyDetail.css";
import Slider from "react-slick";
import { Roomimages } from "../../utils/reusableData";
import {
  PropertyBookingBox,
  PropDetailMap,
  CancellationPolicyModal,
  BookingSection,
  ExploreMore,
  PropertyGallery,
} from "../../components";

export const PropertyDetail: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rules] = useState<string[]>([
    "No smoking inside the property.",
    "Pets are not allowed.",
    "Please respect quiet hours after 10 PM.",
  ]);

  const reviews = [
    {
      name: "Aman Verma",
      rating: 4.5,
      comment:
        "Amazing stay! The host was very kind and the location was perfect. Will definitely book again!",
    },
    {
      name: "Priya Singh",
      rating: 5,
      comment:
        "The property was super clean and well-maintained. Loved the interiors and the peaceful vibe.",
    },
    {
      name: "Ravi Sharma",
      rating: 4,
      comment:
        "Good experience overall. Check-in was smooth and amenities were as described.",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 900, settings: { slidesToShow: 2.3 } },
      { breakpoint: 600, settings: { slidesToShow: 1.8 } },
      { breakpoint: 400, settings: { slidesToShow: 1.3 } },
    ],
  };

  const images = [
    "/room2.jpg",
    "/room3.jpg",
    "/room4.jpg",
    "/room1.jpg",
    "/room2.jpg",
  ];

  const bookingBoxRef = useRef<HTMLDivElement | null>(null);
  const INITIAL_TOP = 150;
  const GAP_FROM_FOOTER = 24;

  useEffect(() => {
    const handleScrollOrResize = () => {
      const box = bookingBoxRef.current;
      const footer = document.querySelector("footer");

      if (!box) return;
      const mobileBreakpoint = 900;
      if (window.innerWidth <= mobileBreakpoint) {
        box.style.position = "";
        box.style.top = "";
        return;
      }

      if (!footer) {
        box.style.position = "fixed";
        box.style.top = `${INITIAL_TOP}px`;
        return;
      }

      box.style.position = "fixed";
      const bookingHeight = box.offsetHeight;
      const footerRect = footer.getBoundingClientRect();
      const initialBottom = INITIAL_TOP + bookingHeight;
      const footerTop = footerRect.top;

      if (initialBottom > footerTop - GAP_FROM_FOOTER) {
        const adjustedTop = Math.max(
          8,
          footerTop - GAP_FROM_FOOTER - bookingHeight
        );
        box.style.top = `${adjustedTop}px`;
      } else {
        box.style.top = `${INITIAL_TOP}px`;
      }
    };

    handleScrollOrResize();
    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, []);

  return (
    <Box
      sx={{
        px: { xs: 1.5, sm: 2.5, md: 4 },
        py: { xs: 2, sm: 3 },
        maxWidth: 1600,
        margin: "0 auto",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      {/* Breadcrumb */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: { xs: 2, sm: 3 },
          flexWrap: "wrap",
        }}
      >
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

      {/* MAIN GRID */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "65% 32%" },
          gap: { xs: 3, md: 4 },
          alignItems: "flex-start",
          position: "relative",
        }}
      >
        {/* LEFT SECTION */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, sm: 3 },
            backgroundColor: "#f9f9f9",
            p: { xs: 1.5, sm: 2 },
            borderRadius: 2,
            boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
            mr: { md: 3 },
          }}
        >
          {/* Main Image */}
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

          {/* Slick Slider */}
          <Box
            sx={{
              ".slick-slide": { px: 1 },
              ".slick-track": {
                display: "flex",
                alignItems: "center",
              },
              mb: 1,
            }}
          >
            <Slider {...sliderSettings}>
              {images.map((img, i) => (
                <Box
                  key={i}
                  component="img"
                  src={img}
                  alt={`room${i}`}
                  sx={{
                    width: "100%",
                    height: { xs: 80, sm: 100, md: 120 },
                    objectFit: "cover",
                    borderRadius: 2,
                    cursor: "pointer",
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                />
              ))}
            </Slider>
          </Box>

          <PropertyBookingBox />
        </Box>

        {/* RIGHT SECTION (Sticky) */}
        <Box ref={bookingBoxRef} className="sticky-booking-box">
          <BookingSection />
        </Box>
      </Box>

      {/* Property Description */}
      <Box
        sx={{
          mt: 5,
          p: { xs: 2, sm: 3 },
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
          maxWidth: { md: "65%" },
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

      {/* Property Rules */}
      <Box
        sx={{
          mt: 3,
          p: { xs: 2, sm: 3 },
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
          maxWidth: { md: "65%" },
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

        {rules.length ? (
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
          <Typography sx={{ fontSize: 14, color: "#777", fontStyle: "italic" }}>
            No rules
          </Typography>
        )}
      </Box>

      {/* Owner + Map */}
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          maxWidth: { md: "65%" },
        }}
      >
        <Box
          sx={{
            p: { xs: 2, sm: 3 },
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

          <Typography sx={{ fontSize: 14, color: "#666", mb: 2 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            alias, sapiente placeat facilis.
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
              width: "fit-content",
              "&:hover": { backgroundColor: "#c14365", color: "#fff" },
            }}
          >
            <PhoneIcon />
            Contact agent
          </Box>
        </Box>

        <Box
          sx={{
            minHeight: { xs: 250, sm: 300, md: 350 },
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          <PropDetailMap
            coordinates={[30.7333, 76.7794]}
            popupText="Property located in Chandigarh"
          />
        </Box>
      </Box>

      {/* Gallery, Reviews, Explore More */}
      {/* <PropertyGallery /> */}
      <PropertyGallery Images={Roomimages || []} />
      <Box
        sx={{
          mt: 5,
          p: { xs: 2, sm: 3 },
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
          maxWidth: { md: "65%" },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 20, sm: 22 },
            fontWeight: 700,
            color: "#c14365",
            mb: 3,
          }}
        >
          Guest Reviews
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {reviews.map((review, idx) => (
            <Box
              key={idx}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                gap: 2,
                p: 2,
                borderRadius: 2,
                backgroundColor: "#fafafa",
                border: "1px solid #eee",
              }}
            >
              <Avatar sx={{ bgcolor: "#c14365" }}>
                {review.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography sx={{ fontWeight: 600 }}>{review.name}</Typography>
                <Rating
                  value={review.rating}
                  precision={0.5}
                  readOnly
                  size="small"
                  sx={{ color: "#c14365", mb: 0.5 }}
                />
                <Typography sx={{ fontSize: 14, color: "#555" }}>
                  {review.comment}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <ExploreMore />

      <CancellationPolicyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Box>
  );
};

export default PropertyDetail;
