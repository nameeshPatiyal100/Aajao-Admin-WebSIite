import { Navigate, Outlet } from 'react-router-dom';
import useAuthentication from '../hooks/useAuthetication';
import { CircularProgress } from '@mui/material';

const GuestRoute = () => {
  const { isAuthenticated, isLoading,role } = useAuthentication();

  if (isLoading) {
    return <CircularProgress />;
  }

  // If logged in, redirect to appropriate dashboard
  if (isAuthenticated) {
    return role === "host" ? <Navigate to="/host/dashboard" />:<Navigate to="/user/dashboard" />; // or "/host/dashboard" if you detect role
  }

  return <Outlet />;
};

export default GuestRoute;
