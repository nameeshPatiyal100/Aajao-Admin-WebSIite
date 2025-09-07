import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../../styles/user/ReviewSlider.css";

interface Review {
  name: string;
  review: string;
  location: string;
}

const reviews: Review[] = [
  { name: "Amit Sharma", review: "The property was excellent, service was top-notch. Highly recommend!", location: "Delhi, India" },
  { name: "Priya Verma", review: "Amazing location and very clean rooms. Would stay again.", location: "Mumbai, India" },
  { name: "Rahul Kumar", review: "Loved the amenities. Everything was perfect for our vacation.", location: "Bangalore, India" },
  { name: "Sneha Gupta", review: "Peaceful environment, friendly staff, and great food.", location: "Jaipur, India" },
  { name: "Karan Singh", review: "Affordable and luxurious at the same time. Great experience!", location: "Chandigarh, India" },
  { name: "Neha Kapoor", review: "The pool and spa facilities were amazing. Highly recommend.", location: "Goa, India" },
  { name: "Ravi Patel", review: "Modern interiors and very comfortable rooms.", location: "Ahmedabad, India" },
  { name: "Meera Iyer", review: "Had the best holiday with my family. Will come back again!", location: "Chennai, India" },
  { name: "Vikas Yadav", review: "Best hospitality experience. Staff was very polite and helpful.", location: "Lucknow, India" },
  { name: "Ananya Das", review: "The resort is surrounded by nature. Very refreshing stay!", location: "Kolkata, India" },
];

const ReviewSlider: React.FC = () => {
  return (
    <div className="review-slider-wrap">
      <h2 className="review-section-title">What Our Guests Say</h2>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={24}
        slidesPerView={3}
        breakpoints={{
          1200: { slidesPerView: 3 },
          900: { slidesPerView: 2 },
          600: { slidesPerView: 1 },
        }}
        className="review-swiper"
      >
        {reviews.map((rev, idx) => (
          <SwiperSlide key={idx}>
            <div className="review-card">
              <p className="review-text">“{rev.review}”</p>
              <h4 className="review-name">{rev.name}</h4>
              <p className="review-location">{rev.location}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewSlider;
