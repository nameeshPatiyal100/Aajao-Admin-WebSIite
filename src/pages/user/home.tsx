// import Slider from "react-slick";
import "../../styles/user/Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import {
  MapandFilter,
  // WhyChooseUs,
  // CTAoneHome,
  // HomeCategorySection,
  // HomeCustomGrid,
  HomePropCard,
  FAQSection,
  // FeatureSection,
  ReviewSlider,
} from "../../components";
import JoinusNow from "../../assets/UI/joinusNow.jpg";

// const roomImages = ["/room1.jpg", "/room2.jpg", "/room3.jpg", "/room4.jpg"];

const Home = () => {
  // const handleApiCall = async () => {
  //   try {
  //     const response = await fetch("/api/rooms");
  //     const data = await response.json();
  //     console.log("Fetched Rooms:", data);
  //   } catch (error) {
  //     console.error("Error fetching rooms:", error);
  //   }
  // };

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
    },
  ];
  const faqs = [
    {
      question: "What is the cancellation policy?",
      answer:
        "You can cancel your booking up to 24 hours before check-in for a full refund.",
    },
    {
      question: "Do you offer free Wi-Fi?",
      answer:
        "Yes, all our properties provide complimentary high-speed Wi-Fi for guests.",
    },
    {
      question: "Is breakfast included?",
      answer:
        "Most of our hotels include breakfast. Please check the booking details for confirmation.",
    },
    {
      question: "Are pets allowed?",
      answer:
        "Some of our properties are pet-friendly. Please check the listing before booking.",
    },
    {
      question: "How do I modify my booking?",
      answer:
        "You can modify your booking by logging into your account or contacting customer support.",
    },
    {
      question: "Are pets allowed?",
      answer:
        "Some of our properties are pet-friendly. Please check the listing before booking.",
    },
    {
      question: "How do I modify my booking?",
      answer:
        "You can modify your booking by logging into your account or contacting customer support.",
    },
  ];

  return (
    <Box>
      <MapandFilter />

      {/* 🔹 Hotel Cards Section */}
      <section className="featured-properties">
        <h2>Featured Properties</h2>
        <div className="properties-grid">
          {hotels.map((hotel, idx) => (
            <Link
              to={`/property/detail/`}
              key={idx}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <HomePropCard {...hotel} />
            </Link>
          ))}
        </div>
      </section>
      {/* <section className="featured-properties">
        <h2>Featured Properties</h2>
        <div className="properties-grid">
          {hotels.map((hotel, idx) => (
            <HomePropCard key={idx} {...hotel} />
          ))}
        </div>
      </section> */}

      {/* <CTAoneHome /> */}
      {/* <CTAoneHome
        backgroundImage="/room5.webp"
        title="Looking for a relaxing vacation?"
        buttonText="Explore Now"
        onButtonClick={handleApiCall}
      /> */}
      <div className="addHostSection">
        <div className="addHostSectionLeft">
          <img src={JoinusNow} alt="Become a Host" />
        </div>

        <div className="addHostSectionRight">
          <h2>Become a Host</h2>
          <p className="addHostDesc">
            Turn your extra space into an opportunity. Whether you have a cozy
            apartment, a charming villa, or a vacation home, Aajoo Homes makes
            it simple and secure to list your property. Connect with verified
            guests, earn extra income, and share your hospitality with travelers
            from around the world — all while maintaining complete control over
            your property.
          </p>
          <Link to="/become-a-host" className="addHostButton">
            Get Started
          </Link>
        </div>
      </div>

      <FAQSection
        image="/faq_vector.jpg"
        faqs={faqs}
        description="Got questions? We’ve got answers for you!"
      />

      {/* <CTAoneHome
        backgroundImage="/room3.jpg"
        title="Looking for a relaxing vacation?"
        buttonText="Book now"
        onButtonClick={handleApiCall}
      /> */}
      <ReviewSlider />
    </Box>
  );
};

export default Home;
