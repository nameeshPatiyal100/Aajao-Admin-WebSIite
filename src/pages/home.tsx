// import React from 'react';
import Slider from 'react-slick';
import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
} from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const roomImages = [
  '/room1.jpg',
  '/room2.jpg',
  '/room3.jpg',
  '/room4.jpg',
];

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
      <Box sx={{ position: 'relative' }}>
        <Slider {...sliderSettings}>
          {roomImages.map((src, idx) => (
            <Box key={idx}>
              <Box
                component="img"
                src={src}
                alt={`room-${idx}`}
                sx={{
                  width: '100%',
                  height: { xs: '50vh', md: '80vh' },
                  objectFit: 'cover',
                  filter: 'brightness(0.7)',
                }}
              />
            </Box>
          ))}
        </Slider>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            textAlign: 'center',
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
              bgcolor: '#fff',
              color: '#C14365',
              px: 4,
              py: 1.5,
              fontWeight: 600,
              '&:hover': {
                bgcolor: '#fce4ec',
              },
            }}
          >
            Book Now
          </Button>
        </Box>
      </Box>

      {/* Why Choose Us */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" color="#C14365" gutterBottom>
          Why Choose Us?
        </Typography>
        <Typography variant="body1" mb={4} sx={{ maxWidth: '800px' }}>
          Serene Stays brings you the best blend of luxury and comfort. From
          beautiful interiors to world-class service, we’re your perfect getaway
          destination. Enjoy high-speed Wi-Fi, gourmet meals, and 24/7 concierge
          support in all our properties.
        </Typography>

        {/* Gallery */}
        <Grid container spacing={3}>
          {roomImages.map((src, idx) => (
            <Grid  size={{xs:12 ,sm:6,md:3}}  key={idx}>
              <Box
                component="img"
                src={src}
                alt={`gallery-${idx}`}
                sx={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: '#C14365', py: 6, textAlign: 'center', color: '#fff' }}>
        <Typography variant="h4" fontWeight="bold" mb={2}>
          Looking for a relaxing vacation?
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: '#fff',
            color: '#C14365',
            fontWeight: 'bold',
            px: 4,
            py: 1.5,
            '&:hover': {
              bgcolor: '#f8e4ec',
            },
          }}
        >
          View Rooms
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
