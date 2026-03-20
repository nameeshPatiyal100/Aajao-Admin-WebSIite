import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import type { PropertyRecord } from "./types";
import { Pagination } from "../../../components";
import { TableLoader } from "../../../components/admin/common/TableLoader";

interface Props {
  ThemeColors: any;
  propertyListing: PropertyRecord[];
  totalRecords: number;
  loading: boolean;
  page: number;
  rowsPerPage: number;
  handlePaginate: (_event: unknown, value: number) => void;
  handleEdit: (row: PropertyRecord) => void;
}

export default function PropertyListing({
  ThemeColors,
  propertyListing,
  totalRecords,
  loading,
  page,
  rowsPerPage,
  handlePaginate,
  handleEdit,
}: Props) {
  return (
    <Paper
      sx={{
        mt: 3,
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Table>
        {/* ===== Table Header ===== */}
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#ffffff",
              borderBottom: "2px solid #f1f1f1",
            }}
          >
            {[
              "S.No",
              "Property Name",
              "Host Name",
              "Max Price",
              "Bookings",
              "Status",
              "Luxury",
              "Action",
            ].map((head) => (
              <TableCell
                key={head}
                align={head === "Action" ? "center" : "left"}
                sx={{
                  color: ThemeColors.primary,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* ===== Table Body ===== */}
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={8}>
                <TableLoader text="Loading properties..." />
              </TableCell>
            </TableRow>
          ) : propertyListing.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8}>
                <Typography align="center">
                  No Properties Found
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            propertyListing.map((row, index) => (
              <TableRow
                key={row.id}
                hover
                sx={{
                  "&:hover": {
                    backgroundColor: "#faf5ff",
                  },
                }}
              >
                {/* Serial Number */}
                <TableCell>
                  {(page - 1) * rowsPerPage + index + 1}
                </TableCell>

                {/* Property Name */}
                <TableCell>{row.property_name}</TableCell>

                {/* Host Name */}
                <TableCell>{row.host_name}</TableCell>

                {/* Price */}
                <TableCell sx={{ fontWeight: 600 }}>
                  ₹{row.max_price}
                </TableCell>

                {/* Bookings */}
                <TableCell>
                  <Chip
                    label={row.avg_bookings ?? 0}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      backgroundColor: "#ede7f6",
                      color: "#5e35b1",
                    }}
                  />
                </TableCell>

                {/* ✅ STATUS (FIXED) */}
                <TableCell>
                  <Chip
                    label={row.is_active ? "Active" : "Inactive"}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      color: "#fff",
                      backgroundColor: row.is_active
                        ? "#2e7d32"
                        : "#d32f2f",
                    }}
                  />
                </TableCell>

                {/* ✅ LUXURY (FIXED) */}
                <TableCell>
                  <Chip
                    label={row.is_luxury ? "Luxury" : "Standard"}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      color: "#fff",
                      backgroundColor: row.is_luxury
                        ? "#1976d2"
                        : "#9e9e9e",
                    }}
                  />
                </TableCell>

                {/* Action */}
                <TableCell align="center">
                  <IconButton
                    onClick={() => handleEdit(row)}
                    sx={{
                      color: ThemeColors.primary,
                      "&:hover": {
                        backgroundColor: "#f3e8ff",
                      },
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* ===== Pagination ===== */}
      <Box display="flex" justifyContent="center" p={3}>
        <Pagination
          count={Math.ceil(totalRecords / rowsPerPage)}
          page={page}
          onChange={handlePaginate}
        />
      </Box>
    </Paper>
  );
}