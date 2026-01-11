import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Avatar,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { MenuSquareIcon, ChevronDown } from "lucide-react";
import { useSidebar } from "../../../context/AdminContext";
import userImg from "../../../assets/user.jpg";

const AdminNavbar = () => {
  const { toggleSidebar } = useSidebar();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        zIndex: 1201, // above sidebar
      }}
    >
      <Toolbar
        sx={{
          minHeight: "4rem",
          px: { xs: 1.5, md: "2vw" },
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* LEFT SECTION */}
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton
            onClick={toggleSidebar}
            sx={{
              color: "#6b7280",
              borderRadius: "8px",
              "&:hover": {
                bgcolor: "#f3f4f6",
                color: "#4b5563",
              },
            }}
          >
            <MenuSquareIcon size={20} />
          </IconButton>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#111827",
              fontSize: { xs: "1rem", sm: "1.25rem" },
            }}
          >
            Dashboard
          </Typography>
        </Box>

        {/* RIGHT SECTION */}
        <Box display="flex" alignItems="center">
          <Box
            display="flex"
            alignItems="center"
            gap={1.5}
            sx={{
              bgcolor: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: "999px",
              px: 1.5,
              py: 0.5,
              transition: "0.2s",
              "&:hover": {
                bgcolor: "#f3f4f6",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              },
            }}
          >
            <Avatar
              src={userImg}
              sx={{ width: 40, height: 40 }}
              alt="User"
            />

            {/* USER INFO */}
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  color: "#111827",
                  lineHeight: 1.2,
                }}
              >
                Username
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  color: "#6b7280",
                  lineHeight: 1.2,
                }}
              >
                Admin
              </Typography>
            </Box>

            <Button
              onClick={handleMenuOpen}
              disableElevation
              sx={{
                minWidth: "auto",
                p: 0.5,
                color: "#6b7280",
                "&:hover": {
                  color: "#374151",
                  bgcolor: "transparent",
                },
              }}
            >
              <ChevronDown size={16} />
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  mt: 1,
                  borderRadius: "12px",
                  minWidth: 160,
                },
              }}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
              <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
