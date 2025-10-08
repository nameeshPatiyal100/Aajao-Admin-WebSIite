// components/ReviewSliderAdvanced.tsx
import React from "react";
import Slider from "react-slick";
import {
  Box,
  Typography,
  Avatar,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";

interface Review {
  userName: string;
  profilePic: string;
  rating: number;
  title: string;
  description: string;
}

interface ReviewSliderProps {
  propertyId: string;
}

const reviews: Review[] = [
  {
    userName: "Priya Sharma",
    profilePic: "/users/priya.jpg",
    rating: 5,
    title: "Amazing stay!",
    description:
      "The apartment was clean, spacious, and had a great view. Highly recommended!",
  },
  {
    userName: "Rahul Verma",
    profilePic: "/users/rahul.jpg",
    rating: 4,
    title: "Comfortable and cozy",
    description: "Perfect for a weekend getaway. The host was very helpful.",
  },
  {
    userName: "Sneha Kapoor",
    profilePic: "/users/sneha.jpg",
    rating: 5,
    title: "Loved the interiors",
    description:
      "Modern design and peaceful location. Will definitely come back!",
  },
  {
    userName: "Arjun Mehta",
    profilePic: "/users/arjun.jpg",
    rating: 3,
    title: "Good but noisy",
    description: "Nice place but a bit noisy at night due to traffic.",
  },
  {
    userName: "Meera Iyer",
    profilePic: "/users/meera.jpg",
    rating: 4,
    title: "Family friendly",
    description: "Spacious and safe for kids. Great amenities.",
  },
  {
    userName: "Karan Singh",
    profilePic: "/users/karan.jpg",
    rating: 5,
    title: "Exceptional service",
    description:
      "The host went above and beyond. Truly memorable experience.",
  },
];

const Arrow = ({
  onClick,
  direction,
}: {
  onClick?: () => void;
  direction: "left" | "right";
}) => (
  <Box
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "40%",
      [direction === "left" ? "left" : "right"]: -15,
      zIndex: 10,
      width: 35,
      height: 35,
      backgroundColor: "#c14365",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      cursor: "pointer",
      fontSize: 20,
      "&:hover": {
        backgroundColor: "#ab3864",
      },
    }}
  >
    {direction === "left" ? "<" : ">"}
  </Box>
);

const ReviewSliderAdvanced: React.FC<ReviewSliderProps> = ({ propertyId }) => {
    console.log("Property ID:", propertyId); // For debugging purposes
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: isMobile ? 1 : 2,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <Arrow direction="right" />,
    prevArrow: <Arrow direction="left" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <Box sx={{ mt: 6, fontFamily: "Roboto, sans-serif" }}>
      <Typography
        sx={{
          fontSize: { xs: 40, sm: 42 },
          fontWeight: 600,
          mb: 3,
          color: "#c14365",
        }}
      >
        What People Say About This Property
      </Typography>
      <Slider {...settings}>
        {reviews.map((review, index) => (
          <Box
            key={index}
            sx={{
              p: 3,
              backgroundColor: "#fff",
              borderRadius: 3,
              boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
              mx: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              minHeight: 250,
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                src={review.profilePic}
                alt={review.userName}
                sx={{ width: 56, height: 56 }}
              />
              <Box>
                <Typography
                  sx={{ fontWeight: 600, fontSize: 16, color: "#333" }}
                >
                  {review.userName}
                </Typography>
                <Rating value={review.rating} readOnly size="small" />
              </Box>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: 17,
                  fontWeight: 500,
                  mb: 1,
                  color: "#c14365",
                }}
              >
                {review.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: 15,
                  color: "#555",
                  lineHeight: 1.6,
                }}
              >
                {review.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ReviewSliderAdvanced;