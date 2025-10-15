import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { OngoingBookingModal } from "../../components"; // <-- Import Modal

const bookings = [
  {
    id: "BK12345",
    propertyName: "Sea View Villa",
    location: "Goa, India",
    bookedDate: "2025-10-10",
    checkIn: "2025-10-20",
    checkOut: "2025-10-23",
    totalPrice: 12500,
    status: "Confirmed",
  },
  {
    id: "BK67890",
    propertyName: "Mountain Retreat",
    location: "Manali, India",
    bookedDate: "2025-10-05",
    checkIn: "2025-10-15",
    checkOut: "2025-10-18",
    totalPrice: 8700,
    status: "Pending",
  },
];

const UserOngoingBooking: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 2,
          color: "#c14365",
          textAlign: isMobile ? "center" : "left",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Ongoing Bookings
      </Typography>

      {bookings.map((booking) => (
        <Card
          key={booking.id}
          onClick={() => setSelectedBooking(booking)}
          sx={{
            width: "100%",
            borderRadius: 3,
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            transition: "all 0.2s ease",
            cursor: "pointer",
            "&:hover": {
              transform: "scale(1.01)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
            },
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "center",
              gap: 2,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {/* Left Section */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#1A237E",
                  mb: 0.5,
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {booking.propertyName}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: 15 }}
              >
                {booking.location}
              </Typography>

              <Divider sx={{ my: 1.5 }} />

              <Typography variant="body2" sx={{ fontSize: 14, mb: 0.5 }}>
                <strong>Booking ID:</strong> {booking.id}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 14, mb: 0.5 }}>
                <strong>Booked On:</strong> {booking.bookedDate}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 14, mb: 0.5 }}>
                <strong>Check-In:</strong> {booking.checkIn}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 14 }}>
                <strong>Check-Out:</strong> {booking.checkOut}
              </Typography>
            </Box>

            {/* Right Section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: isMobile ? "flex-start" : "flex-end",
                gap: 1,
                minWidth: isMobile ? "100%" : "180px",
              }}
            >
              <Chip
                label={booking.status}
                color={getStatusColor(booking.status) as any}
                sx={{
                  fontWeight: 600,
                  fontSize: 14,
                  borderRadius: "8px",
                  fontFamily: "'Poppins', sans-serif",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#2E7D32",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                ₹ {booking.totalPrice.toLocaleString()}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}

      {/* Booking Details Modal */}
      <OngoingBookingModal
        open={Boolean(selectedBooking)}
        onClose={() => setSelectedBooking(null)}
        booking={selectedBooking}
      />
    </Box>
  );
};

export default UserOngoingBooking;
