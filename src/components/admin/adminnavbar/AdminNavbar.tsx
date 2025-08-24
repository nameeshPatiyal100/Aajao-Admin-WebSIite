import { Bell, ChevronDown, MenuSquareIcon, Search } from "lucide-react";
import { useSidebar } from "../../../context/AdminContext";
import "./adminNavbar.css";
import userImg from "../../../assets/user.jpg";
import AdminNotifySidebar from "../adminNotification/AdminNotifySidebar";
import React, { useState } from "react";
import { Button, MenuItem,Menu } from "@mui/material";

const AdminNavbar = () => {
  const { toggleSidebar } = useSidebar();

  const [openNotify, setOpenNotify] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleNotifyDrawer = (open: boolean) => {
    setOpenNotify(open);
  };

  return (
    <header className="adminNavbarHeader">
      <div className="adminNavbarHeaderLogo">
        <button className="adminNavbarHeaderLogoButton" onClick={toggleSidebar}>
          <MenuSquareIcon />
        </button>
        <h1 className="adminNavbarHeaderHeading">Dashboard</h1>
      </div>

      <div className="adminNavbarHeaderActions">
        {/* Search Input */}
        {/* <div className="adminNavbarHeaderSearchContainer">
          <input
            type="text"
            className="adminNavbarHeaderSearchInput"
            placeholder="Search for anything..."
          />
          <button className="adminNavbarHeaderSearchButton">
            <Search size={16} />
          </button>
        </div> */}

        {/* Notification Bell */}
        <div className="adminNavbarHeaderButtonOfNotifications">
          <button
            className="adminNavbarHeaderActionButton"
            onClick={() => toggleNotifyDrawer(true)}
          >
            <Bell size={16} />
          </button>
          <AdminNotifySidebar open={openNotify} toggle={toggleNotifyDrawer} />
        </div>

        {/* User Profile Dropdown */}
        <div className="adminNavbarHeaderUserProfileSections">
          <div className="adminNavbarUserProfileContainer">
            <figure className="adminNavbarUserProfileImage">
              <img src={userImg} alt="user" />
            </figure>
            <div className="adminNavbarUserProfileDetails">
              <span className="adminNavbarUserProfileName">Username</span>
              <p className="adminNavbarUserProfileRole">Admin</p>
            </div>
            <Button
              id="basic-button"
              aria-controls={isMenuOpen ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={isMenuOpen ? "true" : undefined}
              onClick={handleClick}
              className="adminNavbarUserProfileDropdownButton"
              disableElevation
              variant="text"
            >
              <ChevronDown size={14} />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
