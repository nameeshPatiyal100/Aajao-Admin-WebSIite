// BookingDetails.tsx
import React from "react";
import { Box, Typography } from "@mui/material";

interface BookingDetailsProps {
  booking: any;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({ booking }) => {
  const rows: [string, React.ReactNode][] = [
    ["Booking ID", booking.id ?? "—"],
    ["Status", booking.status ?? "—"],
    ["Property", booking.propertyName ?? "—"],
    ["Location", booking.location ?? "—"],
    ["Booked On", booking.bookedDate ?? "—"],
    ["Check-In", booking.checkIn ?? "—"],
    ["Check-Out", booking.checkOut ?? "—"],
    [
      "Total Price",
      <span style={{ color: "#2E7D32", fontWeight: 700 }}>
        ₹ {(booking.totalPrice ?? 0).toLocaleString()}
      </span>,
    ],
  ];

  return (
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
      {rows.map(([label, value]) => (
        <Box
          key={label}
          sx={{
            flex: "1 1 calc(33.33% - 10px)",
            display: "flex",
            alignItems: "center",
            minWidth: { xs: "100%", sm: "45%", md: "250px" },
            gap: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              color: "#666",
              fontSize: "0.9rem",
              backgroundColor: "#faf7f8",
              px: 1,
              py: 0.5,
              borderRadius: 1,
              minWidth: "120px",
            }}
          >
            {label}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
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
  );
};

export default BookingDetails;
