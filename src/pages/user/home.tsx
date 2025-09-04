import Slider from "react-slick";
import { Box, Typography, Button } from "@mui/material";
import { MapandFilter, WhyChooseUs, CTAoneHome } from "../../components";
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
      <WhyChooseUs />
      <CTAoneHome />
    </Box>
  );
};

export default Home;
