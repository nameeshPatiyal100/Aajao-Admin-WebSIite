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
  Rating,
  Switch,
} from "@mui/material";

import { Edit as EditIcon } from "@mui/icons-material";
import { Pagination } from "../../../components";
import { TableLoader } from "../../../components/admin/common/TableLoader";

import type { ListingProps } from "./types";

const reviewStatusMap: Record<
  "0" | "1" | "2",
  { label: string; color: string; bg: string }
> = {
  "0": { label: "Pending", color: "#ed6c02", bg: "#fff3e0" },
  "1": { label: "Approved", color: "#2e7d32", bg: "#e8f5e9" },
  "2": { label: "Rejected", color: "#d32f2f", bg: "#fdecea" },
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
  handleToggleStatus, 
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
                "PROPERTY RATING",
                "STATUS",
                "TOGGLE",
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
                <TableCell colSpan={7} align="center">
                  <TableLoader text="Fetching reviews..." />
                </TableCell>
              </TableRow>
            ) : !reviewsListing || reviewsListing.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography
                    variant="body2"
                    sx={{ color: ThemeColors.text.secondary }}
                  >
                    No reviews found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              reviewsListing.map((review: any, index: number) => {
                const status = review.status as "0" | "1" | "2";

                return (
                  <TableRow
                    key={review.id}
                    hover
                    sx={{
                      transition: "all 0.3s ease",
                      "&:hover": { backgroundColor: "#f5f3ff" },
                    }}
                  >
                    {/* SR NO */}
                    <TableCell>
                      {(page - 1) * rowsPerPage + index + 1}
                    </TableCell>

                    {/* PROPERTY */}
                    <TableCell>{review.property}</TableCell>

                    {/* USER */}
                    <TableCell>{review.user_name}</TableCell>

                    {/* RATING */}
                    <TableCell>
                      <Rating
                        value={Number(review.rating)}
                        readOnly
                        size="small"
                      />
                    </TableCell>

                    {/* STATUS BADGE */}
                    <TableCell>
                      <Box
                        sx={{
                          display: "inline-block",
                          px: 1.2,
                          py: 0.4,
                          borderRadius: "12px",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: reviewStatusMap[status]?.color,
                          backgroundColor: reviewStatusMap[status]?.bg,
                          transition: "all 0.3s ease",
                        }}
                      >
                        {reviewStatusMap[status]?.label}
                      </Box>
                    </TableCell>

                    {/* 🔥 TOGGLE SWITCH */}
                    <TableCell>
                      <Switch
                        size="small"
                        checked={status === "1"} // Approved = ON
                        onChange={() =>
                          handleToggleStatus(Number(review.id))
                        }
                        sx={{
                          "& .MuiSwitch-switchBase": {
                            transitionDuration: "300ms",
                          },
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "#7b1fa2",
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                            {
                              backgroundColor: "#7b1fa2",
                            },
                          "& .MuiSwitch-thumb": {
                            transition: "all 0.3s ease",
                          },
                          "& .MuiSwitch-track": {
                            transition: "all 0.3s ease",
                          },
                        }}
                      />
                    </TableCell>

                    {/* ACTION */}
                    <TableCell>
                      <Tooltip title="Edit Review">
                        <IconButton
                          size="small"
                          sx={{
                            color: ThemeColors.secondary,
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
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {reviewsListing && reviewsListing.length > 0 && (
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