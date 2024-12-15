import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select"; // Import react-select for virtualized dropdown
import { getMenuList, updateMenuItem } from "../Services/allApi"; // Only use UpdateMenuItem

function ViewMenus() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    restaurantId: "",
    category: "",
    foodType: "",
  });
  const [restaurants, setRestaurants] = useState([]);
  const [foodTypes, setFoodTypes] = useState([]);
  const [categories, setCategories] = useState([]);

  const [editingMenu, setEditingMenu] = useState(null); // State to hold the menu being edited
  const [updatedMenus, setUpdatedMenus] = useState([]); // State to hold the list of menus being updated
  const [searchTerm, setSearchTerm] = useState(""); // State for the search input

  useEffect(() => {
    const fetchMenus = async () => {
      const username = "admin"; // Update based on your auth setup
      const password = "admin123"; // Update based on your auth setup
      const reqHeaders = {
        Authorization: "Basic " + btoa(username + ":" + password),
      };

      try {
        const response = await getMenuList(reqHeaders);
        if (response?.status === 200) {
          const data = response?.data || [];
          setMenus(data);

          const uniqueRestaurants = [...new Set(data.map((menu) => menu.restaurantId))];
          setRestaurants(uniqueRestaurants);

          const uniqueCategories = [...new Set(data.map((menu) => menu.category))];
          setCategories(uniqueCategories);

          const uniqueFoodTypes = [...new Set(data.map((menu) => menu.foodType))];
          setFoodTypes(uniqueFoodTypes);

          setFilters((prevFilters) => ({
            ...prevFilters,
            category: uniqueCategories[0] || "",
            foodType: uniqueFoodTypes[0] || "",
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

    // Apply filters
    if (filters.restaurantId) {
      filtered = filtered.filter((menu) => menu.restaurantId === filters.restaurantId);
    }
    if (filters.category) {
      filtered = filtered.filter((menu) => menu.category === filters.category);
    }
    if (filters.foodType) {
      filtered = filtered.filter((menu) => menu.foodType === filters.foodType);
    }

    // Apply search term filter across all columns
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter((menu) => {
        return (
          (menu.itemName?.toLowerCase().includes(lowerCaseSearchTerm)) ||
          (menu.itemDescription?.toLowerCase().includes(lowerCaseSearchTerm)) ||
          (menu.price?.toString().toLowerCase().includes(lowerCaseSearchTerm)) ||
          (menu.totalQuantity?.toString().toLowerCase().includes(lowerCaseSearchTerm)) ||
          (menu.category?.toLowerCase().includes(lowerCaseSearchTerm)) ||
          (menu.foodType?.toLowerCase().includes(lowerCaseSearchTerm)) ||
          (menu.restaurantName?.toLowerCase().includes(lowerCaseSearchTerm)) ||
          (menu.restaurantId?.toString().toLowerCase().includes(lowerCaseSearchTerm))
        );
      });
    }

    return filtered;
  }, [filters, menus, searchTerm]); // Add searchTerm as a dependency

  const handleFilterChange = (name) => (selectedOption) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleEditClick = (menu) => {
    setEditingMenu(menu);
    setUpdatedMenus((prev) => [
      ...prev,
      {
        id: menu.id,
        itemName: menu.itemName,
        itemDescription: menu.itemDescription,
        price: menu.price,
        totalQuantity: menu.totalQuantity,
        category: menu.category,
        foodType: menu.foodType,
        restaurantId: menu.restaurantId,
        imageUrl:menu.imageUrl,
      },
    ]);
  };

  const handleInputChange = (e, menuId) => {
    const { name, value } = e.target;
    setUpdatedMenus((prev) =>
      prev.map((menu) =>
        menu.id === menuId ? { ...menu, [name]: value } : menu
      )
    );
  };

  const handleUpdateMenus = async () => {
    try {
      const response = await updateMenuItem(updatedMenus); // Send updatedMenus array

      if (response?.status === 204) {
        // Update the menu items in the state after successful update
        setMenus((prevMenus) =>
          prevMenus.map((menu) => {
            const updatedMenu = updatedMenus.find((uMenu) => uMenu.id === menu.id);
            return updatedMenu ? { ...menu, ...updatedMenu } : menu;
          })
        );
        setEditingMenu(null); // Close the edit form
        setUpdatedMenus([]); // Reset the updatedMenus state
      } else {
        setError("Failed to update the menus.");
      }
    } catch (err) {
      setError("An error occurred while updating the menus.");
    }
  };

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

      {/* Search Section */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>

      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Restaurant Filter */}
        <div className="flex-1 min-w-[200px] w-full sm:w-auto">
          <label className="text-sm font-medium text-gray-700">Restaurant ID</label>
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

        {/* Category Filter */}
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

        {/* Food Type Filter */}
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
                <th className="px-2 py-2 text-left text-sm font-semibold text-gray-700 sm:px-4">Item Image</th>
                <th className="px-2 py-2 text-left text-sm font-semibold text-gray-700 sm:px-4">Item Name</th>
                <th className="px-2 py-2 text-left text-sm font-semibold text-gray-700 sm:px-4">Description</th>
                <th className="px-2 py-2 text-left text-sm font-semibold text-gray-700 sm:px-4">Price</th>
                <th className="px-2 py-2 text-left text-sm font-semibold text-gray-700 sm:px-4">Quantity</th>
                <th className="px-2 py-2 text-left text-sm font-semibold text-gray-700 sm:px-4">Category</th>
                <th className="px-2 py-2 text-left text-sm font-semibold text-gray-700 sm:px-4">Food Type</th>
                <th className="px-2 py-2 text-left text-sm font-semibold text-gray-700 sm:px-4">Restaurant</th>
                <th className="px-2 py-2 text-left text-sm font-semibold text-gray-700 sm:px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMenus.map((menu) => (
                <tr key={menu.id}>
                  <td className="px-4 py-2 text-sm text-gray-800">
                      {menu.imageUrl ? (
                        <img
                          src={menu.imageUrl}
                          alt={menu.itemName || "Menu Item"}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                  <td className="px-4 py-2 text-sm text-gray-800">{menu.itemName}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{menu.itemDescription}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{menu.price}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{menu.totalQuantity}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{menu.category}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{menu.foodType}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{menu.restaurantName}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEditClick(menu)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
 {/* Edit Menu Modal */}
 {editingMenu && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">Edit Menu</h3>
            {updatedMenus.map((menu) => (
              <div key={menu.id}>
                <label className="block text-sm font-medium">Item Name</label>
                <input
                  type="text"
                  name="itemName"
                  value={menu.itemName}
                  onChange={(e) => handleInputChange(e, menu.id)}
                  className="w-full p-2 mb-2 border rounded"
                />
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="itemDescription"
                  value={menu.itemDescription}
                  onChange={(e) => handleInputChange(e, menu.id)}
                  className="w-full p-2 mb-2 border rounded"
                ></textarea>
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="number"
                  name="price"
                  value={menu.price}
                  onChange={(e) => handleInputChange(e, menu.id)}
                  className="w-full p-2 mb-2 border rounded"
                />
                <label className="block text-sm font-medium">Quantity</label>
                <input
                  type="number"
                  name="totalQuantity"
                  value={menu.totalQuantity}
                  onChange={(e) => handleInputChange(e, menu.id)}
                  className="w-full p-2 mb-2 border rounded"
                />
                <label className="block text-sm font-medium">Category</label>
                <Select
                  name="category"
                  value={menu.category ? formatSelectOption(menu.category) : null}
                  onChange={(option) =>
                    setUpdatedMenus((prev) =>
                      prev.map((m) =>
                        m.id === menu.id ? { ...m, category: option.value } : m
                      )
                    )
                  }
                  options={categories.map((category) => ({
                    label: category,
                    value: category,
                  }))}
                  className="mb-2"
                />
                <label className="block text-sm font-medium">Food Type</label>
                <Select
                  name="foodType"
                  value={menu.foodType ? formatSelectOption(menu.foodType) : null}
                  onChange={(option) =>
                    setUpdatedMenus((prev) =>
                      prev.map((m) =>
                        m.id === menu.id ? { ...m, foodType: option.value } : m
                      )
                    )
                  }
                  options={foodTypes.map((foodType) => ({
                    label: foodType,
                    value: foodType,
                  }))}
                  className="mb-2"
                />
                <label className="block text-sm font-medium">Restaurant ID</label>
                <input
                  type="text"
                  name="restaurantId"
                  value={menu.restaurantId}
                  onChange={(e) => handleInputChange(e, menu.id)}
                  className="w-full p-2 mb-2 border rounded"
                />
              </div>
            ))}
            <div className="mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleUpdateMenus}
              >
                Save Changes
              </button>
              <button
                className="px-4 py-2 ml-2 bg-gray-500 text-white rounded"
                onClick={() => {
                  setEditingMenu(null);
                  setUpdatedMenus([]);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewMenus;
