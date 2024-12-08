import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarSA from "./SidebarSA";

const HomeSDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarSA isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1">
        {/* Hamburger Menu for Mobile */}
        <button
          onClick={toggleSidebar}
          className="p-2 m-4 bg-gray-800 text-white rounded-md md:hidden"
        >
          ☰
        </button>

        {/* Nested Route Content */}
        <Outlet />
      </div>
    </div>
  );
};

export default HomeSDashboard;
