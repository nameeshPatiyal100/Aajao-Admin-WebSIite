import { useState } from "react";
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
  IconButton,
  Tooltip,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

import { Pagination } from "../../../../components";
import { TableLoader } from "../../../../components/admin/common/TableLoader";
import { PurpleThemeColor } from "../../../../theme/themeColor";

/* ================= Types ================= */

export interface TCRecord {
  id: number;
  title: string;
  status: 0 | 1;
  created_at: string;
}

interface TCListingProps {
  terms: TCRecord[];
  totalRecords: number;
  loading: boolean;
  page: number;
  rowsPerPage: number;
  handlePaginate: (_: any, value: number) => void;
  handleEditClick: (id: number) => void;
  handleDeleteConfirm: (id: number) => void;
}

/* ================= Component ================= */

export default function TCListing({
  terms,
  totalRecords,
  loading,
  page,
  rowsPerPage,
  handlePaginate,
  handleEditClick,
  handleDeleteConfirm,
}: TCListingProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const headers = ["SR. NO.", "TITLE", "STATUS", "DATE", "ACTIONS"];

  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    if (selectedId !== null) {
      handleDeleteConfirm(selectedId);
    }
    setOpenDialog(false);
    setSelectedId(null);
  };

  return (
    <>
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
                  <TableCell colSpan={5} align="center">
                    <TableLoader text="Fetching Terms & Conditions..." />
                  </TableCell>
                </TableRow>
              ) : terms?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body2">
                      No Terms & Conditions found.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                terms.map((tc: TCRecord, index: number) => (
                  <TableRow
                    key={tc.id}
                    hover
                    sx={{
                      "&:hover": { backgroundColor: "#f5f3ff" },
                    }}
                  >
                    <TableCell>
                      {(page - 1) * rowsPerPage + index + 1}
                    </TableCell>

                    <TableCell>{tc.title}</TableCell>

                    <TableCell>
                      <Chip
                        label={tc.status === 1 ? "Active" : "Inactive"}
                        size="small"
                        sx={{
                          backgroundColor:
                            tc.status === 1
                              ? PurpleThemeColor
                              : "#e0e0e0",
                          color: tc.status === 1 ? "#fff" : "#555",
                          fontWeight: 500,
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      {new Date(tc.created_at).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      <Tooltip title="Edit Terms">
                        <IconButton
                          size="small"
                          onClick={() => handleEditClick(tc.id)}
                          sx={{
                            color: PurpleThemeColor,
                            mr: 1,
                            "&:hover": { transform: "scale(1.1)" },
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete Terms">
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteClick(tc.id)}
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

        {terms?.length > 0 && (
          <Box display="flex" justifyContent="center" p={2}>
            <Pagination
              count={Math.ceil(totalRecords / rowsPerPage)}
              page={page}
              onChange={handlePaginate}
            />
          </Box>
        )}
      </Paper>

      {/* ================= Delete Dialog ================= */}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Delete Terms & Conditions</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this Terms & Conditions record?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{
              color: PurpleThemeColor,
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={confirmDelete}
            sx={{
              backgroundColor: PurpleThemeColor,
              color: "#fff",
              "&:hover": {
                backgroundColor: PurpleThemeColor,
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}