import Slider from "react-slick";
import { Box, Typography, Avatar, Paper, IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/user/ReviewSlider.css";

const reviews = [
  {
    name: "Aarav Sharma",
    location: "New Delhi, India",
    review:
      "Amazing stay! The rooms were super clean and the staff was very polite.",
    rating: 5,
    avatar: "/avatar1.jpg",
  },
  {
    name: "Sophia Patel",
    location: "Mumbai, India",
    review:
      "Great location, near everything I needed. Will definitely come back!",
    rating: 4,
    avatar: "/avatar2.jpg",
  },
  {
    name: "Rohan Gupta",
    location: "Goa, India",
    review: "Beautiful beach view. Loved the hospitality and food.",
    rating: 5,
    avatar: "/avatar3.jpg",
  },
  {
    name: "Ishita Mehta",
    location: "Jaipur, India",
    review: "Very cozy and comfortable stay. Perfect for a weekend trip.",
    rating: 4,
    avatar: "/avatar4.jpg",
  },
  {
    name: "Kabir Singh",
    location: "Manali, India",
    review: "Stunning mountain views! Rooms were spacious and neat.",
    rating: 5,
    avatar: "/avatar5.jpg",
  },
  {
    name: "Nisha Verma",
    location: "Rajasthan, India",
    review: "The desert safari was arranged by the hotel, it was fantastic!",
    rating: 5,
    avatar: "/avatar6.jpg",
  },
  {
    name: "Aditya Jain",
    location: "Hyderabad, India",
    review: "Good amenities and excellent breakfast buffet.",
    rating: 4,
    avatar: "/avatar7.jpg",
  },
  {
    name: "Priya Kapoor",
    location: "Chennai, India",
    review: "Staff was friendly and the service was top-notch.",
    rating: 5,
    avatar: "/avatar8.jpg",
  },
  {
    name: "Rahul Desai",
    location: "Bangalore, India",
    review: "Perfect location for business travelers. Very convenient.",
    rating: 4,
    avatar: "/avatar9.jpg",
  },
  {
    name: "Simran Kaur",
    location: "Punjab, India",
    review: "Had a wonderful time with family. Highly recommend this place!",
    rating: 5,
    avatar: "/avatar10.jpg",
  },
];

// Custom arrows
// const PrevArrow = (props: any) => {
//   const { onClick } = props;
//   return (
//     <IconButton className="slick-arrow prev" onClick={onClick}>
//       <ArrowBackIosNewIcon />
//     </IconButton>
//   );
// };

// const NextArrow = (props: any) => {
//   const { onClick } = props;
//   return (
//     <IconButton className="slick-arrow next" onClick={onClick}>
//       <ArrowForwardIosIcon />
//     </IconButton>
//   );
// };

const ReviewSlider = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Box sx={{ py: 8, px: 4, bgcolor: "#fafafa", position: "relative" }}>
      <Typography
        variant="h4"
        textAlign="center"
        mb={5}
        fontWeight="bold"
        color="#c14365"
      >
        What Our Guests Say
      </Typography>
      <Box className="review-slider-wrap">
        <Slider {...sliderSettings}>
          {reviews.map((review, idx) => (
            <Paper className="review-card" key={idx}>
              <Box className="review-header">
                <Avatar
                  src={review.avatar}
                  alt={review.name}
                  sx={{ width: 70, height: 56 }}
                />
                <Box>
                  <Typography variant="subtitle1" fontWeight="600">
                    {review.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {review.location}
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body1" className="review-text">
                “{review.review}”
              </Typography>

              <Box className="review-rating">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <StarIcon key={i} sx={{ color: "#ffc107" }} />
                ))}
              </Box>
            </Paper>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default ReviewSlider;
