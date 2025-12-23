import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../adminnavbar/AdminNavbar";
import AdminSidebar from "../adminsidebar/AdminSidebar";
import { useSidebar } from "../../../context/AdminContext";

const SIDEBAR_WIDTH = 240;   // 15rem
const SIDEBAR_COLLAPSED = 64; // 4rem

const AdminLayout = () => {
  const { isCollapsed } = useSidebar();

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        bgcolor: "#fff",
      }}
    >
      {/* SIDEBAR */}
      <Box
        sx={{
          width: isCollapsed ? SIDEBAR_COLLAPSED : SIDEBAR_WIDTH,
          transition: "width 0.3s ease",
          flexShrink: 0,
          borderRight: "1px solid #ccc",
          height: "100vh",
          overflow: "hidden",
          bgcolor: "#fff",
        }}
      >
        <AdminSidebar />
      </Box>

      {/* RIGHT SIDE (NAVBAR + CONTENT) */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          bgcolor: "#f8f9fa",
        }}
      >
        {/* NAVBAR */}
        <Box
          sx={{
            height: "4.5rem",
            bgcolor: "#fff",
            boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
            zIndex: 10,
            flexShrink: 0,
          }}
        >
          <AdminNavbar />
        </Box>

        {/* PAGE CONTENT */}
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            overflowY: "auto",
            overflowX: "hidden",
            bgcolor: "#f1f3f6",
            fontSize: "1rem",
            lineHeight: 1.6,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
