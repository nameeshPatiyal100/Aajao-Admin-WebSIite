import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Box, Typography, Card, CardContent } from "@mui/material";

interface Review {
  name: string;
  review: string;
  location: string;
}

const reviews: Review[] = [
  {
    name: "Amit Sharma",
    review:
      "The property was excellent, service was top-notch. Highly recommend!",
    location: "Delhi, India",
  },
  {
    name: "Priya Verma",
    review: "Amazing location and very clean rooms. Would stay again.",
    location: "Mumbai, India",
  },
  {
    name: "Rahul Kumar",
    review: "Loved the amenities. Everything was perfect for our vacation.",
    location: "Bangalore, India",
  },
  {
    name: "Sneha Gupta",
    review: "Peaceful environment, friendly staff, and great food.",
    location: "Jaipur, India",
  },
  {
    name: "Karan Singh",
    review: "Affordable and luxurious at the same time. Great experience!",
    location: "Chandigarh, India",
  },
  {
    name: "Neha Kapoor",
    review: "The pool and spa facilities were amazing. Highly recommend.",
    location: "Goa, India",
  },
  {
    name: "Ravi Patel",
    review: "Modern interiors and very comfortable rooms.",
    location: "Ahmedabad, India",
  },
  {
    name: "Meera Iyer",
    review: "Had the best holiday with my family. Will come back again!",
    location: "Chennai, India",
  },
  {
    name: "Vikas Yadav",
    review: "Best hospitality experience. Staff was very polite and helpful.",
    location: "Lucknow, India",
  },
  {
    name: "Ananya Das",
    review: "The resort is surrounded by nature. Very refreshing stay!",
    location: "Kolkata, India",
  },
];

const ReviewSlider: React.FC = () => {
  return (
    <Box
      sx={{
        maxWidth: "95%",
        margin: "60px auto",
        padding: "0 20px",
        position: "relative",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          mb: 4,
          color: "#c14365",
          fontFamily: "'Playfair Display', serif",
          fontSize: { xs: "1.6rem", sm: "1.8rem", md: "2rem" },
        }}
      >
        What Our Guests Say
      </Typography>

      <Swiper
        modules={[Navigation, Autoplay]}
        // navigation // ✅ re-enable navigation since you have custom arrow styles
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        spaceBetween={20}
        slidesPerView={3}
        breakpoints={{
          1200: { slidesPerView: 3 },
          900: { slidesPerView: 2 },
          600: { slidesPerView: 1 },
        }}
        style={{
          paddingBottom: "60px",
          overflow: "hidden", // ✅ prevents browser scrollbars
        }}
      >
        {reviews.map((rev, idx) => (
          <SwiperSlide key={idx}>
            <Card
              sx={{
                height: "100%",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #ffffff, #fdf2f6)",
                boxShadow: "0 6px 20px rgba(193, 67, 101, 0.15)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 10px 25px rgba(193, 67, 101, 0.25)",
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="body1"
                  sx={{
                    fontStyle: "italic",
                    mb: 2,
                    color: "#333",
                    fontSize: { xs: "0.95rem", sm: "1rem" },
                    lineHeight: 1.6,
                  }}
                >
                  “{rev.review}”
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    color: "#c14365",
                    mb: 0.5,
                  }}
                >
                  {rev.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#777", fontSize: "0.9rem" }}
                >
                  {rev.location}
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Swiper Arrow Styling */}
      <style>
        {`
        .swiper-button-next,
        .swiper-button-prev {
          color: #c14365 !important;
          background: #fff;
          border: 2px solid #c14365;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 4px 12px rgba(193, 67, 101, 0.2);
          top: 45%;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: #c14365;
          color: #fff !important;
        }

        .swiper-button-prev {
          left: -65px; /* Moved arrows outside */
        }

        .swiper-button-next {
          right: -65px;
        }

        @media (max-width: 900px) {
          .swiper-button-prev { left: -35px; }
          .swiper-button-next { right: -35px; }
        }

        @media (max-width: 600px) {
          .swiper-button-prev, .swiper-button-next {
            display: none;
          }
        }
        `}
      </style>
    </Box>
  );
};

export default ReviewSlider;
