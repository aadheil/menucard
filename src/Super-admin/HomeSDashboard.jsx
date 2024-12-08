import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarSA from './SidebarSA';

const HomeSDashboard = () => {
  return (
    <div className="flex" >
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-56">
        <SidebarSA />
      </div>

      {/* Main Content with left margin to avoid overlap */}
      <div className="flex-1 ml-56">
        {/* Nested Route Content will appear here */}
        
        <Outlet />
      </div>
    </div>
  );
};

export default HomeSDashboard;
