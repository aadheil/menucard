import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SidebarSA = ({ isSidebarOpen, toggleSidebar }) => {
  const [currentPath, setCurrentPath] = useState(""); // Track the active route
  const location = useLocation(); // Get the current route
  const navigate = useNavigate(); // Navigate between routes

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const menuItems = [
    { label: "Add Menu", path: "/dashboard/super-admin/add-menu", icon: "🍽️" },
    { label: "View Restaurants", path: "/dashboard/super-admin/view-restaurants", icon: "🏨" },
    { label: "Settings", path: "/dashboard/super-admin/settings", icon: "⚙️" },
    { label: "View menus", path: "/dashboard/super-admin/menus", icon: "⚙️" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:static md:translate-x-0`}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Super Admin</h1>
        <button
          className="text-gray-800 md:hidden"
          onClick={toggleSidebar}
        >
          ✖️
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="p-4">
        <ul className="space-y-4">
          {menuItems.map(({ label, path, icon }) => (
            <li
              key={path}
              onClick={() => {
                navigate(path);
                toggleSidebar(); // Close sidebar on mobile after selection
              }}
              className={`cursor-pointer flex items-center p-2 text-gray-700 rounded-md ${
                currentPath === path
                  ? "bg-gray-200 font-semibold"
                  : "hover:bg-gray-200"
              }`}
            >
              <span className="text-xl">{icon}</span>
              <span className="ml-3">{label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarSA;
