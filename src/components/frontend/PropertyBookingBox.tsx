import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Pool,
  LocalParking,
  Wifi,
  Star,
  LocationOn,
  // AttachMoney as AttachMoneyIcon,
  Add,
  Remove,
} from "@mui/icons-material";
import dayjs from "dayjs";

type StayType = "Daily" | "Weekly" | "Monthly";

const themeColor = "#c14365";

const PropertyBookingBox: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isOnFinalBookingPage = location.pathname === "/property-booking/final";

  const [stayType, setStayType] = useState<StayType>("Daily");
  const [checkIn, setCheckIn] = useState(dayjs().format("YYYY-MM-DD"));
  const [checkOut, setCheckOut] = useState(
    dayjs().add(1, "day").format("YYYY-MM-DD")
  );
  const [checkInTime, setCheckInTime] = useState("12:00");
  const [checkOutTime, setCheckOutTime] = useState("11:00");
  const [price, setPrice] = useState<number>(1500);
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [manualCheckout, setManualCheckout] = useState<boolean>(false);

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Update checkout date & price based on stay type
  useEffect(() => {
    let newCheckOut = dayjs(checkIn);
    let newPrice = 1500;

    switch (stayType) {
      case "Daily":
        newCheckOut = dayjs(checkIn).add(1, "day");
        newPrice = 1500 * (adults + children * 0.5); // children count for 50%
        break;
      case "Weekly":
        newCheckOut = dayjs(checkIn).add(7, "day");
        newPrice = 1500 * 7 * (adults + children * 0.5);
        break;
      case "Monthly":
        newCheckOut = dayjs(checkIn).add(30, "day");
        newPrice = 1500 * 30 * (adults + children * 0.5);
        break;
    }

    if (!manualCheckout) {
      setCheckOut(newCheckOut.format("YYYY-MM-DD"));
    }

    setPrice(newPrice);
  }, [stayType, checkIn, adults, children, manualCheckout]);

  const handleAdultsChange = (delta: number) => {
    setAdults((prev) => Math.max(1, prev + delta));
  };

  const handleChildrenChange = (delta: number) => {
    setChildren((prev) => Math.max(0, prev + delta));
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "20px",
        padding: isMobile ? "1.5rem" : isTablet ? "2rem" : "2.5rem",
        width: "100%",
        margin: "2rem auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      {/* 🏠 Property Info Section */}
      <Box sx={{ width: "100%", borderBottom: "1px solid #eee", pb: 2 }}>
        {/* 🏡 Property Title */}
        <Typography
          variant="h5"
          sx={{
            color: "#222",
            fontWeight: 700,
            fontSize: isMobile ? "1.3rem" : "1.6rem",
            mb: 1.5, // gap between title and price
          }}
        >
          Luxury Stay at Aajoo Villa
        </Typography>

        {/* 💰 Price */}
        <Typography
          variant="h4"
          sx={{
            color: themeColor,
            fontWeight: 700,
            fontSize: isMobile ? "1.6rem" : "2rem",
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            mb: 1, // small gap below price
          }}
        >
          ₹{price.toLocaleString()}
        </Typography>

        {/* 📍 Location */}
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: "#555",
            mt: 0.5,
            fontSize: isMobile ? "0.9rem" : "1rem",
          }}
        >
          <LocationOn sx={{ color: themeColor, fontSize: 20 }} /> 123 Ani
          Street, Chennai, India
        </Typography>

        {/* 🏷️ Chips */}
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {["Apartment", "Luxury", "Family"].map((label) => (
            <Chip
              key={label}
              label={label}
              sx={{
                color: "#fff",
                bgcolor: themeColor,
                fontSize: isMobile ? "0.75rem" : "0.85rem",
              }}
            />
          ))}
        </Box>

        {/* 🌟 Amenities */}
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            color: "#444",
            fontSize: isMobile ? "0.85rem" : "1rem",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Pool sx={{ color: themeColor, fontSize: isMobile ? 18 : 22 }} />{" "}
            Pool
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <LocalParking
              sx={{ color: themeColor, fontSize: isMobile ? 18 : 22 }}
            />{" "}
            Parking
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Wifi sx={{ color: themeColor, fontSize: isMobile ? 18 : 22 }} />{" "}
            WiFi
          </Box>
        </Box>

        {/* ⭐ Ratings */}
        <Box sx={{ mt: 1, display: "flex", gap: 0.3 }}>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              sx={{ color: "#FFD700", fontSize: isMobile ? 18 : 22 }}
            />
          ))}
        </Box>
      </Box>

      {/* 📅 Booking Section */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        {/* Stay Type + Dates */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <FormControl fullWidth sx={{ flex: 1 }}>
            <InputLabel>Stay Type</InputLabel>
            <Select
              value={stayType}
              label="Stay Type"
              onChange={(e) => setStayType(e.target.value as StayType)}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: themeColor,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: themeColor,
                },
              }}
            >
              <MenuItem value="Daily">Daily</MenuItem>
              <MenuItem value="Weekly">Weekly</MenuItem>
              <MenuItem value="Monthly">Monthly</MenuItem>
            </Select>
          </FormControl>

          <TextField
            type="date"
            label="Check-in"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <TextField
            type="date"
            label="Check-out"
            value={checkOut}
            onChange={(e) => {
              setCheckOut(e.target.value);
              setManualCheckout(true);
            }}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Box>

        {/* Check-in/out Time */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "1.5rem",
          }}
        >
          <TextField
            type="time"
            label="Check-in Time"
            value={checkInTime}
            onChange={(e) => setCheckInTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            type="time"
            label="Check-out Time"
            value={checkOutTime}
            onChange={(e) => setCheckOutTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Box>

        {/* Guests Selection */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            // justifyContent: "space-between",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          {/* Adults */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: `1px solid ${themeColor}`,
              borderRadius: "10px",
              px: 2,
              py: 0.5,
              gap: 1.5,
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>Adults:</Typography>
            <IconButton
              size="small"
              onClick={() => handleAdultsChange(-1)}
              sx={{
                bgcolor: themeColor,
                color: "#fff",
                "&:hover": { bgcolor: "#a83454" },
              }}
            >
              <Remove fontSize="small" />
            </IconButton>
            <Typography sx={{ minWidth: 24, textAlign: "center" }}>
              {adults}
            </Typography>
            <IconButton
              size="small"
              onClick={() => handleAdultsChange(1)}
              sx={{
                bgcolor: themeColor,
                color: "#fff",
                "&:hover": { bgcolor: "#a83454" },
              }}
            >
              <Add fontSize="small" />
            </IconButton>
          </Box>

          {/* Children */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: `1px solid ${themeColor}`,
              borderRadius: "10px",
              px: 2,
              py: 0.5,
              gap: 1.5,
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>Children:</Typography>
            <IconButton
              size="small"
              onClick={() => handleChildrenChange(-1)}
              sx={{
                bgcolor: themeColor,
                color: "#fff",
                "&:hover": { bgcolor: "#a83454" },
              }}
            >
              <Remove fontSize="small" />
            </IconButton>
            <Typography sx={{ minWidth: 24, textAlign: "center" }}>
              {children}
            </Typography>
            <IconButton
              size="small"
              onClick={() => handleChildrenChange(1)}
              sx={{
                bgcolor: themeColor,
                color: "#fff",
                "&:hover": { bgcolor: "#a83454" },
              }}
            >
              <Add fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* 🧾 Book Now Button */}
        {!isOnFinalBookingPage && (
          <Button
            variant="contained"
            sx={{
              bgcolor: themeColor,
              color: "#fff",
              px: isMobile ? 4 : 6,
              py: 1.5,
              borderRadius: "10px",
              fontWeight: 600,
              textTransform: "none",
              width: isMobile ? "100%" : "auto",
              "&:hover": { bgcolor: "#a83454" },
              mt: 2,
            }}
            onClick={() =>
              navigate("/property-booking/final", {
                state: {
                  stayType,
                  checkIn,
                  checkOut,
                  checkInTime,
                  checkOutTime,
                  adults,
                  children,
                  price,
                },
              })
            }
          >
            Book Now
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default PropertyBookingBox;
