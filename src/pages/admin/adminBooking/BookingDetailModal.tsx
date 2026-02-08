import React, { useState } from "react";
import Modal from "react-modal";
import {
  Box,
  Typography,
  Grid,
  MenuItem,
  Button,
  IconButton,
  Divider,
  Select,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { BookingRow } from "./types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: BookingRow, status: string) => void;
  booking: BookingRow | null;
  isEdit?: boolean;
}

const InfoSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
    <Typography fontWeight={600} mb={1}>
      {title}
    </Typography>
    <Divider sx={{ mb: 2 }} />
    {children}
  </Paper>
);


const KeyValueRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      py: 0.75,
    }}
  >
    <Typography fontSize={13} color="text.secondary">
      {label}
    </Typography>
    <Typography fontSize={14} fontWeight={500}>
      {value || "-"}
    </Typography>
  </Box>
);
const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return { bg: "#DCFCE7", text: "#166534" };
    case "pending":
      return { bg: "#FEF9C3", text: "#854D0E" };
    case "cancelled":
      return { bg: "#FEE2E2", text: "#991B1B" };
    case "completed":
      return { bg: "#E0E7FF", text: "#3730A3" };
    default:
      return { bg: "#E5E7EB", text: "#374151" };
  }
};

const StatusBadge = ({ status }: { status: string }) => {
  const c = getStatusColor(status);
  return (
    <Box
      sx={{
        px: 1.5,
        py: 0.5,
        borderRadius: "999px",
        fontSize: 12,
        fontWeight: 600,
        backgroundColor: c.bg,
        color: c.text,
        textTransform: "capitalize",
      }}
    >
      {status}
    </Box>
  );
};


Modal.setAppElement("#root");

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
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography fontSize={18} fontWeight={700}>
            Booking Details
          </Typography>
          <Typography fontSize={13} color="text.secondary">
            Booking ID: B{booking.id}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          <StatusBadge status={status} />
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      {/* BODY */}
      <Box sx={{ p: 3, maxHeight: "65vh", overflowY: "auto" }}>
        <InfoSection title="Booking Information">
          <KeyValueRow label="Created At" value={booking.createdAt} />
          <KeyValueRow label="Check In" value={booking.checkIn} />
          <KeyValueRow label="Check Out" value={booking.checkOut} />
        </InfoSection>

        <InfoSection title="Property Details">
          <KeyValueRow label="Property Name" value={booking.propertyName} />
          <KeyValueRow label="Property Type" value="Apartment" />
        </InfoSection>

        <InfoSection title="Host Details">
          <KeyValueRow label="Host Name" value="Ramesh Kumar" />
          <KeyValueRow label="Contact" value="+91 9876543210" />
        </InfoSection>

        <InfoSection title="User Details">
          <KeyValueRow label="User Name" value={booking.userName} />
        </InfoSection>

        <InfoSection title="Payment Details">
          <KeyValueRow label="Amount" value={`₹${booking.amount}`} />
          <KeyValueRow label="Payment Status" value={booking.paymentStatus} />
        </InfoSection>
      </Box>

      {/* FOOTER – STATUS CONTROL */}
      <Box
        sx={{
          p: 3,
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <Typography fontSize={13} fontWeight={600} mb={1}>
          Change Booking Status
        </Typography>

        <Select
          fullWidth
          size="small"
          value={status}
          disabled={!isEdit}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="confirmed">Confirmed</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>

        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>

          {isEdit && (
            <Button
              variant="contained"
              onClick={() => onSubmit(booking, status)}
            >
              Update Status
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};


export default BookingDetailModal;
