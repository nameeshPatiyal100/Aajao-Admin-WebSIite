// import Slider from "react-slick";
import { Box, Typography, Grid, Container } from "@mui/material";
// import { MapandFilter, WhyChooseUs } from "../../components";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
const roomImages = ["/room1.jpg", "/room2.jpg", "/room3.jpg", "/room4.jpg"];

const WhyChooseUs = () => {
  return (
    <>
      {/* Why Choose Us */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" color="#C14365" gutterBottom>
          Why Choose Us?
        </Typography>
        <Typography variant="body1" mb={4} sx={{ maxWidth: "800px" }}>
          Serene Stays brings you the best blend of luxury and comfort. From
          beautiful interiors to world-class service, we’re your perfect getaway
          destination. Enjoy high-speed Wi-Fi, gourmet meals, and 24/7 concierge
          support in all our properties.
        </Typography>

        {/* Gallery */}
        <Grid container spacing={3}>
          {roomImages.map((src, idx) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
              <Box
                component="img"
                src={src}
                alt={`gallery-${idx}`}
                sx={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};
export default WhyChooseUs;
