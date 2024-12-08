import React, { useState } from "react";
import { AddProduct } from "../Services/allApi";

function DashboardSA() {
  const [menuItems, setMenuItems] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState({
    itemName: "",
    itemDescription: "",
    restaurantId: "",
    price: 0,
    totalQuantity: 0,
  });
  const [message, setMessage] = useState("");
  const [activeSection, setActiveSection] = useState("addMenu");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMenuItem({ ...newMenuItem, [name]: value });
  };

  const handleAddMenuItem = () => {
    // Validate the new item before adding to the list
    const price = parseFloat(newMenuItem.price);
    const totalQuantity = parseInt(newMenuItem.totalQuantity, 10);

    if (
      !newMenuItem.itemName ||
      !newMenuItem.itemDescription ||
      isNaN(price) ||
      isNaN(totalQuantity) ||
      !newMenuItem.restaurantId
    ) {
      setMessage("Please fill all fields correctly before adding.");
      return;
    }

    setMenuItems([...menuItems, { ...newMenuItem, price, totalQuantity }]);
    setNewMenuItem({
      itemName: "",
      itemDescription: "",
      restaurantId: "",
      price: 0,
      totalQuantity: 0,
    });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (menuItems.length === 0) {
      setMessage("Please add at least one menu item.");
      return;
    }

    const username = "admin";
    const password = "admin123";
    const reqHeaders = {
      Authorization: "Basic " + btoa(username + ":" + password),
    };

    try {
      const res = await AddProduct(menuItems, reqHeaders); // Sending the array of items
      if (res?.status === 201) {
        setMessage("Menu items added successfully!");
        setMenuItems([]); // Clear the list after successful submission
      } else {
        setMessage("Failed to add menu items. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred while adding the menu items.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="flex h-16 flex-col md:flex-row items-center justify-between bg-white shadow-md p-4 space-y-2 md:space-y-0">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard Overview</h2>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search..."
              className="w-full md:w-auto px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#F39C12]"
            />
            <button className="px-4 py-2 bg-[#F39C12] text-white rounded-md hover:bg-[#e67e22]">Logout</button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 bg-gray-100">
          {activeSection === "addMenu" && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Add New Menu Items</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                {message && (
                  <div
                    className={`p-3 rounded ${
                      message.includes("successfully")
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {message}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Item Name</label>
                  <input
                    type="text"
                    name="itemName"
                    value={newMenuItem.itemName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F39C12]"
                    placeholder="Enter item name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Item Description</label>
                  <textarea
                    name="itemDescription"
                    value={newMenuItem.itemDescription}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F39C12]"
                    placeholder="Enter item description"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={newMenuItem.price}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F39C12]"
                    placeholder="Enter price"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Quantity</label>
                  <input
                    type="number"
                    name="totalQuantity"
                    value={newMenuItem.totalQuantity}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F39C12]"
                    placeholder="Enter total quantity"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Restaurant ID</label>
                  <input
                    type="text"
                    name="restaurantId"
                    value={newMenuItem.restaurantId}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F39C12]"
                    placeholder="Enter restaurant ID"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleAddMenuItem}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                  >
                    Add to List
                  </button>
                </div>
              </form>
              <div className="mt-6">
                <h4 className="text-lg font-semibold">Menu Items to Add:</h4>
                <ul className="list-disc pl-6 mt-2">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      {item.itemName} - ₹{item.price}, Quantity: {item.totalQuantity}, Restaurant: {item.restaurantId}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <button
                  onClick={handleSubmit}
                  className="w-full mt-4 px-4 py-2 bg-[#F39C12] text-white rounded-lg hover:bg-[#e67e22] focus:outline-none"
                >
                  Submit All Items
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default DashboardSA;
