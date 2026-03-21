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

interface Props {
  open: boolean;
  handleClose: () => void;
  selectedProperty: any;
  analyticsData: any;
  loading: boolean;
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
  analyticsData,
}: Props) {
  const propertyDetail = analyticsData?.propertyDetail;

  /* ================= BOOKINGS ================= */
  const bookings =
    analyticsData?.bookings?.map((b: any) => ({
      id: b.book_id,
      user_name: b["userDetails.user_fullName"],
      booking_price: b.book_total_amt,
      rating: b["bookingReview.br_rating"],
      statusTitle: b["bookingStatus.bs_title"],
      statusColor: b["bookingStatus.bs_code"],
    })) || [];

  /* ================= GRAPH ================= */
  let revenueData =
    analyticsData?.revenueGraph?.chartData?.map((item: any) => ({
      month: item.month,
      revenue: item.revenue,
    })) || [];

  // ✅ Ensure line always visible (duplicate point if only one)
  if (revenueData.length === 1) {
    revenueData = [
      ...revenueData,
      { ...revenueData[0], month: revenueData[0].month + " " },
    ];
  }

  /* ================= KPIs ================= */
  const totalRevenue = analyticsData?.analytics?.totalRevenue || 0;
  const avgPrice = analyticsData?.analytics?.avgBookingPrice || 0;
  const totalBookings = analyticsData?.totalRecords || 0;

  const categories = analyticsData?.categoryTitles || [];

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
              {propertyDetail?.property_name || "-"}
            </Typography>

            {/* ✅ Categories from API */}
            <Box mt={1} display="flex" gap={1} flexWrap="wrap">
              {categories.map((tag: string) => (
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

          {/* ✅ Max price from API */}
          <Typography variant="h6" fontWeight={600}>
            Max Price: ₹{propertyDetail?.property_price || 0}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* ===== KPI Cards ===== */}
        <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap mb={4}>
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
              <CountUp end={totalBookings} duration={1.5} />
            </Typography>
          </Box>

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
              <CountUp end={totalRevenue} duration={2} separator="," />
            </Typography>
          </Box>

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
              <CountUp end={avgPrice} duration={2} separator="," />
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
            {bookings.map((booking: any) => (
              <TableRow key={booking.id} hover>
                <TableCell>{booking.id}</TableCell>
                <TableCell>{booking.user_name}</TableCell>
                <TableCell>₹{booking.booking_price}</TableCell>

                {/* ✅ Rating or No Review */}
                <TableCell>
                  {booking.rating ? (
                    <Rating value={booking.rating} readOnly size="small" />
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No Review
                    </Typography>
                  )}
                </TableCell>

                {/* ✅ Status from API */}
                <TableCell>
                  <Chip
                    label={booking.statusTitle}
                    size="small"
                    sx={{
                      backgroundColor: booking.statusColor,
                      color: "#fff",
                      fontWeight: 500,
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Divider sx={{ my: 4 }} />

        {/* ===== Revenue Chart ===== */}
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
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Modal>
  );
}