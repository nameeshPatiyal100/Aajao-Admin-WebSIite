import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import logo from "../../assets/UI/logo.svg";
import { Link, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { label: "Find Your Stay", to: "/" },
    { label: "Homes", to: "/property/list" },
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Help Center", to: "/" },
    { label: "FAQ", to: "/faqs" },
    { label: "Privacy Policy", to: "/Privacy-Policy" },
    { label: "Terms & Condition", to: "/terms-condition" },
    { label: "Why Host List With Aajoo", to: "/Why-Hosts-List-With-Aajoo" },
    { label: "State Regulation", to: "/state-regulation" },
    { label: "Become A Host", to: "/auth/signup" },
    { label: "Help Center", to: "/help-center" },
    // { label: "T&C", to: "/terms-condition" },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={2}
        sx={{ bgcolor: "#FFFFFF", color: "#6B240C" }}
      >
        <Toolbar>
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <img src={logo} alt="Logo" style={{ height: 40, marginRight: 8 }} />
            aajoo
          </Link>

          <Box flexGrow={1} />

          {/* Desktop Right Section */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                onClick={() => navigate("/auth/signup")}
                variant="contained"
                sx={{
                  textTransform: "none",
                  bgcolor: "#c14365",
                  color: "#fff",
                  "&:hover": {
                    bgcolor: "#ab3864",
                  },
                }}
              >
                Register
              </Button>

              <Button
                onClick={() => navigate("/auth/login")}
                variant="outlined"
                sx={{
                  textTransform: "none",
                  color: "#c14365",
                  borderColor: "#c14365",
                  "&:hover": {
                    bgcolor: "#fce4ec",
                    borderColor: "#c14365",
                  },
                }}
              >
                Login
              </Button>

              <IconButton onClick={() => navigate("/user-dashboard")}>
                <PersonIcon sx={{ color: "#c14365" }} />
              </IconButton>

              <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon sx={{ color: "#c14365" }} />
              </IconButton>
            </Box>
          )}

          {/* Mobile View Menu Button */}
          {isMobile && (
            <IconButton edge="end" onClick={toggleDrawer(true)}>
              <MenuIcon sx={{ color: "#6B240C" }} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer (Now Opens from LEFT SIDE) */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            p: 2,
            bgcolor: "#fff",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            // justifyContent: "space-between",
          }}
        >
          {/* Header inside sidebar */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#c14365",
                fontWeight: 600,
              }}
            >
              Menu
            </Typography>

            {/* Close Icon */}
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon sx={{ color: "#c14365" }} />
            </IconButton>
          </Box>

          {/* Menu Items */}
          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.to}
                component={Link}
                to={item.to}
                onClick={toggleDrawer(false)}
                sx={{
                  "&:hover": {
                    bgcolor: "#fce4ec",
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  sx={{
                    color: "#c14365",
                    fontWeight: 500,
                  }}
                />
              </ListItem>
            ))}
          </List>

          {/* Auth Buttons inside drawer */}
          <Box sx={{ mt: 2 }}>
            <Button
              fullWidth
              onClick={() => {
                navigate("/auth/login");
                setDrawerOpen(false);
              }}
              variant="outlined"
              sx={{
                color: "#c14365",
                borderColor: "#c14365",
                textTransform: "none",
                mb: 1.5,
                "&:hover": { bgcolor: "#fce4ec" },
              }}
            >
              Login
            </Button>

            <Button
              fullWidth
              onClick={() => {
                navigate("/auth/signup");
                setDrawerOpen(false);
              }}
              variant="contained"
              sx={{
                textTransform: "none",
                bgcolor: "#c14365",
                color: "#fff",
                "&:hover": {
                  bgcolor: "#ab3864",
                },
              }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
