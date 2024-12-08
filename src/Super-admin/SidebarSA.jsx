import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SidebarSA = () => {
  const [currentPath, setCurrentPath] = useState(""); // Track the active route
  const location = useLocation(); // Get the current route
  const navigate = useNavigate(); // Navigate between routes

  // Update current path whenever location changes
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const menuItems = [
    { label: "Add Menu", path: "/dashboard/super-admin/add-menu", icon: "🍽️" },
    { label: "View Restaurants", path: "/dashboard/super-admin/view-restaurants", icon: "🏨" },
    { label: "Settings", path: "/dashboard/super-admin/settings", icon: "⚙️" },
  ];

  return (
    <aside className="w-full md:w-56 h-lvh bg-white shadow-lg">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Super Admin</h1>
      </div>
      
      {/* Sidebar Navigation */}
      <nav className="p-4">
        <ul className="space-y-4">
          {menuItems.map(({ label, path, icon }) => (
            <li
              key={path}
              onClick={() => navigate(path)} // Navigate to the selected path
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
