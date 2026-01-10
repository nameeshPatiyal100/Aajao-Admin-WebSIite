import React from "react";
import Modal from "react-modal";
import {
  Box,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { BookingRow } from "./types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: BookingRow) => void;
  booking: BookingRow | null;
  isEdit?: boolean;
}

Modal.setAppElement("#root"); // ensure modal accessibility

const labelStyle = {
  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
    borderColor: "#881f9b",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#881f9b",
  },
};

const BookingDetailModal = ({
  open,
  onClose,
  onSubmit,
  booking,
  isEdit = false,
}: Props) => {
  if (!booking) return null;

  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      overlayClassName="booking-modal-overlay"
      className="booking-modal-content"
    >
      {/* HEADER */}
      <Box
        sx={{
          p: 3,
          bgcolor: "#fff",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" fontWeight={700} color="#881f9b">
          Booking Details – {booking.id}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* BODY */}
      <Box
        sx={{
          p: 4,
          maxHeight: "calc(100vh - 150px)",
          overflowY: "auto",
          bgcolor: "#f4f6fa",
        }}
      >
        {/* BOOKING INFO */}
        <Section title="Booking Information">
          <Grid container spacing={2}>
            <ReadOnly label="Booking ID" value={booking.id} />
            <ReadOnly label="Created At" value={booking.createdAt} />

            <Grid item xs={12} md={4}>
              <TextField
                select
                fullWidth
                label="Booking Status"
                value={booking.bookingStatus}
                disabled={!isEdit}
                sx={labelStyle}
              >
                <MenuItem value="confirmed">Confirmed</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </TextField>
            </Grid>

            <ReadOnly label="Check In" value={booking.checkIn} />
            <ReadOnly label="Check Out" value={booking.checkOut} />
          </Grid>
        </Section>

        {/* PROPERTY */}
        <Section title="Property Details">
          <Grid container spacing={2}>
            <ReadOnly label="Property Name" value={booking.propertyName} />
            <ReadOnly label="Property Type" value="Apartment" />
            <ReadOnly label="Property Email" value="property@email.com" />
          </Grid>
        </Section>

        {/* HOST */}
        <Section title="Host Details">
          <Grid container spacing={2}>
            <ReadOnly label="Host Name" value="Ramesh Kumar" />
            <ReadOnly label="Host Email" value="host@email.com" />
            <ReadOnly label="Host Contact" value="+91 9876543210" />
          </Grid>
        </Section>

        {/* USER */}
        <Section title="User Details">
          <Grid container spacing={2}>
            <ReadOnly label="User Name" value={booking.userName} />
          </Grid>
        </Section>

        {/* PAYMENT */}
        <Section title="Payment Details">
          <Grid container spacing={2}>
            <ReadOnly label="Price" value={`₹${booking.amount}`} />
            <ReadOnly label="Tax" value="₹1,200" />
            <ReadOnly label="Discount %" value="5%" />
            <ReadOnly label="Total Amount" value="₹13,700" />
            <ReadOnly label="Payment Status" value={booking.paymentStatus} />
            <ReadOnly label="Payment ID" value="PAY_987654" />
          </Grid>
        </Section>
      </Box>

      {/* FOOTER */}
      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          bgcolor: "#fff",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>

        {isEdit && (
          <Button
            variant="contained"
            sx={{ background: "#881f9b" }}
            onClick={() => onSubmit(booking)}
          >
            Save Changes
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default BookingDetailModal;

/* ---------- Helpers ---------- */

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box mb={4}>
    <Typography fontWeight={600} mb={1}>
      {title}
    </Typography>
    <Divider sx={{ mb: 2 }} />
    {children}
  </Box>
);

const ReadOnly = ({ label, value }: { label: string; value: any }) => (
  <Grid item xs={12} md={4}>
    <TextField fullWidth label={label} value={value} disabled sx={labelStyle} />
  </Grid>
);
