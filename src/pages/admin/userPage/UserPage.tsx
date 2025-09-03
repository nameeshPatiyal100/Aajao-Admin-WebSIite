import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  Chip,
  // Menu,
  // MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  // InputAdornment,
  IconButton,
  Tooltip,
  // useTheme,
  // useMediaQuery,
} from "@mui/material";
import {
  FilterList as FilterListIcon,
  // MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  // Search as SearchIcon,
  // Padding,
} from "@mui/icons-material";
import { faker } from "@faker-js/faker";
import {
  Pagination,
  // BackButton,
  AddUserModal,
  ConfirmDeleteModal,
} from "../../../components";

const COLORS = {
  primary: "#881f9b",
  secondary: "#10b981", // Emerald green
  background: "#f4f5f7", // Soft gray
  text: {
    primary: "#111827",
    secondary: "#6b7280",
  },
};

interface Attendant {
  id: string;
  name: string;
  age: number;
  email: string;
  date: string;
  status: "Active" | "Inactive";
}

export default function UserManagementPage() {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // State Management
  const [data, setData] = useState<Attendant[]>([]);
  const [filteredData, setFilteredData] = useState<Attendant[]>([]);
  const [page, setPage] = useState(0);
  // const [filterOpen, setFilterOpen] = useState<boolean>(true);
  // const [activeStatus, setActiveStatus] = useState<"Active" | "Inactive">("Active");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isInactive, setIsInactive] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"Active" | "Inactive" | "">(
    ""
  );

  // Modal and Menu States
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Attendant | null>(null);
  // const [menuRowIndex, setMenuRowIndex] = useState<number | null>(null);
  // const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
  //   null
  // );
  
  console.log(setStatusFilter)
  console.log(anchorEl)
  const rowsPerPage = 10;

  useEffect(() => {
    const generateData = () => {
      const fakeData: Attendant[] = Array.from({ length: 50 }).map(() => ({
        id: faker.string.uuid(),
        name: `${faker.person.firstName()} ${faker.person.lastName()}`,
        age: faker.number.int({ min: 18, max: 65 }),
        email: faker.internet.email(),
        date: faker.date.past().toLocaleDateString(),
        status: faker.helpers.arrayElement(["Active", "Inactive"]),
      }));
      setData(fakeData);
      setFilteredData(fakeData);
    };

    generateData();
  }, []);

  useEffect(() => {
    let result = data;

    if (searchTerm) {
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter) {
      result = result.filter((user) => user.status === statusFilter);
    }

    setFilteredData(result);
    setPage(0); // Reset to first page after filtering
  }, [searchTerm, statusFilter, data]);

  // Handlers
  const handleAddUser = (
    newUser: Omit<Attendant, "id" | "date" | "status">
  ) => {
    const userToAdd: Attendant = {
      ...newUser,
      id: faker.string.uuid(),
      date: new Date().toLocaleDateString(),
      status: "Active",
    };
    setData((prev) => [userToAdd, ...prev]);
    setIsAddModalOpen(false);
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      setData((prev) => prev.filter((user) => user.id !== selectedUser.id));
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    }
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    user: Attendant
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };
  console.log(handleMenuOpen)

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };
  console.log(handleMenuClose)

  const renderUserActions = (user: Attendant) => (
    <>
      <Tooltip title="View Details">
        <IconButton size="small" sx={{ color: COLORS.primary, mr: 1 }}>
          <VisibilityIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit User">
        <IconButton size="small" sx={{ color: COLORS.secondary, mr: 1 }}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete User">
        <IconButton
          size="small"
          sx={{ color: "error.main" }}
          onClick={() => {
            setSelectedUser(user);
            setIsDeleteModalOpen(true);
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </>
  );

  // const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   const newState = !filterOpen;
  //   setFilterOpen(newState);
  //   console.log("Filter active:", newState);

  //   // You can do something like:
  //   // setFilterAnchorEl(newState ? e.currentTarget : null);
  // };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: COLORS.background,
        minHeight: "100vh",
        fontFamily: "Inter', sans-serif",
      }}
    >
      {/* Header Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        flexWrap="wrap"
        gap={2}
      >
        <Typography
          variant="h4"
          sx={{
            color: COLORS.primary,
            fontWeight: 700,
          }}
        >
          User Management
        </Typography>

        <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
          <Box display="flex" gap={1} alignItems="center">
            <TextField
              label="Search name or E-mail"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                minWidth: 200,
                "& .MuiOutlinedInput-root": {
                  color: COLORS.primary,
                  "& fieldset": {
                    borderColor: COLORS.primary,
                  },
                  "&:hover fieldset": {
                    borderColor: COLORS.primary,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: COLORS.primary,
                  },
                },
                "& .MuiInputLabel-root": {
                  color: COLORS.primary,
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: COLORS.primary,
                },
              }}
            />

            <Button
              variant="contained"
              // onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                background: COLORS.primary,
              }}
            >
              Search
            </Button>
          </Box>
          <Stack direction="row" spacing={2}>
            {/* Active Toggle (Green) */}
            <Button
              variant="outlined"
              onClick={() => setIsActive((prev) => !prev)}
              startIcon={<FilterListIcon />}
              sx={{
                borderRadius: 2,
                borderColor: "#2e7d32",
                color: isActive ? "#fff" : "#2e7d32",
                backgroundColor: isActive ? "#2e7d32" : "transparent",
                "&:hover": {
                  backgroundColor: "#e0f2f1",
                  borderColor: "#2e7d32",
                  color: "#2e7d32",
                },
              }}
            >
              {isActive ? "Active (ON)" : "Active (OFF)"}
            </Button>

            {/* Inactive Toggle (Red) */}
            <Button
              variant="outlined"
              onClick={() => setIsInactive((prev) => !prev)}
              startIcon={<FilterListIcon />}
              sx={{
                borderRadius: 2,
                borderColor: "#d32f2f",
                color: isInactive ? "#fff" : "#d32f2f",
                backgroundColor: isInactive ? "#d32f2f" : "transparent",
                "&:hover": {
                  backgroundColor: "#fdecea",
                  borderColor: "#d32f2f",
                  color: "#d32f2f",
                },
              }}
            >
              {isInactive ? "Inactive (ON)" : "Inactive (OFF)"}
            </Button>
          </Stack>

          {/* Add User Button */}
          <Button
            variant="contained"
            onClick={() => setIsAddModalOpen(true)}
            sx={{
              backgroundColor: COLORS.primary,
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#3730a3",
              },
            }}
          >
            Add User
          </Button>
        </Box>
      </Box>

      {/* User Table */}
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
                {[
                  "ID",
                  "NAME",
                  "AGE",
                  "EMAIL",
                  "CREATED",
                  "STATUS",
                  "ACTIONS",
                ].map((header) => (
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
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => (
                  <TableRow
                    key={user.id}
                    hover
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      transition: "background-color 0.2s",
                      fontSize: "0.7rem",
                    }}
                  >
                    <TableCell sx={{ fontSize: "0.8rem" }}>
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.8rem" }}>
                      {user.name}
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.8rem" }}>
                      {user.age}
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.8rem" }}>
                      {user.email}
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.8rem" }}>
                      {user.date}
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.8rem" }}>
                      <Chip
                        label={user.status}
                        size="small"
                        sx={{
                          backgroundColor:
                            user.status === "Active" ? "#D1FAE5" : "#FEE2E2",
                          color:
                            user.status === "Active" ? "#065F46" : "#DC2626",
                          borderRadius: "0.3rem",
                          px: 2,
                          py: 1,
                          fontSize: "0.7rem",
                        }}
                      />
                    </TableCell>
                    <TableCell>{renderUserActions(user)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box display="flex" justifyContent="center" alignItems="center" p={2}>
          <Typography
            variant="body2"
            sx={{
              color: COLORS.primary,
            }}
          ></Typography>
          <Pagination
            count={Math.ceil(filteredData.length / rowsPerPage)}
            page={page + 1}
            onChange={(_, value) => setPage(value - 1)}
          />
        </Box>
      </Paper>

      {/* Modals */}
      <ConfirmDeleteModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteUser}
        title="Delete User"
        description="Are you sure you want to permanently remove this user?"
      />

      <AddUserModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddUser={handleAddUser}
      />
    </Box>
  );
}
