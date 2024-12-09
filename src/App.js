import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import DashboardSA from "./Super-admin/DashboardSA";
import HomeSDashboard from "./Super-admin/HomeSDashboard";
import ViewMenus from "./Super-admin/ViewMenus"; // Import the new component
import AddRestaurant from "./Super-admin/AddRestaurant";

function App() {
  return (
    <Routes>
      {/* Main Home Route */}
      <Route path="/" element={<Home />} />

      {/* Super Admin Dashboard Routes */}
      <Route path="/dashboard/super-admin" element={<HomeSDashboard />}>
        {/* Default Route for the Dashboard */}
        <Route index element={<h1>Welcome to the Super Admin Dashboard</h1>} />

        {/* Add Menu Route */}
        <Route path="add-menu" element={<DashboardSA />} />

        {/* View Menus Route */}
        <Route path="view-menus" element={<ViewMenus />} />

        {/* Add restaurant Route */}
        <Route path="add-restaurants" element={<AddRestaurant />} />

         {/* view restaurant Route */}
        <Route path="view-restaurants" element={<h1>view restaurant section</h1>} />

         {/* settings Route */}
        <Route path="settings" element={<h1>Settings Section</h1>} />

        
      </Route>
    </Routes>
  );
}

export default App;
