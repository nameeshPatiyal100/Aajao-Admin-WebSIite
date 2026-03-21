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
  Switch,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Pagination } from "../../../components";
import { PurpleThemeColor } from "../../../theme/themeColor";
import type { CouponListingProps, CouponRecord } from "./types";
import { TableLoader } from "../../../components/admin/common/TableLoader";

export default function CouponListing({
  ThemeColors,
  coupons,
  totalRecords,
  loading,
  handlePaginate,
  page,
  rowsPerPage,
  handleToggleActive,
  handleDeleteClick,
  handleEditClick,
}: CouponListingProps) {
  const [_localCoupons, setLocalCoupons] = useState(coupons);

  const headers = [
    "SR. NO.",
    "COUPON TITLE",
    "COUPON CODE",
    "DISCOUNT %",
    "STATUS",
    "ACTIONS",
  ];
  useEffect(() => {
    setLocalCoupons(coupons);
  }, [coupons]);

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
              {headers.map((header) => (
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
                <TableCell colSpan={6} align="center">
                  <TableLoader text="Fetching coupons..." />
                </TableCell>
              </TableRow>
            ) : coupons?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography
                    variant="body2"
                    sx={{ color: ThemeColors.text.secondary }}
                  >
                    No coupons found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              coupons.map((coupon: CouponRecord, index: number) => (
                <TableRow
                  key={coupon.coupon_id}
                  hover
                  sx={{
                    transition: "all 0.3s ease",
                    "&:hover": { backgroundColor: "#f5f3ff" },
                  }}
                >
                  <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>

                  <TableCell>{coupon.coupon_title}</TableCell>

                  <TableCell sx={{ fontWeight: 500 }}>
                    {coupon.coupon_code}
                  </TableCell>

                  <TableCell>{coupon.discount_percentage}%</TableCell>

                  <TableCell>
                    <Switch
                      size="small"
                      checked={coupon.is_active}
                      onChange={(e) => {
                        const newStatus = e.target.checked;

                        // ✅ Instant UI update
                        setLocalCoupons((prev) =>
                          prev.map((c) =>
                            c.coupon_id === coupon.coupon_id
                              ? { ...c, is_active: newStatus }
                              : c
                          )
                        );

                        // ✅ Call API
                        handleToggleActive(coupon.coupon_id, newStatus);
                      }}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: PurpleThemeColor,
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: PurpleThemeColor,
                          },
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <Tooltip title="Edit Coupon">
                      <IconButton
                        size="small"
                        onClick={() => handleEditClick(coupon.coupon_id)}
                        sx={{
                          color: ThemeColors.secondary,
                          mr: 1,
                          "&:hover": { transform: "scale(1.1)" },
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Coupon">
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteClick(coupon.coupon_id)}
                        sx={{
                          color: "error.main",
                          "&:hover": { transform: "scale(1.1)" },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {coupons?.length > 0 && (
        <Box display="flex" justifyContent="center" p={2}>
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
