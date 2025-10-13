import "../../styles/user/Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import {
  MapandFilter,
  HomePropCard,
  FAQSection,
  ReviewSlider,
} from "../../components";
import JoinusNow from "../../assets/UI/joinusNow.jpg";

const Home = () => {
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
      question: "How do I find a room near me on AAJOO?",
      answer:
        "You just open the app, enable location, and you’ll see available rooms within walking distance from your current location.",
    },
    {
      question: "Can I negotiate the price before booking?",
      answer:
        "Yes! AAJOO allows real-time price negotiation with the host. You can propose a price and the host may accept, decline, or counter it.",
    },
    {
      question: "Can I book for one night, a week, or a month?",
      answer:
        "Absolutely. You can choose a daily, weekly, or monthly stay as per your requirement. Use filters while searching.",
    },
    {
      question: "Is my booking and payment secure?",
      answer:
        "Yes. We use secure payment gateways and you receive confirmation via app and email after booking.",
    },
    {
      question: "Do I have to pay a security deposit?",
      answer:
        "For monthly stays, a minimal security deposit may apply. For daily or short stays, no deposit is required.",
    },
    {
      question: "Is KYC mandatory to book?",
      answer:
        "Yes, to ensure safety for both user and host, basic KYC (ID verification with photo) is required before final booking.",
    },
    {
      question: "What if I have an issue during the stay?",
      answer:
        "You can contact AAJOO support via in-app chat, email, or WhatsApp support for any help during your stay.",
    },
  ];

  return (
    <Box>
      <MapandFilter />

      {/* 🔹 Hotel Cards Section */}
      <section className="featured-properties">
        {/* <h2>Featured Properties</h2> */}
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
      <ReviewSlider />
    </Box>
  );
};

export default Home;
