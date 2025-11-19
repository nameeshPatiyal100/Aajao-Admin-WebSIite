import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import "./statusPage.css";
import "./statuspage.css"
import { Pagination, BackButton, EditStatusModal } from "../.././../components";
import {
  Table,
  TableBody,
  TableCell,
  // TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  Typography,
  Box,
  Menu,
  TextField,
  MenuItem,
  IconButton,
  Button,
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";


interface StatusItem {
  id: number;
  name: string;
  color: string;
  active: boolean;
}

const initialData: StatusItem[] = [
  { id: 1, name: "Published", color: "#22C55E", active: true },
  { id: 2, name: "Draft", color: "#FACC15", active: false },
  { id: 3, name: "Archived", color: "#EF4444", active: false },
  { id: 4, name: "Trashed", color: "#6366F1", active: false },
  { id: 5, name: "Hidden", color: "#10B981", active: false },
  { id: 6, name: "Scheduled", color: "#3B82F6", active: true },
];

const StatusPage: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<StatusItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  const handleToggle = (id: number) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, active: !item.active } : item
    );
    setData(updatedData);
  };

  const handleAddStatus = (newStatus: {
    name: string;
    color: string;
    type: string;
  }) => {
    const newItem = {
      id: data.length + 1,
      name: newStatus.name,
      color: newStatus.color,
      active: true,
    };
    setData((prev) => [...prev, newItem]);
  };
  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    row: StatusItem
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const handleSearchClick = () => {
    // Optional: Trigger additional logic here if needed
    setCurrentPage(1);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm)
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box className="status-page-container">
      {/* Top Control Bar */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        mb={2}
      >
        {/* Search Controls */}
        <Box display="flex" gap={1} alignItems="center">
          <TextField
            label="Search Status"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ minWidth: 200 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearchClick}
          >
            Search
          </Button>
        </Box>

        {/* Back Button */}

        <Box display="flex" justifyContent="space-between" alignItems="center">
          {/* Left side: Two action buttons including BackButton */}
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              onClick={() => setIsModalOpen(true)}
              sx={{
                backgroundColor: "#f9e9fe",
                color: "#6b21a8",
                textTransform: "none",
                borderRadius: "8px",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#f3d6fb",
                },
              }}
            >
              Add Status
            </Button>

            <BackButton />
          </Box>
        </Box>
      </Box>

      <Typography variant="h5" className="status-heading">
        Status Listing
      </Typography>

      <TableContainer component={Paper} className="status-table-container">
        <Table>
          <TableHead>
            <TableRow className="status-table-header">
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow key={row.id} className="status-table-row">
                <TableCell>
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <span
                      className="color-dot"
                      style={{ backgroundColor: row.color }}
                    />
                    <Typography variant="body2">{row.color}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={row.active}
                    onChange={() => handleToggle(row.id)}
                    color="success"
                  />
                  <Typography
                    component="span"
                    sx={{ ml: 1, color: row.active ? "#22C55E" : "#EF4444" }}
                  >
                    {row.active ? "Active" : "Inactive"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleMenuClick(e, row)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && selectedRow?.id === row.id}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(filteredData.length / itemsPerPage)}
        page={currentPage}
        onChange={(_, value) => setCurrentPage(value)}
      />
      <EditStatusModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddStatus}
      />
    </Box>
  );
};

export default StatusPage;
