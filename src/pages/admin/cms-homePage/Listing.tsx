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
    Chip
  } from "@mui/material";
  import EditIcon from "@mui/icons-material/Edit";
  import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
  import type { PageRecord } from "./types";
  import { Pagination } from "../../../components";
  
  interface Props {
    ThemeColors: any;
    pageListing: PageRecord[];
    totalRecords: number;
    loading: boolean;
    page: number;
    rowsPerPage: number;
    handlePaginate: (_event: unknown, value: number) => void;
    handleEdit: (row: PageRecord) => void;
    handleEnter: (row: PageRecord) => void;
  }
  
  export default function PageListing({
    ThemeColors,
    pageListing,
    totalRecords,
    loading,
    page,
    rowsPerPage,
    handlePaginate,
    handleEdit,
    handleEnter,
  }: Props) {
    return (
      <Paper sx={{ mt: 3, borderRadius: 3, overflow: "hidden" }}>
        <Table>
          {/* ===== Table Header ===== */}
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#ffffff",
                borderBottom: "2px solid #f1f1f1",
              }}
            >
              {["S.No", "Title", "Slug", "Status", "Date", "Action"].map(
                (head) => (
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
                )
              )}
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
              pageListing.map((row, index) => (
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
  
                  <TableCell>{row.title}</TableCell>
  
                  <TableCell>{row.slug}</TableCell>
  
                  {/* Status with Chip */}
                  <TableCell>
                    <Chip
                      label={row.status}
                      size="small"
                      color={
                        row.status === "published" ? "success" : "default"
                      }
                    />
                  </TableCell>
  
                  {/* Date */}
                  <TableCell>
                    {new Date(row.created_at).toLocaleDateString()}
                  </TableCell>
  
                  {/* Action */}
                  <TableCell align="center">
                    <IconButton
                      onClick={() => handleEdit(row)}
                      sx={{
                        color: ThemeColors.primary,
                        "&:hover": { backgroundColor: "#f3e8ff" },
                      }}
                    >
                      <EditIcon />
                    </IconButton>
  
                    <IconButton
                      onClick={() => handleEnter(row)}
                      sx={{
                        color: ThemeColors.primary,
                        "&:hover": { backgroundColor: "#f3e8ff" },
                      }}
                    >
                      <KeyboardReturnIcon />
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