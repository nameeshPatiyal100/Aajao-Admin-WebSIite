import AdminNavbar from "../adminnavbar/AdminNavbar";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../adminsidebar/AdminSidebar";
import "./adminLayout.css";
import { useSidebar } from "../../../context/AdminContext";
const AdminLayout = () => {
  const { isCollapsed } = useSidebar();
  
 

  return (
    <div className="adminLayoutSidebar">
      <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <AdminSidebar />
      </div>

      <div className="adminLayoutNavbar">
        <AdminNavbar />

        <div className="adminLayoutContent">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
