import React, { useState, useEffect } from "react";
import { RazorpayPayment } from "../../components";
import {
  Box,
  Typography,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { PropertyBookingBox } from "../../components";
import {
  AttachMoney as AttachMoneyIcon,
  LocationOn,
} from "@mui/icons-material";
import securePay from "../../assets/UI/securePay.jpg";

const themeColor = "#c14365";

const propertyData = {
  name: "Luxury Apartment in Chennai",
  address: "123 Ani Street, Chennai, India",
  categories: ["Apartment", "Luxury", "Family"],
  amenities: ["Pool", "Parking", "WiFi"],
  basePrice: 1500,
  image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200", // example property image
};

const FinalBookingPage: React.FC = () => {
  const [stayType, _setStayType] = useState<"Daily" | "Weekly" | "Monthly">(
    "Daily"
  );
  const [guests, _setGuests] = useState(1);
  const [price, setPrice] = useState<number>(propertyData.basePrice);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    let total = propertyData.basePrice;
    switch (stayType) {
      case "Daily":
        total = propertyData.basePrice * guests;
        break;
      case "Weekly":
        total = propertyData.basePrice * 7 * guests;
        break;
      case "Monthly":
        total = propertyData.basePrice * 30 * guests;
        break;
    }
    setPrice(total);
  }, [stayType, guests]);

  const GST_PERCENT = 18;
  const gstAmount = (price * GST_PERCENT) / 100;
  const totalBill = price + gstAmount;

  const handlePaymentSuccess = (response: any) => {
    console.log("Payment Success:", response);
    alert("Payment successful! 🎉");
  };

  const handlePaymentFailure = (error: any) => {
    console.error("Payment Failed:", error);
    alert("Payment failed. Please try again.");
  };

  const handlePayLater = () => {
    // Trigger hidden button inside RazorpayPayment component
    const trigger = document.getElementById("hiddenRazorpayTrigger");
    trigger?.click();
  };

  return (
    <>
      {/* Main Booking Section */}
      <Box
        sx={{
          maxWidth: "1200px",
          margin: "2rem auto",
          padding: "1.5rem",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "2rem",
        }}
      >
        {/* Left Section */}
        <Box sx={{ flex: 2 }}>
          <Typography variant="h4" sx={{ color: themeColor, mb: 1 }}>
            {propertyData.name}
          </Typography>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              mb: 2,
            }}
          >
            <LocationOn sx={{ color: themeColor }} /> {propertyData.address}
          </Typography>

          {/* Property Image */}
          <Box
            component="img"
            src={propertyData.image}
            alt={propertyData.name}
            sx={{
              width: "100%",
              borderRadius: "16px",
              mb: 3,
              boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
              objectFit: "cover",
              maxHeight: "350px",
            }}
          />

          {/* Booking Box */}
          <PropertyBookingBox />
        </Box>

        {/* Right Section: Billing */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#fff",
            borderRadius: "20px",
            padding: "1.5rem",
            boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            height: "fit-content",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, color: themeColor }}>
            Billing Summary
          </Typography>

          <Divider />

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Price ({stayType})</Typography>
            <Typography>
              <AttachMoneyIcon sx={{ fontSize: 16 }} /> {price.toLocaleString()}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>GST ({GST_PERCENT}%)</Typography>
            <Typography>
              <AttachMoneyIcon sx={{ fontSize: 16 }} />{" "}
              {gstAmount.toLocaleString()}
            </Typography>
          </Box>

          <Divider />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: 600,
            }}
          >
            <Typography>Total</Typography>
            <Typography>
              <AttachMoneyIcon sx={{ fontSize: 16 }} />{" "}
              {totalBill.toLocaleString()}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              sx={{
                bgcolor: themeColor,
                "&:hover": { bgcolor: "#a83454" },
                borderRadius: "10px",
                py: 1.5,
                fontWeight: 600,
              }}
              onClick={() => alert("Proceeding to Pay Now")}
            >
              Pay Now
            </Button>

            <Button
              variant="outlined"
              sx={{
                borderColor: themeColor,
                color: themeColor,
                "&:hover": { bgcolor: "#fce4ec" },
                borderRadius: "10px",
                py: 1.5,
                fontWeight: 600,
              }}
              onClick={handlePayLater}
            >
              Pay Later
            </Button>
            <RazorpayPayment
              amount={totalBill}
              onSuccess={handlePaymentSuccess}
              onFailure={handlePaymentFailure}
            />
          </Box>
        </Box>
      </Box>

      {/* Secure Payment Section */}
      <Box
        sx={{
          maxWidth: "1200px",
          margin: "3rem auto",
          padding: "2rem 1.5rem",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          gap: "2rem",
          backgroundColor: "#fff",
          borderRadius: "20px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        }}
      >
        {/* Illustration */}
        <Box
          component="img"
          src={securePay}
          alt="Secure Payments Illustration"
          sx={{
            width: isMobile ? "100%" : "45%",
            borderRadius: "16px",
          }}
        />

        {/* Description */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h5"
            sx={{
              color: themeColor,
              fontWeight: 700,
              mb: 1,
            }}
          >
            Secure Online Payments with Razorpay
          </Typography>
          <Typography sx={{ fontSize: "1rem", color: "#555", mb: 1.5 }}>
            Enjoy seamless and secure transactions powered by Razorpay. Your
            payments are protected with advanced encryption and trusted payment
            gateways, ensuring a smooth and worry-free checkout experience.
          </Typography>
          <Typography sx={{ fontSize: "1rem", color: "#777" }}>
            We accept all major credit/debit cards, UPI, and wallets to make
            your booking experience fast, easy, and secure.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default FinalBookingPage;
