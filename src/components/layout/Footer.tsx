import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionButton = motion(Button);
console.log(MotionButton);

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "background.paper", py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between" mb={3}>
          {/* Company Links */}
          <Grid size={{xs:12,md:6}}>
            <Typography variant="h6" color="primary" gutterBottom>
              Company
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Link component={RouterLink} to="/About" color="text.secondary" underline="hover">
                About Us
              </Link>
              <Link component={RouterLink} to="/Blogs" color="text.secondary" underline="hover">
                Blogs
              </Link>
              <Link component={RouterLink} to="/Cancel" color="text.secondary" underline="hover">
                Cancellation Policy
              </Link>
              <Link component={RouterLink} to="/Host&Agreements" color="text.secondary" underline="hover">
                Host Agreement
              </Link>
              <Link component={RouterLink} to="/privacy" color="text.secondary" underline="hover">
                Privacy
              </Link>
              <Link component={RouterLink} to="/T&C" color="text.secondary" underline="hover">
                Terms & Conditions
              </Link>
            </Box>
          </Grid>

          {/* About + Social Icons */}
          <Grid size={{xs:12 , md:6}}>
            <Typography variant="h6" color="primary" gutterBottom>
              aajao
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Find your perfect stay with aajao, the world's leading accommodation booking platform.
            </Typography>
            <Box display="flex" gap={2}>
              <IconButton href="https://facebook.com" target="_blank" rel="noopener noreferrer" color="primary">
                <FaFacebook />
              </IconButton>
              <IconButton href="https://instagram.com" target="_blank" rel="noopener noreferrer" sx={{ color: "#E1306C" }}>
                <FaInstagram />
              </IconButton>
              <IconButton href="https://twitter.com" target="_blank" rel="noopener noreferrer" sx={{ color: "#1DA1F2" }}>
                <FaTwitter />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="flex-end" mt={4}>
          {/* <MotionButton
            component={RouterLink}
            to="/403"
            variant="contained"
            color="primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{ px: 4, py: 1.5, borderRadius: "30px" }}
          >
            404 Error
          </MotionButton> */}
        </Box>

        <Divider sx={{ mt: 6, mb: 3 }} />

        <Typography variant="body2" color="text.secondary" align="center">
          © 2025 aajao. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
