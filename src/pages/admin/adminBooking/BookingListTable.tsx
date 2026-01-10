import React from "react";
import {
  Box,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Visibility,
  Edit,
  Cancel,
  Delete,
} from "@mui/icons-material";
import { BookingRow } from "./types";

interface BookingListTableProps {
  rows: BookingRow[];
  onView: (row: BookingRow) => void;
  onEdit?: (row: BookingRow) => void;
  onCancel?: (row: BookingRow) => void;
  onDelete?: (row: BookingRow) => void;
}

const THEME_COLOR = "#881f9b";

const statusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "success";
    case "pending":
      return "warning";
    case "cancelled":
      return "error";
    case "completed":
      return "info";
    default:
      return "default";
  }
};

const BookingListTable: React.FC<BookingListTableProps> = ({
  rows,
  onView,
  onEdit,
  onCancel,
  onDelete,
}) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: "1rem",
        boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}
    >
      <Table>
        {/* HEADER */}
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#f9f0fb",
            }}
          >
            {[
              "Booking ID",
              "User",
              "Property",
              "Check In",
              "Check Out",
              "Amount",
              "Booking Status",
              "Payment",
              "Created",
              "Actions",
            ].map((head) => (
              <TableCell
                key={head}
                sx={{
                  fontWeight: 700,
                  color: THEME_COLOR,
                  whiteSpace: "nowrap",
                }}
                align={head === "Actions" ? "center" : "left"}
              >
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* BODY */}
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={10} align="center">
                <Typography color="text.secondary" py={3}>
                  No bookings found
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow
                key={row.id}
                hover
                sx={{
                  "&:last-child td": { borderBottom: 0 },
                }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.userName}</TableCell>
                <TableCell>{row.propertyName}</TableCell>
                <TableCell>{row.checkIn}</TableCell>
                <TableCell>{row.checkOut}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>₹{row.amount}</TableCell>

                <TableCell>
                  <Chip
                    label={row.bookingStatus}
                    color={statusColor(row.bookingStatus)}
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  <Chip
                    label={row.paymentStatus}
                    color={statusColor(row.paymentStatus)}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>

                <TableCell>{row.createdAt}</TableCell>

                {/* ACTIONS */}
                <TableCell align="center">
                  <Box display="flex" justifyContent="center" gap={0.5}>
                    <Tooltip title="View">
                      <IconButton onClick={() => onView(row)}>
                        <Visibility fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    {onEdit && (
                      <Tooltip title="Edit">
                        <IconButton onClick={() => onEdit(row)}>
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}

                    {onCancel && (
                      <Tooltip title="Cancel">
                        <IconButton
                          color="error"
                          onClick={() => onCancel(row)}
                        >
                          <Cancel fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}

                    {onDelete && (
                      <Tooltip title="Delete">
                        <IconButton
                          sx={{ color: THEME_COLOR }}
                          onClick={() => onDelete(row)}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookingListTable;
