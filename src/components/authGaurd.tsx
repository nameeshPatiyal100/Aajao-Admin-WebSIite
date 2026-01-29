import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      setIsAuth(false);
      return;
    }

    // OPTIONAL BUT STRONGLY RECOMMENDED
    // Verify token with backend
    const verifyToken = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/verify-token`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Unauthorized");

        setIsAuth(true);
      } catch (error) {
        localStorage.removeItem("adminToken");
        setIsAuth(false);
      }
    };

    verifyToken();
  }, []);

  // Loader while verifying
  if (isAuth === null) return null;

  return isAuth ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoute;
