import { NavLink } from "react-router-dom";
import { useSidebar } from "../../../context/AdminContext";
import {
  LucideIcon,
  LucideOctagon,
  LayoutDashboard,
  Users,
  Settings,
  ChevronDown,
  ChevronUp,
  AlignVerticalJustifyCenterIcon,
  BellElectric,
  TrafficCone,
  ThermometerSnowflakeIcon,
  ContactRound,
  BookIcon,
} from "lucide-react";
import { useState, MouseEvent, useEffect } from "react";
import "./adminSidebar.css";

interface NavItem {
  text: string;
  path: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { text: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { text: "Users", path: "/admin/users", icon: Users },
  { text: "Host", path: "/admin/host", icon: LucideOctagon },
  {
    text: "Properties",
    path: "/admin/properties",
    icon: AlignVerticalJustifyCenterIcon,
  },
  // { text: "Payouts", path: "/admin/notifications", icon: BellElectric },
  { text: "Transactions", path: "/admin/transactions", icon: BellElectric },
  { text: "Blog", path: "/admin/notifications", icon: BellElectric },
  { text: "Notifications", path: "/admin/notifications", icon: BellElectric },
  { text: "CMS", path: "/admin/notifications", icon: BellElectric },
  { text: "Configuration", path: "/admin/settings", icon: Settings },
  { text: "Bookings", path: "/admin/Bookings", icon: BookIcon },
  { text: "Support", path: "/admin/support", icon: LucideOctagon },
];

const SUB_ITEMS: Record<string, NavItem[]> = {
  Users: [
    {
      text: "Confirmation Pending",
      path: "/admin/users/add",
      icon: ContactRound,
    },
    { text: "Manage Users", path: "/admin/users/manage", icon: BellElectric },
  ],
  Host: [
    {
      text: "Confirmation Pending",
      path: "/admin/reports/monthly",
      icon: LayoutDashboard,
    },
    {
      text: "Annual Reports",
      path: "/admin/reports/annual",
      icon: AlignVerticalJustifyCenterIcon,
    },
    
  ],
  Properties: [
   
    {
      text: "Property Categories",
      path: "/admin/Categories",
      icon: ThermometerSnowflakeIcon,
    },
    {
      text : "Property Tags",
      path : "/admin/tags",
      icon : ThermometerSnowflakeIcon
    },
    {
      text : "Ammenities",
      path : "/admin/ammenities",
      icon : ThermometerSnowflakeIcon
    }
    ,
    {
      text : "Property Verification",
      path : "/admin/property-verification",
      icon : ThermometerSnowflakeIcon
    }
    
  ],
  Settings: [
    { text: "Status", path: "/admin/status", icon: TrafficCone },
    {
      text: "Conversions",
      path: "/admin/analytics/conversions",
      icon: ThermometerSnowflakeIcon,
    },
  ],
  Blog: [
    { text: "Blog Tags", path: "/admin/status", icon: TrafficCone },
    {
      text: "Blog Category",
      path: "/admin/analytics/conversions",
      icon: ThermometerSnowflakeIcon,
    },
  ],
  CMS: [
    { text: "Privacy Policy", path: "/admin/status", icon: TrafficCone },
    {
      text: "FAQ",
      path: "/admin/analytics/conversions",
      icon: ThermometerSnowflakeIcon,
    },
    {
      text: "Safety",
      path: "/admin/analytics/conversions",
      icon: ThermometerSnowflakeIcon,
    },
    {
      text: "Web About-us",
      path: "/admin/analytics/conversions",
      icon: ThermometerSnowflakeIcon,
    },
    {
      text: "App About-us",
      path: "/admin/analytics/conversions",
      icon: ThermometerSnowflakeIcon,
    },
    {
      text: "Web Contact-us",
      path: "/admin/analytics/conversions",
      icon: ThermometerSnowflakeIcon,
    },
  ],
  Transactions:[
    {
      text: "Payouts",
      path: "/admin/analytics/conversions",
      icon: ThermometerSnowflakeIcon,
    }
  ]
};

const AdminSidebar = () => {
  const { isCollapsed } = useSidebar();
  const [dropdownState, setDropdownState] = useState<Record<string, boolean>>(
    {}
  );

  const toggleDropdown = (e: MouseEvent, itemText: string) => {
    e.preventDefault();
    setDropdownState((prev) => ({
      ...prev,
      [itemText]: !prev[itemText],
    }));
  };

  useEffect(() => {
    if (isCollapsed) {
      setDropdownState({});
    }
  }, [isCollapsed]);

  return (
    <aside className={`adminSidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebarLogo">
        <LucideOctagon size={32} />
        {!isCollapsed && <span className="sidebarLogoText">Your Logo</span>}
      </div>

      <nav className="sidebarNav">
        <ul className="sidebarNavList">
          {NAV_ITEMS.map((item) => (
            <li key={item.text} className="sidebarNavItem">
              <div className="sidebarLinkWrapper">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `sidebarLink ${isActive ? "sidebarActive" : ""}`
                  }
                >
                  <item.icon className="sidebarIcon" />
                  {!isCollapsed && (
                    <span className="sidebarText">{item.text}</span>
                  )}
                </NavLink>

                {!isCollapsed && SUB_ITEMS[item.text] && (
                  <button
                    className="sidebarDropdownToggle"
                    onClick={(e) => toggleDropdown(e, item.text)}
                    aria-expanded={!!dropdownState[item.text]}
                  >
                    {dropdownState[item.text] ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                )}
              </div>

              {!isCollapsed &&
                SUB_ITEMS[item.text] &&
                dropdownState[item.text] && (
                  <ul className="sidebarSubList">
                    {SUB_ITEMS[item.text].map((sub) => (
                      <li key={sub.path} className="sidebarSubItem">
                        <NavLink
                          to={sub.path}
                          className={({ isActive }) =>
                            `sidebarSubLink ${isActive ? "sidebarActive" : ""}`
                          }
                        >
                          <sub.icon className="sidebarIcon" />
                          <span className="sidebarText">{sub.text}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
