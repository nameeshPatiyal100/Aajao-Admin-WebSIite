import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {PropertyBookingBox} from "../../components"; // reuse the component
import { AttachMoney as AttachMoneyIcon, LocationOn } from "@mui/icons-material";
// import dayjs from "dayjs";

const themeColor = "#c14365";

// Example property data
const propertyData = {
  name: "Luxury Apartment in Chennai",
  address: "123 Ani Street, Chennai, India",
  categories: ["Apartment", "Luxury", "Family"],
  amenities: ["Pool", "Parking", "WiFi"],
  basePrice: 1500,
};

const FinalBookingPage: React.FC = () => {
  const [stayType, _setStayType] = useState<"Daily" | "Weekly" | "Monthly">("Daily");
//   const [checkIn, setCheckIn] = useState(dayjs().format("YYYY-MM-DD"));
//   const [checkOut, setCheckOut] = useState(dayjs().add(1, "day").format("YYYY-MM-DD"));
  const [guests, _setGuests] = useState(1);
//   const [manualCheckout, setManualCheckout] = useState(false);

  const [price, setPrice] = useState<number>(propertyData.basePrice);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Calculate price dynamically
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

  return (
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
      {/* Left Section: Property + Booking Selection */}
      <Box sx={{ flex: 2 }}>
        <Typography variant="h4" sx={{ color: themeColor, mb: 1 }}>
          {propertyData.name}
        </Typography>
        <Typography sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 2 }}>
          <LocationOn sx={{ color: themeColor }} /> {propertyData.address}
        </Typography>

        {/* Reuse PropertyBookingBox component but controlled from here */}
        <PropertyBookingBox
          // Pass props to control state externally if needed
        />
      </Box>

      {/* Right Section: Billing + Payment */}
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
            <AttachMoneyIcon sx={{ fontSize: 16 }} /> {gstAmount.toLocaleString()}
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
          <Typography>Total</Typography>
          <Typography>
            <AttachMoneyIcon sx={{ fontSize: 16 }} /> {totalBill.toLocaleString()}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", mt: 2 }}>
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
            onClick={() => alert("Booking saved for Pay Later")}
          >
            Pay Later
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FinalBookingPage;
