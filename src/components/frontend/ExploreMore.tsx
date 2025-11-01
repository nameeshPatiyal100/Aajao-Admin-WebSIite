import React from "react";
import { Box, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ExploreMore: React.FC = () => {
  const properties = [
    { id: 1, img: "/room2.jpg", title: "Luxury Villa in Manali" },
    { id: 2, img: "/room3.jpg", title: "Cozy Cottage in Shimla" },
    { id: 3, img: "/room4.jpg", title: "Beach House in Goa" },
    { id: 4, img: "/room1.jpg", title: "Hill View Stay in Mussoorie" },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 2.5 } },
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1.2 } },
    ],
  };

  return (
    <Box
      sx={{
        mt: 5,
        p: { xs: 2, sm: 3 },
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
        maxWidth: { md: "65%" },
        ml: 0, // 👈 fully left aligned
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
        Explore Near By Places
      </Typography>

      <Box
        sx={{
          ".slick-slide": { px: 1 },
          ".slick-track": { display: "flex", alignItems: "center" },
        }}
      >
        <Slider {...sliderSettings}>
          {properties.map((item) => (
            <Box
              key={item.id}
              sx={{
                p: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={item.img}
                alt={item.title}
                sx={{
                  width: "100%",
                  height: { xs: 140, sm: 180 },
                  objectFit: "cover",
                  borderRadius: 2,
                  mb: 1.5,
                }}
              />
              <Typography
                sx={{
                  fontWeight: 600,
                  textAlign: "center",
                  color: "#333",
                }}
              >
                {item.title}
              </Typography>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default ExploreMore;
