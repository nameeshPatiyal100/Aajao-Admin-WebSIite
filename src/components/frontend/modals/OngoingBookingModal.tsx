import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PaymentIcon from "@mui/icons-material/Payment";
import DirectionsIcon from "@mui/icons-material/Directions";
import CancelIcon from "@mui/icons-material/Cancel";
import LogoutIcon from "@mui/icons-material/Logout";
import RateReviewIcon from "@mui/icons-material/RateReview";

interface OngoingBookingModalProps {
  open: boolean;
  onClose: () => void;
  booking: any;
}

const OngoingBookingModal: React.FC<OngoingBookingModalProps> = ({
  open,
  onClose,
  booking,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        (err) => console.warn("Geolocation denied:", err)
      );
    }
  }, []);

  if (!booking) return null;

  const handleCheckout = () => {
    navigate(`/user/checkout/${booking.id}`, { state: { booking } });
  };

  const handleCancelBooking = () => {
    setConfirmOpen(true);
  };

  const confirmCancel = () => {
    setConfirmOpen(false);
    navigate(`/booking/cancel-result/${booking.id}`, { state: { booking } });
  };

  const handleSupport = () => {
    navigate("/support");
  };

  const handleGetDirections = () => {
    const destination = encodeURIComponent(booking.location || "Manali, Himachal Pradesh");
    if (userLocation) {
      const { lat, lng } = userLocation;
      window.open(
        `https://www.google.com/maps/dir/${lat},${lng}/${destination}`,
        "_blank"
      );
    } else {
      window.open(`https://www.google.com/maps/search/?api=1&query=${destination}`, "_blank");
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(6px)",
        }}
      >
        <Box
          sx={{
            width: isMobile ? "95%" : "80%",
            maxWidth: "900px",
            maxHeight: "90vh",
            overflowY: "auto",
            backgroundColor: "#fff",
            borderRadius: "20px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
            p: { xs: 3, sm: 4 },
          }}
        >
          {/* 🏡 Header Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              gap: 4,
              mb: 4,
            }}
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              src={
                booking.image ||
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
              }
              alt={booking.propertyName}
              style={{
                width: isMobile ? "100%" : "280px",
                height: isMobile ? "200px" : "220px",
                borderRadius: "20px",
                objectFit: "cover",
                boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
              }}
            />

            <Box sx={{ flex: 1 }}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: "#c14365",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {booking.propertyName || "Aajoo Premium Homestay"}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "gray", mt: 1 }}>
                  {booking.location || "Manali, Himachal Pradesh"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mt: 1.5,
                    lineHeight: 1.6,
                    color: "#555",
                    maxWidth: "90%",
                  }}
                >
                  Experience serene mountain views, cozy interiors, and top-class
                  hospitality. Enjoy peaceful mornings and personalized service
                  for an unforgettable stay.
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 2, color: "#2E7D32", fontWeight: 600 }}
                >
                  Status: {booking.status || "Ongoing"}
                </Typography>
              </motion.div>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* 📋 Booking Details */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              rowGap: 1.5,
              columnGap: 2,
              mt: 1,
            }}
          >
            {[
              ["Booking ID", booking.id],
              ["Status", booking.status],
              ["Property Name", booking.propertyName],
              ["Location", booking.location],
              ["Booked Date", booking.bookedDate],
              ["Check-In", booking.checkIn],
              ["Check-Out", booking.checkOut],
              [
                "Total Price",
                <span style={{ color: "#2E7D32", fontWeight: 700 }}>
                  ₹ {booking.totalPrice.toLocaleString()}
                </span>,
              ],
            ].map(([label, value]) => (
              <Box
                key={label}
                sx={{
                  flex: "1 1 calc(33.33% - 10px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  minWidth: "250px",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    color: "#444",
                    fontSize: "0.95rem",
                    minWidth: "140px",
                  }}
                >
                  {label}:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    color: "#222",
                    fontSize: "0.95rem",
                    ml: 0.5,
                  }}
                >
                  {value}
                </Typography>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* 🚀 Action Section */}
          <Box
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 3,
        backgroundColor: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          color: "#c14365",
          mb: 1,
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Actions
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: "#777", mb: 3, fontFamily: "'Poppins', sans-serif" }}
      >
        Manage your booking easily from below options
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1.5,
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={handleCheckout}
          startIcon={<LogoutIcon />}
          sx={{
            bgcolor: "#c14365",
            "&:hover": { bgcolor: "#a83454" },
            px: 3,
            py: 0.8,
            fontWeight: 600,
            borderRadius: 2,
            textTransform: "none",
            minWidth: "140px",
            fontSize: "0.9rem",
          }}
        >
          Check Out
        </Button>

        <Button
          variant="contained"
          startIcon={<PaymentIcon />}
          sx={{
            bgcolor: "#c14365",
            "&:hover": { bgcolor: "#a83454" },
            px: 3,
            py: 0.8,
            fontWeight: 600,
            borderRadius: 2,
            textTransform: "none",
            minWidth: "140px",
            fontSize: "0.9rem",
          }}
        >
          Pay Now
        </Button>

        <Button
          variant="contained"
          onClick={handleGetDirections}
          startIcon={<DirectionsIcon />}
          sx={{
            bgcolor: "#4caf50",
            "&:hover": { bgcolor: "#3b9c43" },
            px: 3,
            py: 0.8,
            fontWeight: 600,
            borderRadius: 2,
            textTransform: "none",
            minWidth: "160px",
            fontSize: "0.9rem",
          }}
        >
          Get Directions
        </Button>

        <Button
          variant="contained"
          onClick={handleCancelBooking}
          startIcon={<CancelIcon />}
          sx={{
            bgcolor: "#f44336",
            "&:hover": { bgcolor: "#d32f2f" },
            px: 3,
            py: 0.8,
            fontWeight: 600,
            borderRadius: 2,
            textTransform: "none",
            minWidth: "160px",
            fontSize: "0.9rem",
          }}
        >
          Cancel Booking
        </Button>

        <Button
          variant="contained"
          onClick={handleSupport}
          startIcon={<SupportAgentIcon />}
          sx={{
            bgcolor: "#1976d2",
            "&:hover": { bgcolor: "#145ca3" },
            px: 3,
            py: 0.8,
            fontWeight: 600,
            borderRadius: 2,
            textTransform: "none",
            minWidth: "170px",
            fontSize: "0.9rem",
          }}
        >
          Customer Support
        </Button>

        {/* 💬 Extra Actions */}
        <Button
          variant="contained"
          startIcon={<RateReviewIcon />}
          sx={{
            bgcolor: "#ff9800",
            "&:hover": { bgcolor: "#fb8c00" },
            px: 3,
            py: 0.8,
            fontWeight: 600,
            borderRadius: 2,
            textTransform: "none",
            minWidth: "150px",
            fontSize: "0.9rem",
          }}
        >
          Rate Stay
        </Button>
      </Box>
    </Box>

          {/* Close Button */}
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Button
              variant="text"
              onClick={onClose}
              sx={{
                color: "gray",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": { color: "#000" },
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* ❌ Cancel Confirmation Dialog */}
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: 3,
            padding: 2,
            width: "90%",
            maxWidth: "400px",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            color: "#c14365",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Cancel Booking?
        </DialogTitle>

        <DialogContent>
          <Typography variant="body1" sx={{ fontSize: 15 }}>
            Are you sure you want to cancel this booking? This action cannot be
            undone.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "space-between", px: 3 }}>
          <Button
            onClick={() => setConfirmOpen(false)}
            sx={{ color: "gray", fontWeight: 600, textTransform: "none" }}
          >
            No, Keep It
          </Button>
          <Button
            onClick={confirmCancel}
            sx={{
              color: "#fff",
              bgcolor: "#c14365",
              "&:hover": { bgcolor: "#a83454" },
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OngoingBookingModal;
