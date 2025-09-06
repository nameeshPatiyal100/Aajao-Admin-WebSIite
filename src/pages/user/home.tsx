import Slider from "react-slick";
import { Box, Typography, Button, Grid } from "@mui/material";
import {
  MapandFilter,
  WhyChooseUs,
  CTAoneHome,
  HomeCategorySection,
  HomeCustomGrid,
  HomePropCard,
} from "../../components";
// import Grid from "@mui/material/Unstable_Grid2";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const roomImages = ["/room1.jpg", "/room2.jpg", "/room3.jpg", "/room4.jpg"];

const Home = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  // 🔹 Hotels Array
  const hotels = [
    {
      image: "/room1.jpg",
      name: "Grand Palace Hotel",
      description: "Luxury stay with modern amenities and great service.",
      location: "New Delhi, India",
      price: "₹5,500 / night",
    },
    {
      image: "/room2.jpg",
      name: "Ocean View Resort",
      description: "Wake up to stunning sea views and fresh air.",
      location: "Goa, India",
      price: "₹7,200 / night",
    },
    {
      image: "/room3.jpg",
      name: "Mountain Retreat",
      description: "Peaceful getaway in the hills with cozy rooms.",
      location: "Manali, India",
      price: "₹4,200 / night",
    },
    {
      image: "/room4.jpg",
      name: "City Lights Inn",
      description: "Stay in the heart of the city with premium service.",
      location: "Mumbai, India",
      price: "₹6,000 / night",
    },
    {
      image: "/room1.jpg",
      name: "Desert Oasis",
      description: "Experience the charm of desert landscapes and comfort.",
      location: "Rajasthan, India",
      price: "₹3,800 / night",
    },

    {
      image: "/room3.jpg",
      name: "Mountain Retreat",
      description: "Peaceful getaway in the hills with cozy rooms.",
      location: "Manali, India",
      price: "₹4,200 / night",
    },
    {
      image: "/room4.jpg",
      name: "City Lights Inn",
      description: "Stay in the heart of the city with premium service.",
      location: "Mumbai, India",
      price: "₹6,000 / night",
    },
    {
      image: "/room1.jpg",
      name: "Desert Oasis",
      description: "Experience the charm of desert landscapes and comfort.",
      location: "Rajasthan, India",
      price: "₹3,800 / night",
    }
  ];

  return (
    <Box>
      {/* Hero Slider */}
      <Box sx={{ position: "relative" }}>
        <Slider {...sliderSettings}>
          {roomImages.map((src, idx) => (
            <Box key={idx}>
              <Box
                component="img"
                src={src}
                alt={`room-${idx}`}
                sx={{
                  width: "100%",
                  height: { xs: "50vh", md: "80vh" },
                  objectFit: "cover",
                  filter: "brightness(0.7)",
                }}
              />
            </Box>
          ))}
        </Slider>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            textAlign: "center",
            px: 2,
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            Welcome to AAJAO
          </Typography>
          <Typography variant="h6" mt={2}>
            Your comfort is our priority. Experience luxury like never before.
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 3,
              bgcolor: "#fff",
              color: "#C14365",
              px: 4,
              py: 1.5,
              fontWeight: 600,
              "&:hover": {
                bgcolor: "#fce4ec",
              },
            }}
          >
            Book Now
          </Button>
        </Box>
      </Box>

      <MapandFilter />
      <HomeCategorySection />
      <HomeCustomGrid />

      {/* 🔹 Hotel Cards Section */}
      <Box sx={{ px: 4, py: 5 }}>
        <Typography variant="h4" fontWeight="bold" mb={3} color="#c14365">
          Featured Properties
        </Typography>

        <Grid container spacing={3}>
          {hotels.map((hotel, idx) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
              <HomePropCard {...hotel} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <CTAoneHome />
      <WhyChooseUs />
      <CTAoneHome />
    </Box>
  );
};

export default Home;
