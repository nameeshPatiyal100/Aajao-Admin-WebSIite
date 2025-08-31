import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AdminLayout } from "./components";

import { SidebarProvider } from "./context/AdminContext";

import AdminBooking from "./pages/admin/adminBooking/AdminBooking";
import { Toaster } from "react-hot-toast";
import {
  AdminAmmenities,
  AdminCategory,
  AdminLogin,
  AdminProperties,
  AdminPropertyTags,
  AdminPropertyVerification,
  Dashboard,
  StatusPage,
  Transactions,
  UserPage,
} from "./pages";
import { UserDashboard } from "./pages/user/dashboard";
import { HostDashboard } from "./pages/host/dashboard";
import CommonLayout from "./components/layout/CommonLayout";
import Home from "./pages/home";
import GuestRoute from "./components/authGaurd";
import { LoginForm } from "./auth/Forms/LoginForm";
import { ForgotPassword } from "./auth/ForgotPassword";
import { VerifyOtp } from "./auth/VerifyOtp";
import { ResetPassword } from "./auth/ResetPassword";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<CommonLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/auth" element={<GuestRoute />}>
          <Route path="login" element={<LoginForm />} />
          <Route path="forget" element={<ForgotPassword />} />
          <Route path="verifyOtp" element={<VerifyOtp />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        <Route path="/host/*" element={<ProtectedRoute />}>
          <Route path="dashboard" element={<HostDashboard />} />
          {/* other host routes */}
        </Route>

        <Route path="/user/*" element={<ProtectedRoute />}>
          <Route path="dashboard" element={<UserDashboard />} />
        </Route>

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
          <Route path="properties" element={<AdminProperties />}/>
          <Route path="tags" element={<AdminPropertyTags />} />
          <Route path="categories" element={<AdminCategory />} />
          <Route path="ammenities" element={<AdminAmmenities/>} />
          <Route path="property-verification" element={<AdminPropertyVerification/>} />
          <Route path="bookings" element={<AdminBooking />} />
          <Route path="status" element={<StatusPage />} />
          <Route path="settings" element={<h1>Settings</h1>} />
          <Route path="*" element={<Navigate to="/admin/dashboard" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
