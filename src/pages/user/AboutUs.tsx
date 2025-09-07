import { Box, Typography,Button } from "@mui/material";
import "../../styles/user/AboutUs.css";

const AboutUs = () => {
  return (
    <>
      {/* Hero Section */}
      <Box className="aboutUsHero">
        <Box className="aboutUsOverlay">
          <Box className="aboutUsContent">
            <Typography variant="h3" className="aboutUsTitle">
              About AAJOO Homes
            </Typography>
            <Typography variant="body1" className="aboutUsDescription">
              At AAJOO Homes, we believe in creating memorable stays with
              comfort, luxury, and warmth. Whether you're looking for a weekend
              getaway or a long vacation, our properties offer the perfect blend
              of modern amenities and homely vibes.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Text + Image Section */}
      <div className="aboutustextsection">
        <div className="textSectionImg">
          <img src="/room4.jpg" alt="About Us" />
        </div>
        <div className="textSectiontext">
          <h2>Why Choose AAJOO Homes?</h2>
          <p>
            We go beyond just providing stays – we provide experiences. With
            beautiful locations, modern amenities, and unmatched hospitality,
            AAJOO Homes is your perfect partner in creating unforgettable
            memories.
          </p>
        </div>
      </div>

      {/* Gallery Section */}
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

          {/* <div className="gridBox div5">
            <img src="/room5.jpg" alt="Gallery 5" className="gridImage" />
            <div className="overlay">
              <p className="title">Comfort Stay</p>
            </div>
          </div> */}

          {/* Section 3 */}
        </div>
      </div>

      <div className="aboutSection">
        <div className="textContainer">
          <h2 className="sectionTitle">Beautiful Locations</h2>
          <p className="sectionDescription">
            Wake up to stunning views and serene surroundings. Every property is
            located at prime spots to enhance your stay experience.
          </p>
        </div>
        <div className="imageContainer">
          <img
            src="/room3.jpg"
            alt="Beautiful Views"
            className="sectionImage"
          />
        </div>
      </div>
      <div className="aboutSection">
        <div className="imageContainer">
          <img
            src="/room3.jpg"
            alt="Beautiful Views"
            className="sectionImage"
          />
        </div>

        <div className="textContainer">
          <h2 className="sectionTitle">Beautiful Locations</h2>
          <p className="sectionDescription">
            Wake up to stunning views and serene surroundings. Every property is
            located at prime spots to enhance your stay experience.
          </p>
        </div>
      </div>
      <div className="aboutSection">
        <div className="textContainer">
          <h2 className="sectionTitle">Beautiful Locations</h2>
          <p className="sectionDescription">
            Wake up to stunning views and serene surroundings. Every property is
            located at prime spots to enhance your stay experience.
          </p>
        </div>
        <div className="imageContainer">
          <img
            src="/room3.jpg"
            alt="Beautiful Views"
            className="sectionImage"
          />
        </div>
      </div>

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
