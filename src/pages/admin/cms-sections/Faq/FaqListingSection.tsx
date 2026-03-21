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

export interface FaqRecord {
  id: number;
  title: string;
  status: 0 | 1; // 0 = Draft, 1 = Published
  created_at: string;
}

interface FaqListingProps {
  faqs: FaqRecord[];
  totalRecords: number;
  loading: boolean;
  page: number;
  rowsPerPage: number;
  handlePaginate: (_: any, value: number) => void;
  handleEditClick: (id: number) => void;
  handleDeleteConfirm: (id: number) => void;
}

/* ================= Component ================= */

export default function FaqListing({
  faqs,
  totalRecords,
  loading,
  page,
  rowsPerPage,
  handlePaginate,
  handleEditClick,
  handleDeleteConfirm,
}: FaqListingProps) {
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
                    <TableLoader text="Fetching FAQs..." />
                  </TableCell>
                </TableRow>
              ) : faqs?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body2">No FAQs found.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                faqs.map((faq: FaqRecord, index: number) => (
                  <TableRow
                    key={faq.id}
                    hover
                    sx={{
                      "&:hover": { backgroundColor: "#f5f3ff" },
                    }}
                  >
                    <TableCell>
                      {(page - 1) * rowsPerPage + index + 1}
                    </TableCell>

                    <TableCell>{faq.title}</TableCell>

                    <TableCell>
                      <Chip
                        label={faq.status === 1 ? "Published" : "Draft"}
                        size="small"
                        sx={{
                          backgroundColor:
                            faq.status === 1 ? "#1bb315" : "#e81c1c",
                          color: faq.status === 1 ? "#fff" : "#fff",
                          fontWeight: 500,
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      {new Date(faq.created_at).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      <Tooltip title="Edit FAQ">
                        <IconButton
                          size="small"
                          onClick={() => handleEditClick(faq.id)}
                          sx={{
                            color: PurpleThemeColor,
                            mr: 1,
                            "&:hover": { transform: "scale(1.1)" },
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete FAQ">
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteClick(faq.id)}
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

        {faqs?.length > 0 && (
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
        <DialogTitle>Delete FAQ</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this FAQ?
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
