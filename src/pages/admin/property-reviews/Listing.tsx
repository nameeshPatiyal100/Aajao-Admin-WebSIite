import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Tooltip,
  IconButton,
  CircularProgress,
  Rating,
} from "@mui/material";

import { Edit as EditIcon } from "@mui/icons-material";
import { Pagination } from "../../../components";
import type { ListingProps } from "./types";

const reviewStatusMap = {
  0: { label: "Pending", color: "#ed6c02", bg: "#fff3e0" },
  1: { label: "Approved", color: "#2e7d32", bg: "#e8f5e9" },
  2: { label: "Rejected", color: "#d32f2f", bg: "#fdecea" },
};
export default function Listing({
  ThemeColors,
  reviewsListing,
  totalRecords,
  loading,
  handleFormShow,
  handlePaginate,
  page,
  rowsPerPage,
}: ListingProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#f9fafb" }}>
            <TableRow>
              {[
                "SR. NO.",
                "PROPERTY",
                "USER NAME",
                "RATING",
                "STATUS",
                "ACTIONS",
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    fontWeight: 600,
                    color: ThemeColors.text.secondary,
                    fontSize: "0.85rem",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <CircularProgress size={28} />
                </TableCell>
              </TableRow>
            ) : reviewsListing.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography
                    variant="body2"
                    sx={{ color: ThemeColors.text.secondary }}
                  >
                    No records found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              reviewsListing.map((review, index) => (
                <TableRow
                  key={review.id}
                  hover
                  sx={{
                    transition: "all 0.3s ease",
                    "&:hover": { backgroundColor: "#f5f3ff" },
                    fontSize: "0.8rem",
                  }}
                >
                  <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>

                  <TableCell sx={{ fontSize: "0.85rem" }}>
                    {review.property}
                  </TableCell>

                  <TableCell sx={{ fontSize: "0.85rem" }}>
                    {review.user_name}
                  </TableCell>

                  <TableCell sx={{ fontSize: "0.85rem" }}>
                    <Rating
                      value={Number(review.rating)}
                      readOnly
                      size="small"
                    />
                  </TableCell>

                  <TableCell sx={{ fontSize: "0.85rem" }}>
                    <Box
                      sx={{
                        display: "inline-block",
                        px: 1.2,
                        py: 0.4,
                        borderRadius: "12px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: reviewStatusMap[review.status]?.color,
                        backgroundColor: reviewStatusMap[review.status]?.bg,
                      }}
                    >
                      {reviewStatusMap[review.status]?.label}
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Tooltip title="Edit Review">
                      <IconButton
                        size="small"
                        sx={{
                          color: ThemeColors.secondary,
                          mr: 1,
                          transition: "all 0.3s ease",
                          "&:hover": { transform: "scale(1.1)" },
                        }}
                        onClick={() => handleFormShow(review.id)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {reviewsListing.length > 0 && (
        <Box display="flex" justifyContent="center" alignItems="center" p={2}>
          <Pagination
            count={Math.ceil(totalRecords / rowsPerPage)}
            page={page}
            onChange={handlePaginate}
          />
        </Box>
      )}
    </Paper>
  );
}
