import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  // Outlet,
} from "react-router-dom";
import "./App.css";
import notFound from "./assets/UI/404.jpg";
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
  AboutUs,
  ContactUs,
  PropertyDetail,
  NotFound,
  FAQ,
  DashboardLayout,
  PropertyListing,
  FinalBookingPage,
  BookingConfirmed,
  CancelBookResult,
  UserCheckoutPage,
  StateRegulation,
  HelpCenter,
  TermsAndConditions,
  WhyHostsListWithAajoo,
  PrivacyPolicyPage,
} from "./pages";

// NEED TO SET ORDER
// import { UserDashboard } from "./pages/user/dashboard";
// import { HostDashboard } from "./pages/host/dashboard";
import CommonLayout from "./components/layout/CommonLayout";
import { Home } from "./pages";
import GuestRoute from "./components/authGaurd";
import { LoginForm } from "./auth/Forms/LoginForm";
import UserSignup from "./auth/UserSignup";
import SignupOtpVerification from "./auth/SignupOtpVerification";
import { ForgotPassword } from "./auth/ForgotPassword";
import { VerifyOtp } from "./auth/VerifyOtp";
import { ResetPassword } from "./auth/ResetPassword";
// import ProtectedRoute from "./components/protectedRoute";

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<CommonLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="property/detail/:id" element={<PropertyDetail />} />
          <Route path="property/list" element={<PropertyListing />} />
          <Route path="faqs" element={<FAQ />} />
          <Route path="/user-dashboard" element={<DashboardLayout />} />
          <Route
            path="/property-booking/final"
            element={<FinalBookingPage />}
          />
          <Route path="/booking/confirmation" element={<BookingConfirmed />} />
          <Route
            path="/booking/cancel-result/:bookingId"
            element={<CancelBookResult />}
          />
          <Route path="/user/checkout/:id" element={<UserCheckoutPage />} />
          <Route path="/state-regulation" element={<StateRegulation />} />
          {/* <Route path="/state-regulation" element={<StateRegulation />} /> */}
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/terms-condition" element={<TermsAndConditions />} />
          <Route
            path="/Why-Hosts-List-With-Aajoo"
            element={<WhyHostsListWithAajoo />}
          />
          <Route path="/Privacy-Policy" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<NotFound image={notFound} />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/auth" element={<GuestRoute />}>
          <Route element={<CommonLayout />}>
            <Route path="login" element={<LoginForm />} />
            <Route path="forget" element={<ForgotPassword />} />
            <Route path="signup" element={<UserSignup />} />
            <Route path="verifyOtp" element={<VerifyOtp />} />
            <Route
              path="signup-verication"
              element={<SignupOtpVerification />}
            />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>
        </Route>

        {/* <Route path="/host/*" element={<ProtectedRoute />}>
          <Route path="dashboard" element={<HostDashboard />} />

        </Route> */}

        {/* <Route path="/user/*" element={<ProtectedRoute />}>
          <Route path="dashboard" element={<UserDashboard />} />
        </Route> */}

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
          <Route path="tags" element={<AdminPropertyTags />} />
          <Route path="categories" element={<AdminCategory />} />
          <Route path="ammenities" element={<AdminAmmenities />} />
          <Route
            path="property-verification"
            element={<AdminPropertyVerification />}
          />
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
