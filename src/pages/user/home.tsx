import "../../styles/user/Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import {
  MapandFilter,
  FAQSection,
  ReviewSlider,
  FeaturedProperties,
  OngoingFloat,
} from "../../components";
import JoinusNow from "../../assets/UI/joinusNow.jpg";
import { hotels, faqs } from "../../styles/utils/reusableData";

const Home = () => {
  // 🔹 Hotels Array

  return (
    <Box>
      <MapandFilter />

      {/* 🔹 Hotel Cards Section */}
      <FeaturedProperties hotels={hotels} />

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
      {/* ✅ Floating Component */}
      <OngoingFloat />
    </Box>
  );
};

export default Home;
