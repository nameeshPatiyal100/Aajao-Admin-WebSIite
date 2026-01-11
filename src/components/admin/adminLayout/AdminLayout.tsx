import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../adminnavbar/AdminNavbar";
import AdminSidebar from "../adminsidebar/AdminSidebar";
import { useSidebar } from "../../../context/AdminContext";

const SIDEBAR_WIDTH = 240;
const SIDEBAR_COLLAPSED = 64;

const AdminLayout = () => {
  const { isCollapsed } = useSidebar();

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden", // ✅ NO horizontal scroll
        bgcolor: "#fff",
      }}
    >
      {/* SIDEBAR */}
      <Box
        sx={{
          width: isCollapsed ? SIDEBAR_COLLAPSED : SIDEBAR_WIDTH,
          transition: "width 0.3s ease",
          flexShrink: 0,
          height: "100vh",
          borderRight: "1px solid #e5e7eb",
          bgcolor: "#fff",
        }}
      >
        <AdminSidebar />
      </Box>

      {/* MAIN CONTENT */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: "#f8f9fa",
          transition: "all 0.3s ease",
          width: `calc(100% - ${isCollapsed ? SIDEBAR_COLLAPSED : SIDEBAR_WIDTH}px)`, // ✅ shrink instead of shift
        }}
      >
        {/* NAVBAR */}
        <Box
          sx={{
            height: "4.5rem",
            bgcolor: "#fff",
            boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
            flexShrink: 0,
            zIndex: 10,
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
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
