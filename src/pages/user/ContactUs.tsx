import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "../../styles/user/ContactUs.css";

const ContactUs: React.FC = () => {
  return (
    <Box className="contactPage">
      {/* Hero Section */}
      <Box className="contactHero">
        <img src="/room2.jpg" alt="Contact Hero" className="heroImage" />
        <Box className="heroOverlay">
          <Typography variant="h3" className="heroTitle">
            Contact AAJOO Homes
          </Typography>
          <Typography variant="body1" className="heroDescription">
            We’d love to hear from you! Whether you have questions, feedback, or
            booking inquiries, our team is here to assist you anytime.
          </Typography>
        </Box>
      </Box>

      {/* Contact Form & Image */}
      <div className="contactMain">
        {/* Left Side - Form */}
        <div className="contactCol contactLeft">
          <Typography variant="h4" className="formTitle">
            Get in Touch
          </Typography>
          <form className="contactForm" onSubmit={(e) => e.preventDefault()}>
            <TextField
              label="Your Name"
              variant="outlined"
              fullWidth
              margin="normal"
              className="customTextField"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#c14365", // default border
                  },
                  "&:hover fieldset": {
                    borderColor: "#c14365", // border on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#c14365", // border on focus
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#555", // default label color
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#c14365", // label color when focused
                },
              }}
            />
            <TextField
              label="Your Email"
              variant="outlined"
              fullWidth
              margin="normal"
              className="customTextField"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#c14365", // default border
                  },
                  "&:hover fieldset": {
                    borderColor: "#c14365", // border on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#c14365", // border on focus
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#555", // default label color
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#c14365", // label color when focused
                },
              }}
            />
            <TextField
              label="Message"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#c14365", // default border
                  },
                  "&:hover fieldset": {
                    borderColor: "#c14365", // border on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#c14365", // border on focus
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#555", // default label color
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#c14365", // label color when focused
                },
              }}
            />

            {/* Terms Checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: "#c14365",
                    "&.Mui-checked": { color: "#c14365" },
                  }}
                />
              }
              label="I agree to the Terms & Conditions"
              className="termsCheckbox"
            />

            <Button variant="contained" className="submitButton" type="submit">
              Send Message
            </Button>
          </form>
        </div>

        {/* Right Side - Image */}
        <div className="contactCol contactRight">
          <div className="imageContainer">
            <img src="/room1.jpg" alt="Location" className="contactImage" />
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="contactInfoSection">
        <div className="infoRow">
          <Card className="infoCard">
            <CardContent>
              <Typography variant="h6" className="infoTitle">
                📞 Call Us
              </Typography>
              <Typography variant="body1" className="infoText">
                +91 98765 43210
              </Typography>
            </CardContent>
          </Card>

          <Card className="infoCard">
            <CardContent>
              <Typography variant="h6" className="infoTitle">
                📧 Email Us
              </Typography>
              <Typography variant="body1" className="infoText">
                support@aajoo.com
              </Typography>
            </CardContent>
          </Card>

          <Card className="infoCard">
            <CardContent>
              <Typography variant="h6" className="infoTitle">
                🌐 Visit Us
              </Typography>
              <Typography variant="body1" className="infoText">
                www.aajoo.com
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </Box>
  );
};

export default ContactUs;
