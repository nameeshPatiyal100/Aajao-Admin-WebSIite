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
  CircularProgress,
} from "@mui/material";

import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Pagination } from "../../../components";

interface ListingProps {
  COLORS: { text: { secondary: string }; secondary: string };
  categoryListing: { id: string; name: string; status: string }[];
  totalRecords: number;
  loading: boolean;
  handleFormShow: (id: string) => void;
  handlePaginate: (event: React.ChangeEvent<unknown>, page: number) => void;
  page: number;
  rowsPerPage: number;
  handleToggleActive: (id: string) => void;
  handleDeleteClick: (id: string) => void;
}

export default function Listing(props: ListingProps) {
  const {
    COLORS,
    categoryListing,
    totalRecords,
    loading,
    handleFormShow,
    handlePaginate,
    page,
    rowsPerPage,
    handleToggleActive,
    handleDeleteClick,
  } = props;

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#f9fafb" }}>
            <TableRow>
              {["SR. NO.", "NAME", "STATUS", "ACTIONS"].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    fontWeight: 600,
                    color: COLORS.text.secondary,
                    fontSize: "0.8rem",
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
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : categoryListing.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography
                    variant="body2"
                    sx={{ color: COLORS.text.secondary }}
                  >
                    No records found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              categoryListing.map((user, index) => (
                <TableRow
                  key={user.id}
                  hover
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    transition: "background-color 0.2s",
                    fontSize: "0.7rem",
                  }}
                >
                  <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>

                  <TableCell sx={{ fontSize: "0.8rem" }}>{user.name}</TableCell>

                  <TableCell sx={{ fontSize: "0.8rem" }}>
                    <Switch
                      size="small"
                      checked={user.status === "1"}
                      onChange={() => handleToggleActive(user.id)}
                    />
                  </TableCell>

                  <TableCell>
                    <Tooltip title="Edit Category">
                      <IconButton
                        size="small"
                        sx={{ color: COLORS.secondary, mr: 1 }}
                        onClick={() => handleFormShow(user.id)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Category">
                      <IconButton
                        size="small"
                        sx={{ color: "error.main" }}
                        onClick={() => handleDeleteClick(user.id)}
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

      {/* Pagination */}
      {categoryListing.length > 0 && (
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
