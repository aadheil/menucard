import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import HomeSDashboard from "./Super-admin/HomeSDashboard";
import DashboardSA from "./Super-admin/DashboardSA";

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

        {/* Additional Routes (Dummy) */}
        <Route
          path="view-restaurants"
          element={<h1>View Restaurants Section (Dummy Text)</h1>}
        />
        <Route
          path="settings"
          element={<h1>Settings Section (Dummy Text)</h1>}
        />
         <Route
          path="menus"
          element={<h1>view all menu Section (Dummy Text)</h1>}
        />
      </Route>
      
    </Routes>
  );
}

export default App;
