import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import DashboardSA from "./Super-admin/DashboardSA";
import HomeSDashboard from "./Super-admin/HomeSDashboard";
import ViewMenus from "./Super-admin/ViewMenus"; // Import the new component

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

        {/* Other Routes */}
        <Route path="view-restaurants" element={<h1>View Restaurants Section</h1>} />
        <Route path="settings" element={<h1>Settings Section</h1>} />

        {/* View Menus Route */}
        <Route path="menus" element={<ViewMenus />} />
      </Route>
    </Routes>
  );
}

export default App;
