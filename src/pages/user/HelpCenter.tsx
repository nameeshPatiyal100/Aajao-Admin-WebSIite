import React from "react";
import {
  Box,
  Container,
  Typography,
  //   Grid,
  Card,
  CardContent,
  //   Accordion,
  //   AccordionSummary,
  //   AccordionDetails,
  useTheme,
  useMediaQuery,
} from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import helpcenter2 from "../../assets/UI/helpcenter2.svg";

interface Section {
  title: string;
  topics: { question: string; answer: string }[];
}

const helpSections: Section[] = [
  {
    title: "Getting Started",
    topics: [
      {
        question: "What is Aajoo?",
        answer:
          "Aajoo connects travelers with local hosts offering authentic homestays and unique experiences.",
      },
      {
        question: "How to Sign Up",
        answer:
          "You can register using your email or Google account as a guest or host within minutes.",
      },
      {
        question: "How to List Your Property",
        answer:
          "Follow our step-by-step listing guide with tips on descriptions, pricing, and images.",
      },
      {
        question: "How to Book a Stay",
        answer:
          "Easily search, filter, and book safe and verified properties with instant confirmation.",
      },
    ],
  },
  {
    title: "Hosting with Aajoo",
    topics: [
      {
        question: "Crafting the Perfect Listing",
        answer:
          "Highlight unique features, upload high-quality photos, and write engaging descriptions.",
      },
      {
        question: "Host Responsibilities",
        answer:
          "Maintain cleanliness, communicate clearly, and ensure guest safety and comfort.",
      },
      {
        question: "Preparing Your Home for Guests",
        answer:
          "Offer essentials, check safety devices, and add personal touches for a memorable stay.",
      },
      {
        question: "Getting Paid as a Host",
        answer:
          "Aajoo supports multiple payout methods with timely and transparent transactions.",
      },
    ],
  },
  {
    title: "Guest Support",
    topics: [
      {
        question: "Guest Responsibilities",
        answer:
          "Respect property rules, treat hosts courteously, and follow Aajoo’s code of conduct.",
      },
      {
        question: "Safety During Your Stay",
        answer:
          "Ensure safe check-ins, keep emergency contacts ready, and report any issues promptly.",
      },
      {
        question: "Refunds & Cancellations",
        answer:
          "Check your booking’s cancellation policy for eligible refund timelines.",
      },
      {
        question: "How to Contact Your Host",
        answer:
          "Use Aajoo’s secure messaging system to reach your host before or during your stay.",
      },
    ],
  },
];

const HelpCenter: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ bgcolor: "#fff" }}>
      {/* 🌐 Hero Section */}
      <Box
        sx={{
          textAlign: "center",
          py: { xs: 6, md: 10 },
          background:
            "linear-gradient(180deg, #fff 0%, #ffe5ec 60%, #fff 100%)",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant={isMobile ? "h5" : "h4"}
            fontWeight={700}
            sx={{ color: "#C14365", mb: 2 }}
          >
            🌐 Aajoo Help Center
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, lineHeight: 1.8 }}
          >
            Your all-in-one guide for hosting, traveling, safety, and support.
            Whether you’re a guest searching for authentic stays or a host
            sharing your home, Aajoo ensures your experience is smooth and
            rewarding.
          </Typography>

          {/* 🖼 Illustration Placeholder */}
          <Box
            sx={{
              width: "90%",
              height: isMobile ? 200 : 300,
              backgroundColor: "#fde7ec",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: isMobile ? "0.9rem" : "1.2rem",
              color: "#C14365",
              fontWeight: 600,
              boxShadow: "inset 0 0 30px rgba(193,67,101,0.1)",
            }}
          >
            {/* <img src={helpcenter} alt="" /> */}
            <Box
              component="img"
              src={helpcenter2}
              alt="Help Center"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain", // keeps image inside box while maintaining aspect ratio
                borderRadius: 4,
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* 📚 Help Center Section */}
      <Container
        maxWidth="md"
        sx={{
          py: { xs: 6, md: 10 },
          textAlign: "center",
        }}
      >
        <Card
          elevation={4}
          sx={{
            borderRadius: 4,
            p: { xs: 3, sm: 5 },
            backgroundColor: "#fff8fa",
            boxShadow: "0 6px 25px rgba(193,67,101,0.15)",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{
                color: "#C14365",
                mb: 4,
                textTransform: "uppercase",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Aajoo Help Center
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: 700,
                mx: "auto",
                mb: 5,
                lineHeight: 1.8,
              }}
            >
              Welcome to the Aajoo Help Center – your complete guide for
              hosting, traveling, safety, and support. Whether you’re a guest
              looking for authentic stays or a host opening your home, Aajoo
              ensures a smooth, transparent, and rewarding experience.
            </Typography>

            {helpSections.flatMap((section, sIndex) =>
              section.topics.map((topic, tIndex) => (
                <Box
                  key={`${sIndex}-${tIndex}`}
                  sx={{
                    mb: 4,
                    px: { xs: 1, sm: 2 },
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{
                      color: "#C14365",
                      mb: 1,
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    {topic.question}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      maxWidth: 650,
                      mx: "auto",
                      lineHeight: 1.7,
                      fontSize: "1rem",
                    }}
                  >
                    {topic.answer}
                  </Typography>
                </Box>
              ))
            )}
          </CardContent>
        </Card>
      </Container>

      {/* 🌈 Footer Note */}
      <Box
        sx={{
          py: 4,
          textAlign: "center",
          backgroundColor: "#ffe5ec",
          color: "#C14365",
          fontWeight: 500,
          fontSize: "0.95rem",
        }}
      >
        Need more help? Reach out to us at{" "}
        <Box component="span" sx={{ fontWeight: 700 }}>
          contactus@aajoohomes.com
        </Box>
      </Box>
    </Box>
  );
};

export default HelpCenter;
