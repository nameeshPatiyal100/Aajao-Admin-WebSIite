import React from "react";
import {
  Box,
  Modal,
  Typography,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  Chip,
  Stack,
  Rating,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/AccessTime";
import { keyframes } from "@mui/system";
import CountUp from "react-countup";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Booking {
  id: string;
  user_name: string;
  booking_price: number;
  rating: number;
  status: "confirmed" | "cancelled" | "pending";
}

interface PropertyRecord {
  property_name: string;
  max_price: number;
}

interface Props {
  open: boolean;
  handleClose: () => void;
  selectedProperty: PropertyRecord | null;
}

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulseGlow = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(136, 31, 155, 0.4);
  }
  70% {
    box-shadow: 0 0 0 12px rgba(136, 31, 155, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(136, 31, 155, 0);
  }
`;

export default function PropertyAnalyticsModal({
  open,
  handleClose,
  selectedProperty,
}: Props) {
  const bookings: Booking[] = [
    {
      id: "BK101",
      user_name: "Rahul Sharma",
      booking_price: 4500,
      rating: 4,
      status: "confirmed",
    },
    {
      id: "BK102",
      user_name: "Priya Singh",
      booking_price: 5200,
      rating: 5,
      status: "pending",
    },
    {
      id: "BK103",
      user_name: "Amit Verma",
      booking_price: 3900,
      rating: 3,
      status: "cancelled",
    },
  ];

  const revenueData = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 18000 },
    { month: "Mar", revenue: 15000 },
    { month: "Apr", revenue: 22000 },
  ];

  const totalRevenue = bookings.reduce(
    (sum, b) => sum + b.booking_price,
    0
  );

  const avgPrice = totalRevenue / bookings.length;

  const getStatusChip = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Chip
            icon={<CheckCircleIcon />}
            label="Confirmed"
            color="success"
            size="small"
          />
        );
      case "cancelled":
        return (
          <Chip
            icon={<CancelIcon />}
            label="Cancelled"
            color="error"
            size="small"
          />
        );
      default:
        return (
          <Chip
            icon={<PendingIcon />}
            label="Pending"
            color="warning"
            size="small"
          />
        );
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "98%", md: 1200 },
          maxHeight: "90vh",
          bgcolor: "#fff",
          borderRadius: 3,
          p: 4,
          overflowY: "auto",
        }}
      >
        {/* Close */}
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* ===== Top Section ===== */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box>
            <Typography variant="h5" fontWeight={700}>
              {selectedProperty?.property_name}
            </Typography>

            {/* Purple Tags */}
            <Box mt={1} display="flex" gap={1} flexWrap="wrap">
              {["Luxury", "Beach View", "Villa"].map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    backgroundColor: "#881f9b",
                    color: "#fff",
                    fontWeight: 500,
                  }}
                />
              ))}
            </Box>
          </Box>

          <Typography variant="h6" fontWeight={600}>
            Max Price: ₹{selectedProperty?.max_price}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* ===== Animated KPI Cards ===== */}
        <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap mb={4}>
          {/* Total Bookings */}
          <Box
            sx={{
              flex: "1 1 250px",
              p: 3,
              borderRadius: 3,
              background: "linear-gradient(135deg, #f3e8ff, #ffffff)",
              animation: `${fadeInUp} 0.6s ease both`,
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Total Bookings
            </Typography>

            <Typography
              variant="h4"
              fontWeight={700}
              sx={{ color: "#881f9b", mt: 1 }}
            >
              <CountUp end={bookings.length} duration={1.5} />
            </Typography>
          </Box>

          {/* Revenue Card with Pulse */}
          <Box
            sx={{
              flex: "1 1 250px",
              p: 3,
              borderRadius: 3,
              background: "linear-gradient(135deg, #ede9fe, #ffffff)",
              animation: `${pulseGlow} 2s infinite`,
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Total Revenue
            </Typography>

            <Typography
              variant="h4"
              fontWeight={700}
              sx={{ color: "#881f9b", mt: 1 }}
            >
              ₹
              <CountUp
                end={totalRevenue}
                duration={2}
                separator=","
              />
            </Typography>
          </Box>

          {/* Avg Booking Price */}
          <Box
            sx={{
              flex: "1 1 250px",
              p: 3,
              borderRadius: 3,
              background: "linear-gradient(135deg, #f3e8ff, #ffffff)",
              animation: `${fadeInUp} 0.8s ease both`,
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Avg Booking Price
            </Typography>

            <Typography
              variant="h4"
              fontWeight={700}
              sx={{ color: "#881f9b", mt: 1 }}
            >
              ₹
              <CountUp
                end={avgPrice}
                duration={2}
                separator=","
                decimals={0}
              />
            </Typography>
          </Box>
        </Stack>

        {/* ===== Booking Table ===== */}
        <Typography variant="h6" mb={2}>
          Booking Details
        </Typography>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Booking ID</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id} hover>
                <TableCell>{booking.id}</TableCell>
                <TableCell>{booking.user_name}</TableCell>
                <TableCell>₹{booking.booking_price}</TableCell>
                <TableCell>
                  <Rating
                    value={booking.rating}
                    readOnly
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {getStatusChip(booking.status)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Divider sx={{ my: 4 }} />

        {/* ===== Mini Revenue Chart ===== */}
        <Typography variant="h6" mb={2}>
          Revenue Trend
        </Typography>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={revenueData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#881f9b"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Modal>
  );
}