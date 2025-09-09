import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "../../styles/Footer.css";

const Footer: React.FC = () => {
  return (
    <Box component="footer" className="footer">
      {/* Brand */}
      <Typography className="footerBrand">AAJOO Homes.</Typography>
      <Divider className="divider" />

      <Container maxWidth="lg">
        <Box className="footerContent">
          {/* Section 1: Pages */}
          <Box className="footerCol">
            <Typography variant="h6" className="footerHeading">
              Pages
            </Typography>
            <Box className="footerLinks">
              <Link component={RouterLink} to="/About">About Us</Link>
              <Link component={RouterLink} to="/Blogs">Blogs</Link>
              <Link component={RouterLink} to="/Cancel">Cancellation Policy</Link>
              <Link component={RouterLink} to="/Host&Agreements">Host Agreement</Link>
              <Link component={RouterLink} to="/privacy">Privacy</Link>
              <Link component={RouterLink} to="/T&C">Terms & Conditions</Link>
            </Box>
          </Box>

          {/* Section 2: Host */}
          <Box className="footerCol">
            <Typography variant="h6" className="footerHeading">
              Host
            </Typography>
            <Box className="footerLinks">
              <Link component={RouterLink} to="/About">About Us</Link>
              <Link component={RouterLink} to="/Blogs">Blogs</Link>
              <Link component={RouterLink} to="/Cancel">Cancellation Policy</Link>
              <Link component={RouterLink} to="/Host&Agreements">Host Agreement</Link>
              <Link component={RouterLink} to="/privacy">Privacy</Link>
              <Link component={RouterLink} to="/T&C">Terms & Conditions</Link>
            </Box>
          </Box>

          {/* Section 3: Subscribe + Social */}
          <Box className="footerCol">
            <Typography variant="h6" className="footerHeading">
              Subscribe
            </Typography>
            <Box className="subscribeBox">
              <TextField
                placeholder="Enter your email"
                variant="outlined"
                size="small"
                className="subscribeInput"
              />
              <Button variant="contained" className="subscribeButton">
                Subscribe
              </Button>
            </Box>
            <Box className="socialIcons">
              <IconButton href="https://facebook.com" target="_blank">
                <FaFacebook />
              </IconButton>
              <IconButton href="https://instagram.com" target="_blank" sx={{ color: "#E1306C" }}>
                <FaInstagram />
              </IconButton>
              <IconButton href="https://twitter.com" target="_blank" sx={{ color: "#1DA1F2" }}>
                <FaTwitter />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Divider className="divider" />
        <Typography variant="body2" className="footerBottom">
          © 2025 aajao. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
