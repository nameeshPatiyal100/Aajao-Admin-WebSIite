import { Box, Typography, Button } from "@mui/material";
import { WhyChooseUs } from "../../components";
import "../../styles/user/AboutUs.css";

const AboutUs = () => {
  return (
    <>
      {/* ---------- Top Intro Section ---------- */}
      <Box className="aboutHero">
        <Typography variant="h2" className="aboutHeroTitle">
          About Us
        </Typography>
        <Typography variant="body1" className="aboutHeroDescription">
          We are dedicated to offering you the best luxury experiences with
          modern amenities, elegant interiors, and breathtaking locations.
          Our goal is to make every stay unforgettable.
        </Typography>
      </Box>

      <WhyChooseUs />

      {/* ---------- Gallery Section ---------- */}
      <div className="imageGallery">
        <div className="parent">
          <div className="gridBox div1">
            <img src="/room1.jpg" alt="Gallery 1" className="gridImage" />
            <div className="overlay">
              <p className="title">Luxury Room</p>
            </div>
          </div>

          <div className="gridBox div2">
            <img src="/room2.jpg" alt="Gallery 2" className="gridImage" />
            <div className="overlay">
              <p className="title">Modern Interiors</p>
            </div>
          </div>

          <div className="gridBox div3">
            <img src="/room3.jpg" alt="Gallery 3" className="gridImage" />
            <div className="overlay">
              <p className="title">Beautiful Views</p>
            </div>
          </div>

          <div className="gridBox div4">
            <img src="/room4.jpg" alt="Gallery 4" className="gridImage" />
            <div className="overlay">
              <p className="title">Cozy Ambience</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- About Sections ---------- */}
      <div className="aboutSection">
        <div className="textContainer">
          <h2 className="sectionTitle">Beautiful Locations</h2>
          <p className="sectionDescription">
            Wake up to stunning views and serene surroundings. Every property is
            located at prime spots to enhance your stay experience.
          </p>
        </div>
        <div className="imageContainer">
          <img src="/room3.jpg" alt="Beautiful Views" className="sectionImage" />
        </div>
      </div>

      <div className="aboutSection">
        <div className="imageContainer">
          <img src="/room3.jpg" alt="Beautiful Views" className="sectionImage" />
        </div>

        <div className="textContainer">
          <h2 className="sectionTitle">Luxury Comfort</h2>
          <p className="sectionDescription">
            Designed with elegance and comfort in mind, our rooms offer the
            perfect balance of relaxation and luxury.
          </p>
        </div>
      </div>

      <div className="aboutSection">
        <div className="textContainer">
          <h2 className="sectionTitle">Exceptional Experience</h2>
          <p className="sectionDescription">
            From the moment you arrive, we focus on delivering world-class
            hospitality that goes beyond expectations.
          </p>
        </div>
        <div className="imageContainer">
          <img src="/room3.jpg" alt="Beautiful Views" className="sectionImage" />
        </div>
      </div>

      {/* ---------- Contact Section ---------- */}
      <Box className="contactSection">
        <Box className="contactContent">
          <Typography variant="h4" className="contactTitle">
            Get in Touch With Us
          </Typography>
          <Button variant="contained" className="contactButton">
            Contact Us
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AboutUs;
