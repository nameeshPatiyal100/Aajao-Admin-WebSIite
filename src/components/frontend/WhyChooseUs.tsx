import { Box, Typography, Grid, Container, Button } from "@mui/material";
import {
  Security,
  EventAvailable,
  LocalOffer,
  SupportAgent,
} from "@mui/icons-material";

const features = [
  {
    icon: <Security sx={{ fontSize: 40, color: "#C14365" }} />,
    title: "Secure Bookings",
    description:
      "Your transactions are encrypted and protected with top-level security.",
    link: "#",
  },
  {
    icon: <EventAvailable sx={{ fontSize: 40, color: "#C14365" }} />,
    title: "Flexible Cancellations",
    description:
      "Change of plans? Enjoy easy cancellations and modifications anytime.",
    link: "#",
  },
  {
    icon: <LocalOffer sx={{ fontSize: 40, color: "#C14365" }} />,
    title: "Best Price Guarantee",
    description:
      "We ensure you always get the best deals with exclusive discounts.",
    link: "#",
  },
  {
    icon: <SupportAgent sx={{ fontSize: 40, color: "#C14365" }} />,
    title: "24/7 Support",
    description:
      "Our team is always available to help you with bookings and queries.",
    link: "#",
  },
];

const WhyChooseUs = () => {
  return (
    <Container sx={{ py: 6 }}>
      {/* Heading */}
      <Typography
        variant="h4"
        fontWeight="bold"
        color="#C14365"
        gutterBottom
        textAlign="center"
      >
        Why Choose Us?
      </Typography>
      <Typography
        variant="body1"
        mb={6}
        sx={{ maxWidth: "700px", mx: "auto", textAlign: "center" }}
      >
        At <strong>AAJAO</strong>, we make your hotel booking experience
        seamless, secure, and stress-free. From reliable reservations to
        unbeatable prices and dedicated support, we’ve got everything you need
        for the perfect stay.
      </Typography>

      {/* Features */}
      <Grid container spacing={3}>
        {features.map((feature, idx) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
            <Box
              sx={{
                textAlign: "center",
                p: 3,
                borderRadius: 3,
                bgcolor: "#fff",
                boxShadow: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Icon */}
              <Box>{feature.icon}</Box>

              {/* Title */}
              <Typography
                variant="h6"
                fontWeight="bold"
                color="text.primary"
                mt={2}
              >
                {feature.title}
              </Typography>

              {/* Description */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ my: 2, flexGrow: 1 }}
              >
                {feature.description}
              </Typography>

              {/* Link Button */}
              <Button
                href={feature.link}
                sx={{
                  color: "#C14365",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Read More →
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WhyChooseUs;
