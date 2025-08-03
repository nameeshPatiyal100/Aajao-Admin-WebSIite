import { useState } from "react";
import { FaBars, FaUser, FaHome, FaPlusSquare, FaListUl, FaFileInvoice, FaMoneyCheckAlt, FaShieldAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const closeMenu = () => setShowMenu(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Persistent Header */}
      <div className="bg-rose-400 p-6 pb-8 rounded-b-3xl relative flex items-center justify-between">
        <button
          className="text-white text-2xl p-2 rounded-md hover:bg-rose-500 focus:outline-none"
          onClick={() => setShowMenu((prev) => !prev)}
          aria-label="Open menu"
        >
          <FaBars />
        </button>
        <div>
          <div className="text-white text-lg">Welcome,</div>
          <div className="text-white text-4xl font-bold">Apurva</div>
        </div>
        <div />
      </div>
      {/* Sidebar Menu */}
      {showMenu && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-72 bg-white h-full shadow-2xl rounded-r-3xl flex flex-col pt-10 px-6 relative">
            <nav className="flex-1 space-y-2">
              <Link to="/dashboard/profile" onClick={closeMenu} className="flex items-center gap-3 py-3 px-2 rounded-lg text-gray-700 hover:bg-rose-50 text-lg">
                <FaUser className="text-xl" /> Profile
              </Link>
              <Link to="/dashboard" onClick={closeMenu} className="flex items-center gap-3 py-3 px-2 rounded-lg text-gray-700 hover:bg-rose-50 text-lg">
                <FaHome className="text-xl" /> Home
              </Link>
              <Link to="/dashboard/add-property" onClick={closeMenu} className="flex items-center gap-3 py-3 px-2 rounded-lg text-gray-700 hover:bg-rose-50 text-lg">
                <FaPlusSquare className="text-xl" /> Add Property
              </Link>
              <Link to="/dashboard/bookings" onClick={closeMenu} className="flex items-center gap-3 py-3 px-2 rounded-lg text-gray-700 hover:bg-rose-50 text-lg">
                <FaListUl className="text-xl" /> Booking History
              </Link>
              <Link to="/dashboard/invoices" onClick={closeMenu} className="flex items-center gap-3 py-3 px-2 rounded-lg text-gray-700 hover:bg-rose-50 text-lg">
                <FaFileInvoice className="text-xl" /> Invoices
              </Link>
              <Link to="/dashboard/payout" onClick={closeMenu} className="flex items-center gap-3 py-3 px-2 rounded-lg text-gray-700 hover:bg-rose-50 text-lg">
                <FaMoneyCheckAlt className="text-xl" /> Payout
              </Link>
              <Link to="/dashboard/privacy" onClick={closeMenu} className="flex items-center gap-3 py-3 px-2 rounded-lg text-gray-700 hover:bg-rose-50 text-lg">
                <FaShieldAlt className="text-xl" /> Privacy Policy
              </Link>
              <button onClick={() => { handleLogout(); closeMenu(); }} className="flex items-center gap-3 py-3 px-2 rounded-lg text-gray-700 hover:bg-rose-50 text-lg w-full text-left">
                <FaSignOutAlt className="text-xl" /> Logout
              </button>
            </nav>
          </div>
          {/* Overlay to close menu */}
          <div className="flex-1" onClick={closeMenu} />
        </div>
      )}
      {/* Main content area for dashboard pages */}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout; 