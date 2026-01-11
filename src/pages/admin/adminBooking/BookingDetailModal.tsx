import React, { useState } from "react";
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
  "& .MuiOutlinedInput-root fieldset": {
    borderColor: "#881f9b",
  },
  "& .MuiOutlinedInput-root:hover fieldset": {
    borderColor: "#881f9b",
  },
  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
    borderColor: "#881f9b",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#881f9b",
  },
  "& .Mui-disabled": {
    color: "#881f9b", // ✅ show read-only data in purple
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
  const [status, setStatus] = useState(booking.bookingStatus);

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
          bgcolor: "#fff", // ✅ white background
        }}
      >
        {/* BOOKING INFO */}
        <Section title="Booking Information">
          <Grid container spacing={2}>
            <ReadOnly label="Booking ID" value={booking.id} />
            <ReadOnly label="Created At" value={booking.createdAt} />
            <ReadOnly label="Check In" value={booking.checkIn} />
            <ReadOnly label="Check Out" value={booking.checkOut} />
          </Grid>

          {/* Booking Status moved outside grid for full width */}
          <Box mt={2}>
            <TextField
              select
              fullWidth
              label="Booking Status"
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as
                    | "confirmed"
                    | "pending"
                    | "cancelled"
                    | "completed"
                )
              }
              disabled={!isEdit}
              sx={labelStyle}
              // ✅ force dropdown to render inside modal
              SelectProps={{
                MenuProps: {
                  disablePortal: true,
                  container: document.getElementById("root"),
                },
              }}
            >
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </TextField>
          </Box>
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
        <Button
          variant="outlined"
          sx={{ borderColor: "#881f9b", color: "#881f9b" }}
          onClick={onClose}
        >
          Cancel
        </Button>

        {isEdit && (
          <Button
            variant="contained"
            sx={{ backgroundColor: "#881f9b", color: "#fff" }}
            onClick={() => onSubmit(booking)}
          >
            Update
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
    <Typography fontWeight={600} mb={1} color="#881f9b">
      {title}
    </Typography>
    <Divider sx={{ mb: 2 }} />
    {children}
  </Box>
);

const ReadOnly = ({ label, value }: { label: string; value: any }) => (
  <Box mb={2}>
    <TextField fullWidth label={label} value={value} disabled sx={labelStyle} />
  </Box>
);
