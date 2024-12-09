import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select"; // Import react-select for virtualized dropdown
import { GetProductList } from "../Services/allApi";

function ViewMenus() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    restaurantId: "",
    category: "", // Default will be set from the response
    foodType: "", // Default will be set from the response
  });
  const [restaurants, setRestaurants] = useState([]);
  const [foodTypes, setFoodTypes] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch menu data and restaurant options
    const fetchMenus = async () => {
      const username = "admin"; // Update based on your auth setup
      const password = "admin123"; // Update based on your auth setup
      const reqHeaders = {
        Authorization: "Basic " + btoa(username + ":" + password),
      };

      try {
        const response = await GetProductList(reqHeaders);
        if (response?.status === 200) {
          const data = response?.data || [];
          setMenus(data);

          // Extract restaurant IDs, categories, and food types dynamically from the response
          const uniqueRestaurants = [...new Set(data.map((menu) => menu.restaurantId))];
          setRestaurants(uniqueRestaurants);

          const uniqueCategories = [...new Set(data.map((menu) => menu.category))];
          setCategories(uniqueCategories);

          const uniqueFoodTypes = [
            ...new Set([
              ...data.map((menu) => menu.foodType),
            ]),
          ];
          setFoodTypes(uniqueFoodTypes);

          // Set initial filters based on the first available values from the response
          setFilters((prevFilters) => ({
            ...prevFilters,
            category: uniqueCategories[0] || "", // Set default category if available
            foodType: uniqueFoodTypes[0] || "",  // Set default food type if available
          }));
        } else {
          setError("Failed to fetch menus.");
        }
      } catch (err) {
        setError("An error occurred while fetching menus.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  const filteredMenus = useMemo(() => {
    let filtered = [...menus];

    if (filters.restaurantId) {
      filtered = filtered.filter(
        (menu) => menu.restaurantId === filters.restaurantId
      );
    }

    if (filters.category) {
      filtered = filtered.filter((menu) => menu.category === filters.category);
    }

    if (filters.foodType) {
      filtered = filtered.filter((menu) => menu.foodType === filters.foodType);
    }

    return filtered;
  }, [filters, menus]);

  const handleFilterChange = (name) => (selectedOption) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: selectedOption ? selectedOption.value : "",
    }));
  };

  // Helper function to format the restaurantId and foodType for Select component
  const formatSelectOption = (value) => {
    return { label: value, value };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-24 w-24 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Menus</h2>

      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Restaurant Filter */}
        <div className="flex-1 min-w-[200px] w-full sm:w-auto">
          <label className="text-sm font-medium text-gray-700">Restaurant</label>
          <Select
            name="restaurantId"
            value={filters.restaurantId ? formatSelectOption(filters.restaurantId) : null}
            onChange={handleFilterChange("restaurantId")}
            options={restaurants.map((restaurant) => ({
              label: restaurant,
              value: restaurant,
            }))}
            placeholder="Select Restaurant"
            isClearable
          />
        </div>

        {/* Category Filter (Veg/Non-Veg or dynamically from response) */}
        <div className="flex-1 min-w-[200px] w-full sm:w-auto">
          <label className="text-sm font-medium text-gray-700">Category</label>
          <Select
            name="category"
            value={filters.category ? formatSelectOption(filters.category) : null}
            onChange={handleFilterChange("category")}
            options={categories.map((category) => ({
              label: category,
              value: category,
            }))}
            placeholder="Select Category"
            isClearable
          />
        </div>

        {/* Food Type Filter (Dynamically from response) */}
        <div className="flex-1 min-w-[200px] w-full sm:w-auto">
          <label className="text-sm font-medium text-gray-700">Food Type</label>
          <Select
            name="foodType"
            value={filters.foodType ? formatSelectOption(filters.foodType) : null}
            onChange={handleFilterChange("foodType")}
            options={foodTypes.map((foodType) => ({
              label: foodType,
              value: foodType,
            }))}
            placeholder="Select Food Type"
            isClearable
          />
        </div>
      </div>

      {/* Display menus */}
      {filteredMenus.length === 0 ? (
        <div className="text-center py-4">No menus available based on filters.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-2 text-left text-sm font-semibold text-gray-700 sm:px-4">Item Name</th>
                <th className="px-2 py-2 text-left text-sm font-semibold text-gray-700 sm:px-4">Description</th>
                <th className="px-2 py-2 text-left text-sm font-semibold text-gray-700 sm:px-4">Price (₹)</th>
                <th className="px-2 py-2 text-left text-sm font-semibold text-gray-700 sm:px-4">Quantity</th>
                <th className="px-2 py-2 text-left text-sm font-semibold text-gray-700 sm:px-4">Category</th>
                <th className="px-2 py-2 text-left text-sm font-semibold text-gray-700 sm:px-4">Food Type</th>
                <th className="px-2 py-2 text-left text-sm font-semibold text-gray-700 sm:px-4">Restaurant ID</th>
              </tr>
            </thead>
            <tbody>
              {filteredMenus.map((menu) => (
                <tr key={menu.id} className="hover:bg-gray-50">
                  <td className="px-2 py-2 text-sm text-gray-800 sm:px-4">{menu.itemName}</td>
                  <td className="px-2 py-2 text-sm text-gray-600 sm:px-4">{menu.itemDescription}</td>
                  <td className="px-2 py-2 text-sm text-gray-800 sm:px-4">₹{menu.price}</td>
                  <td className="px-2 py-2 text-sm text-gray-800 sm:px-4">{menu.totalQuantity}</td>
                  <td className="px-2 py-2 text-sm text-gray-800 sm:px-4">{menu.category}</td>
                  <td className="px-2 py-2 text-sm text-gray-800 sm:px-4">{menu.foodType}</td>
                  <td className="px-2 py-2 text-sm text-gray-800 sm:px-4">{menu.restaurantId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ViewMenus;
