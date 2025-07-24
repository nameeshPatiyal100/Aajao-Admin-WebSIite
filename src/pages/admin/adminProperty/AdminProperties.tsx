import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Switch,
  Collapse,
  Paper,
  Fade,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { faker } from "@faker-js/faker";

import PropertyModal from "../../../components/admin/modals/properyModal/PropertyModal";
import { ConfirmDeleteModal, Pagination } from "../../../components";
import { FileX, Search } from "lucide-react";

interface Attendant {
  id: string;
  name: string;
  age: number;
  email: string;
  date: string;
  status: string;
  active: boolean;
}

const AdminProperties = () => {
  const [data, setData] = useState<Attendant[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState<Attendant | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const generateData = () => {
      const fakeData: Attendant[] = Array.from({ length: 50 }).map(() => ({
        id: faker.string.uuid(),
        name: `${faker.person.firstName()} ${faker.person.lastName()}`,
        age: faker.number.int({ min: 18, max: 65 }),
        email: faker.internet.email(),
        date: faker.date.past().toISOString(),
        status: faker.helpers.arrayElement(["Active", "Inactive", "Pending"]),
        active: faker.datatype.boolean(),
      }));
      setData(fakeData);
    };
    generateData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase().trim());
    setPage(0);
  };

  const handleView = (id: string) => {
    alert(`View user with ID: ${id}`);
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      setData((prev) => prev.filter((user) => user.id !== selectedUser.id));
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    }
  };

  const handleToggle = (id: string) => {
    const updatedData = data.map((user) =>
      user.id === id ? { ...user, active: !user.active } : user
    );
    setData(updatedData);
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return { backgroundColor: "#e6f7e6", color: "#2e7d32" };
      case "inactive":
        return { backgroundColor: "#ffebee", color: "#c62828" };
      case "pending":
        return { backgroundColor: "#fff8e1", color: "#ef6c00" };
      default:
        return { backgroundColor: "#f5f5f5", color: "#616161" };
    }
  };

  const filteredRows = data.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.status.toLowerCase().includes(searchTerm)
  );

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <>
      <Box sx={{ p: 1 }}>
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            flexWrap="wrap"
            gap={2}
            mb={3}
          >
            <Typography
              variant="h5"
              fontWeight={600}
              sx={{
                color: "#7F55B1",
                fontFamily: "Lato",
              }}
            >
              User Management
            </Typography>
            <Box display="flex" gap={1.5} flexWrap="wrap">
              <Button
                variant="contained"
                startIcon={<FilterListIcon />}
                sx={{
                  bgcolor: "#881f9b",
                  fontSize: "0.8rem",
                  fontFamily: "Lato",
                  fontWeight: 700,
                  textTransform: "capitalize",
                  "&:hover": {
                    bgcolor: "#7F55B1",
                  },
                }}
              >
                Filters
              </Button>
              <Button
                variant="contained"
                onClick={() => setIsModalOpen(true)}
                sx={{
                  bgcolor: "#881f9b",
                  fontSize: "0.8rem",
                  fontFamily: "Lato",
                  textTransform: "capitalize",
                  fontWeight: 600,
                  "&:hover": {
                    bgcolor: "#7F55B1",
                  },
                }}
              >
                Add
              </Button>
              <Button
                variant="contained"
                onClick={() => setShowSearch((prev) => !prev)}
                sx={{
                  bgcolor: "#881f9b",
                  fontSize: "0.8rem",
                  transition: "all 0.3s ease",
                  fontFamily: "Lato",
                  fontWeight: 600,

                  textTransform: "capitalize",
                  "&:hover": {
                    bgcolor: "#7F55B1",
                  },
                }}
                endIcon={
                  showSearch ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )
                }
              >
                Search
              </Button>
            </Box>
          </Box>

          <Fade in={showSearch} timeout={500}>
            <Box
              sx={{
                mb: 3,
                overflow: "hidden",
                transition: "all 0.3s ease",
              }}
            >
              <Collapse in={showSearch}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    p: 2,
                    transition: "all 0.3s ease",
                  }}
                >
                  <TextField
                    placeholder="Search users..."
                    size="small"
                    value={searchTerm}
                    onChange={handleSearch}
                    fullWidth
                    sx={{
                      maxWidth: 450,
                      fontFamily: "Lato",
                      backgroundColor: "#fff",
                      borderRadius: 1,
                      "& input::placeholder": {
                        fontFamily: "Lato",
                        textTransform: "capitalize", // Capitalize placeholder
                        color: "#9c27b0", // Optional: make placeholder also purplish
                      },
                      "& .MuiOutlinedInput-root": {
                        fontFamily: "Lato",
                        borderRadius: 1,
                        transition: "all 0.3s ease",
                        "& fieldset": {
                          borderColor: "#881f9b", // Default border color
                        },
                        "&:hover fieldset": {
                          borderColor: "#7F55B1", // Hover color
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#881f9b", // Focus color
                          boxShadow: "0 0 0 2px rgba(136, 31, 155, 0.2)",
                        },
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: "#881f9b" }} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#881f9b",
                      fontSize: "0.8rem",
                      fontFamily: "Lato",
                      fontWeight: 600,

                      textTransform: "capitalize",
                      px: 3,
                      "&:hover": {
                        bgcolor: "#7F55B1",
                      },
                    }}
                  >
                    Search
                  </Button>
                </Box>
              </Collapse>
            </Box>
          </Fade>
        </Box>

        <TableContainer
          component={Paper}
          elevation={1}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            mb: 3,
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ backgroundColor: "rgba(136, 31, 155, 0.05)" }}>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 700, fontFamily: "Lato" }}
                >
                  ID
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontFamily: "Lato" }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontFamily: "Lato" }}>
                  Email
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontFamily: "Lato" }}>
                  Date
                </TableCell>
                <TableCell sx={{ fontWeight: 700, fontFamily: "Lato" }}>
                  Status
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: 700, fontFamily: "Lato" }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => (
                <TableRow
                  hover
                  key={row.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(136, 31, 155, 0.04)",
                      font: "Lato",
                    },
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{ fontWeight: 600, fontFamily: "Lato" }}
                  >
                    #{row.id.slice(0, 4)}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontFamily: "Lato" }}>
                    {row.name}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500, fontFamily: "Lato" }}>
                    {row.email}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500, fontFamily: "Lato" }}>
                    {formatDate(row.date)}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500, fontFamily: "Lato" }}>
                    <Switch
                      checked={row.active}
                      onChange={() => handleToggle(row.id)}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#881f9b",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: "#881f9b",
                          },
                        "& .MuiSwitch-switchBase": {
                          color: "#9B7EBD",
                        },
                        "& .MuiSwitch-track": {
                          backgroundColor: "#9B7EBD",
                        },
                      }}
                    />
                    <Typography
                      component="span"
                      sx={{
                        ml: 1,
                        fontWeight: 600,

                        color: row.active ? "#881f9b" : "#9B7EBD",
                        fontFamily: "Lato",
                        fontSize: "0.8rem",
                      }}
                    >
                      {row.active ? "Active" : "Inactive"}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={() => handleView(row.id)}
                        sx={{
                          color: "#7F55B1",
                          "&:hover": {
                            backgroundColor: "rgba(127, 85, 177, 0.1)",
                          },
                        }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete User">
                      <IconButton
                        size="small"
                        onClick={() => {
                          setSelectedUser(row);
                          setIsDeleteModalOpen(true);
                        }}
                        sx={{
                          color: "#F44336",
                          "&:hover": {
                            backgroundColor: "rgba(244, 67, 54, 0.1)",
                          },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        py: 3,
                      }}
                    >
                      <FileX size={48} color="#9B7EBD" />
                      <Typography variant="body1" sx={{ mt: 2, color: "#666" }}>
                        No matching users found
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={2}
          sx={{
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "rgba(136, 31, 155, 0.2)",
              color: "#881f9b",
            },
            "& .MuiPaginationItem-root:hover": {
              backgroundColor: "rgba(136, 31, 155, 0.1)",
            },
          }}
        >
          <Pagination
            count={Math.ceil(filteredRows.length / rowsPerPage)}
            page={page + 1}
            onChange={(_, value) => setPage(value - 1)}
          />
        </Box>
      </Box>

      <ConfirmDeleteModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteUser}
        title="Delete User"
        description="Are you sure you want to permanently remove this user?"
      />

      <PropertyModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default AdminProperties;
