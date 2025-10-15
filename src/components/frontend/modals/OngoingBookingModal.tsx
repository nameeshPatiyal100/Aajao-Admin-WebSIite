import React, { useState } from "react";
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

  if (!booking) return null;

  const handleCheckout = () => {
    navigate(`/checkout/${booking.id}`, { state: { booking } });
  };

  const handleCancelBooking = () => {
    setConfirmOpen(true); // open confirmation dialog
  };

  const confirmCancel = () => {
    setConfirmOpen(false);
    navigate(`/cancel-booking/${booking.id}`, { state: { booking } });
  };

  return (
    <>
      {/* Main Booking Details Modal */}
      <Modal
        open={open}
        onClose={onClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(5px)",
        }}
      >
        <Box
          sx={{
            width: isMobile ? "90%" : "80%",
            maxWidth: "700px",
            backgroundColor: "#fff",
            borderRadius: "20px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
            p: { xs: 3, sm: 5 },
            mt: { xs: 6, sm: 8 },
            overflowY: "auto",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#c14365",
              mb: 2,
              textAlign: "center",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Booking Details
          </Typography>

          <Divider sx={{ mb: 2 }} />

          {/* Booking Info */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Typography variant="body1">
              <strong>Booking ID:</strong> {booking.id}
            </Typography>
            <Typography variant="body1">
              <strong>Status:</strong> {booking.status}
            </Typography>
            <Typography variant="body1">
              <strong>Property Name:</strong> {booking.propertyName}
            </Typography>
            <Typography variant="body1">
              <strong>Location:</strong> {booking.location}
            </Typography>
            <Typography variant="body1">
              <strong>Booked Date:</strong> {booking.bookedDate}
            </Typography>
            <Typography variant="body1">
              <strong>Check-In:</strong> {booking.checkIn}
            </Typography>
            <Typography variant="body1">
              <strong>Check-Out:</strong> {booking.checkOut}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Total Price:</strong>{" "}
              <span style={{ color: "#2E7D32", fontWeight: 700 }}>
                ₹ {booking.totalPrice.toLocaleString()}
              </span>
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={handleCheckout}
              sx={{
                bgcolor: "#c14365",
                "&:hover": { bgcolor: "#a83454" },
                px: 4,
                py: 1.2,
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
                width: isMobile ? "100%" : "auto",
              }}
            >
              Checkout Now
            </Button>

            <Button
              variant="outlined"
              onClick={handleCancelBooking}
              sx={{
                borderColor: "#c14365",
                color: "#c14365",
                "&:hover": { bgcolor: "#fce4ec" },
                px: 4,
                py: 1.2,
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
                width: isMobile ? "100%" : "auto",
              }}
            >
              Cancel Booking
            </Button>
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

      {/* Confirmation Dialog */}
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
          sx={{ fontWeight: 700, color: "#c14365", fontFamily: "'Poppins', sans-serif" }}
        >
          Cancel Booking?
        </DialogTitle>

        <DialogContent>
          <Typography variant="body1" sx={{ fontSize: 15 }}>
            Are you sure you want to cancel this booking? This action cannot be undone.
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
