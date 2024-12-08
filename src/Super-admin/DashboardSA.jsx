import React, { useState } from "react";

function DashboardSA() {
  const [menuItem, setMenuItem] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [activeSection, setActiveSection] = useState("addMenu");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuItem({ ...menuItem, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMenuItem({ ...menuItem, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Menu Item:", menuItem);
    setMenuItem({
      name: "",
      description: "",
      price: "",
      image: null,
    });
    setPreview(null);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-lg">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Restaurant Admin</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-4">
            <li
              onClick={() => setActiveSection("addMenu")}
              className={`cursor-pointer flex items-center p-2 text-gray-700 rounded-md ${
                activeSection === "addMenu"
                  ? "bg-gray-200 font-semibold"
                  : "hover:bg-gray-200"
              }`}
            >
              <span className="text-xl">🍽️</span>
              <span className="ml-3">Add Menu</span>
            </li>
            <li
              onClick={() => setActiveSection("viewRestaurants")}
              className={`cursor-pointer flex items-center p-2 text-gray-700 rounded-md ${
                activeSection === "viewRestaurants"
                  ? "bg-gray-200 font-semibold"
                  : "hover:bg-gray-200"
              }`}
            >
              <span className="text-xl">🏨</span>
              <span className="ml-3">View Restaurants</span>
            </li>
            <li
              onClick={() => setActiveSection("settings")}
              className={`cursor-pointer flex items-center p-2 text-gray-700 rounded-md ${
                activeSection === "settings"
                  ? "bg-gray-200 font-semibold"
                  : "hover:bg-gray-200"
              }`}
            >
              <span className="text-xl">⚙️</span>
              <span className="ml-3">Settings</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md p-4 space-y-2 md:space-y-0">
          <h2 className="text-xl font-semibold text-gray-800">
            Dashboard Overview
          </h2>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search..."
              className="w-full md:w-auto px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#F39C12]"
            />
            <button className="px-4 py-2 bg-[#F39C12] text-white rounded-md hover:bg-[#e67e22]">
              Logout
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 bg-gray-100">
          {/* Render Based on Active Section */}
          {activeSection === "addMenu" && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Add New Menu Item
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Food Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Food Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={menuItem.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F39C12]"
                    placeholder="Enter food name"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={menuItem.description}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F39C12]"
                    placeholder="Enter description"
                    rows="3"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={menuItem.price}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F39C12]"
                    placeholder="Enter price"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  />
                </div>

                {/* Image Preview */}
                {preview && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Image Preview:</p>
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-md"
                    />
                  </div>
                )}

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-[#F39C12] text-white rounded-lg hover:bg-[#e67e22] focus:outline-none"
                  >
                    Add Menu Item
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeSection === "viewRestaurants" && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Restaurants List
              </h3>
              <p className="text-gray-600">Here you can view all restaurants.</p>
            </div>
          )}

          {activeSection === "settings" && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Settings
              </h3>
              <p className="text-gray-600">Here you can adjust dashboard settings.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default DashboardSA;
