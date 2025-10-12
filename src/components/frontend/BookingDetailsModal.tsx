import React from "react";
import Modal from "react-modal";
import { Box, Typography, Divider, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface BookingDetailsModalProps {
  open: boolean;
  onClose: () => void;
  bookingId: string | null;
}

const themeColor = "#c14365";

Modal.setAppElement("#root");

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({
  open,
  onClose,
  bookingId,
}) => {
  if (!bookingId) return null;

  const booking = {
    id: bookingId,
    propertyName: "Luxury Apartment in Chennai",
    guestName: "John Doe",
    price: 4500,
    status: "Confirmed",
    date: "2025-10-10",
    checkIn: "2025-10-15",
    checkOut: "2025-10-18",
    transactions: [],
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      contentLabel="Booking Details"
      style={{
        overlay: {
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "80px",
        },
        content: {
          width: "600px",
          height: "70vh",
          maxHeight: "80vh",
          borderRadius: "16px",
          padding: "2rem",
          border: "none",
          boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Close Icon */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "#555",
            "&:hover": { color: themeColor },
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Scrollable Content */}
        <Box sx={{ flex: 1, overflowY: "auto", pr: 1 }}>
          <Typography
            variant="h5"
            sx={{
              color: themeColor,
              fontWeight: 700,
              mb: 2,
              textAlign: "center",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Booking Details
          </Typography>

          <Divider sx={{ mb: 2 }} />

          {/* Booking Info */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              columnGap: 3,
              rowGap: 1.5,
              mb: 3,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            <Box sx={{ flex: "1 1 45%" }}>
              <Typography variant="body1">
                <strong>Booking ID:</strong> {booking.id}
              </Typography>
            </Box>
            <Box sx={{ flex: "1 1 45%" }}>
              <Typography variant="body1">
                <strong>Property:</strong> {booking.propertyName}
              </Typography>
            </Box>
            <Box sx={{ flex: "1 1 45%" }}>
              <Typography variant="body1">
                <strong>Guest:</strong> {booking.guestName}
              </Typography>
            </Box>
            <Box sx={{ flex: "1 1 45%" }}>
              <Typography variant="body1">
                <strong>Price:</strong> ₹ {booking.price.toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ flex: "1 1 45%" }}>
              <Typography variant="body1">
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color:
                      booking.status === "Confirmed"
                        ? "green"
                        : booking.status === "Pending"
                          ? "#e6a100"
                          : "red",
                  }}
                >
                  {booking.status}
                </span>
              </Typography>
            </Box>
            <Box sx={{ flex: "1 1 45%" }}>
              <Typography variant="body1">
                <strong>Booking Date:</strong> {booking.date}
              </Typography>
            </Box>
            <Box sx={{ flex: "1 1 100%" }}>
              <Typography variant="body1">
                <strong>Stay:</strong> {booking.checkIn} – {booking.checkOut}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Transactions Section */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: themeColor,
              mb: 1,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Transactions
          </Typography>

          {booking.transactions.length > 0 ? (
            booking.transactions.map((_tx, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  py: 1,
                  borderBottom: "1px solid #eee",
                }}
              >
                {/* <Typography variant="body2">{tx.id}</Typography>
                <Typography variant="body2">₹ {tx.amount}</Typography>
                <Typography variant="body2" sx={{ color: "green" }}>
                  {tx.status}
                </Typography> */}
              </Box>
            ))
          ) : (
            <Typography
              variant="body2"
              sx={{
                color: "#777",
                fontStyle: "italic",
                mb: 3,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              No transactions
            </Typography>
          )}
        </Box>

        {/* Close Button fixed at bottom */}
        <Box sx={{ mt: "auto" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: themeColor,
              "&:hover": { bgcolor: "#a83454" },
              borderRadius: "10px",
              textTransform: "none",
              px: 3,
              py: 1.2,
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
            }}
            onClick={onClose}
            fullWidth
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BookingDetailsModal;
