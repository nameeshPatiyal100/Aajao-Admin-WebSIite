import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

import { SidebarProvider } from "./context/AdminContext";
import {
  UserPage,
  StatusPage,
  AdminLogin,
  Dashboard,
  AdminProperties,
  Transactions,
} from "./pages";
// import { AdminLayout } from "./components/admin";
// import { UserPage, StatusPage, AdminLogin, Dashboard, AdminProperties } from "./pages";
import { AdminLayout } from "./components";
import AdminBooking from "./pages/admin/adminBooking/AdminBooking";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <SidebarProvider>
                <AdminLayout />
              </SidebarProvider>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<UserPage />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="properties" element={<AdminProperties />} />
            <Route path="bookings" element={<AdminBooking />} />
            {/* <Route path="users" element={<h1>Users</h1>} /> */}
            <Route path="settings" element={<h1>Settings</h1>} />
            <Route path="status" element={<StatusPage />} />
            <Route path="*" element={<Navigate to="/admin/dashboard" />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
