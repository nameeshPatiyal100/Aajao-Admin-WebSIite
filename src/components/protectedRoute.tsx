
// import { Navigate, Outlet } from "react-router-dom";
// import Box from '@mui/material/Box';
// import { HostSidebar } from "./layout/HostSidebar";
// import { HostHeader } from "./layout/HostHeader";
// import useAuthentication from "../hooks/useAuthetication";
// import { UserSidebar } from "./layout/UserSidebar";
// import { UserHeader } from "./layout/UserHeader";

const ProtectedRoute = () => {
  // const { isAuthenticated, isLoading, role } = useAuthentication();
    // console.log(isAuthenticated,isLoading,role,":auth");
  // if (isLoading) {
  //   return <div><h1>Loading...</h1></div>;
  // }

  // if (!isAuthenticated) {
  //   return <Navigate to="/auth/login" />;
  // }


  // const roleMap = {
  //   user:data.user.user_isUser || data.user.cred_user_isHost,
  //   host: data.user.user_isHost || data.user.cred_user_isUser,
  //   admin: data.user.cred_user_email === "admin@mail.com",
  // };

  // if (role === 'host') {
  //   return (
  //     <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
  //       {/* Sidebar */}
  //       <HostSidebar />

  //       {/* Main Content Area */}
  //       <Box sx={{ flexGrow: 1 }}>
  //         {/* Header */}
  //         <HostHeader />

  //         {/* Page Content */}
  //         <Box component="main" sx={{ p: 3 }}>
  //           <Outlet />
  //         </Box>
  //       </Box>
  //     </Box>
  //   );
  // }

  // if (role === 'renter') {
  //   return (
  //     <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
  //       <UserSidebar />

  //       <Box sx={{ flexGrow: 1 }}>
  //         <UserHeader />

  //         <Box component="main" sx={{ p: 3 }}>
  //           <Outlet />
  //         </Box>
  //       </Box>
  //     </Box>
  //   );
  // }

  // Fallback (optional)
  // return <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;

