import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  // Pagination,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import type { PropertyRecord } from "./types";
import { Pagination } from "../../../components";

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
            <TableCell
              sx={{
                color: ThemeColors.primary,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              S.No
            </TableCell>

            <TableCell
              sx={{
                color: ThemeColors.primary,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Property Name
            </TableCell>

            <TableCell
              sx={{
                color: ThemeColors.primary,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Host Name
            </TableCell>

            <TableCell
              sx={{
                color: ThemeColors.primary,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Max Price
            </TableCell>

            <TableCell
              sx={{
                color: ThemeColors.primary,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Avg Price
            </TableCell>

            <TableCell
              align="center"
              sx={{
                color: ThemeColors.primary,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>

        {/* ===== Table Body ===== */}
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <Typography align="center">Loading...</Typography>
              </TableCell>
            </TableRow>
          ) : (
            propertyListing.map((row, index) => (
              <TableRow
                key={row.id}
                hover
                sx={{
                  "&:hover": {
                    backgroundColor: "#faf5ff", // very light purple hover
                  },
                }}
              >
                {/* Serial Number */}
                <TableCell>
                  {(page - 1) * rowsPerPage + index + 1}
                </TableCell>

                <TableCell>{row.property_name}</TableCell>
                <TableCell>{row.host_name}</TableCell>
                <TableCell>₹{row.max_price}</TableCell>
                <TableCell>₹{row.avg_bookings}</TableCell>

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
          // color="primary"
        />
      </Box>
    </Paper>
  );
}