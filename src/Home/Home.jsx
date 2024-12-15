import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useState, useRef } from 'react';
import { getMenuListByRestaurantIdAndRestaurantName, getRestaurantColorTheme} from '../Services/allApi';
import AddCart from './AddCart';
import { useSearchParams } from 'react-router';

function Home() {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Starters');
  const [selectedType, setSelectedType] = useState('Veg');
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]); // Cart items array
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 }); // Price range filter
  const [searchParams] = useSearchParams();

  const restaurantId = searchParams.get('restaurantId');
  const restaurantName = searchParams.get('restaurantName');

  const [themeColor, setThemeColor] = useState(() => {
    // Load cached theme color from localStorage
    const cachedTheme = localStorage.getItem('themeColor');
    return cachedTheme ? JSON.parse(cachedTheme) : { backgroundColor: "#f4f4f4", textColor: "#000000" }; // Default theme
  }); // Default green color
  const searchInputRef = useRef(null); // Reference to the search bar input

  useEffect(() => {
    fetchColorTheme();
  }, []);

  const getHeaders = () => {
    const username = "admin";
    const password = "admin123";
    return {
      'Authorization': 'Basic ' + btoa(`${username}:${password}`),
    };
  };

  const fetchColorTheme = async (headers) => {
    try {
      const res = await getRestaurantColorTheme(restaurantId, headers);
      if (res?.status === 500) {
        alert('Failed to fetch the restaurant color theme.');
        return;
      }
      const newTheme = res?.data || {};
      setThemeColor(newTheme);
      // Cache the fetched theme
      localStorage.setItem('themeColor', JSON.stringify(newTheme));
    } catch (error) {
      console.error('Error fetching restaurant color theme:', error);
      alert("Failed to fetch the color theme. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const headers = getHeaders();
      await fetchColorTheme(headers);
      setLoading(false);
    };

    fetchData();
  }, []);


  const scrollToSearchBar = () => {
    if (searchInputRef.current) {
      searchInputRef.current.scrollIntoView({ behavior: 'smooth' });
      searchInputRef.current.focus(); // Highlight the search bar
      searchInputRef.current.style.borderColor = themeColor; // Add a temporary highlight color
      setTimeout(() => {
        searchInputRef.current.style.borderColor = ''; // Reset the border color after a delay
      }, 1000); // Adjust timing as needed
    }
  };

  const updateToCart = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, cartCount: 1 } : item
    ));

    const selectedItem = items.find(item => item.id === id);
    if (selectedItem) {
      const existingItem = cartItems.find(item => item.id === id);
      if (!existingItem) {
        setCartItems([...cartItems, { ...selectedItem, cartCount: 1 }]);
      }
    }
  };

  const plusItems = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, cartCount: item.cartCount + 1 } : item
    ));

    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, cartCount: item.cartCount + 1 } : item
    ));
  };

  const minusItems = (id) => {
    setItems(items.map(item =>
      item.id === id && item.cartCount > 1
        ? { ...item, cartCount: item.cartCount - 1 }
        : item.id === id && item.cartCount === 1
        ? { ...item, cartCount: 0 }
        : item
    ));

    setCartItems(cartItems
      .map(item =>
        item.id === id
          ? { ...item, cartCount: item.cartCount - 1 }
          : item
      )
      .filter(item => item.cartCount > 0)); // Remove item if cartCount is 0
  };
  

  const getItems = async () => {
    const username = "admin";
    const password = "admin123";
    const reqHeaders = {
      'Authorization': 'Basic ' + btoa(username + ":" + password)
    };
    const res = await getMenuListByRestaurantIdAndRestaurantName(restaurantId,restaurantName,reqHeaders);
    const newData = res?.data?.map((item) => ({
      id: item?.id,
      name: item?.itemName,
      description: item?.itemDescription,
      price: item?.price,
      imageUrl: item?.imageUrl ?? 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
      category: item?.category ?? 'Starters',
      cartCount: 0,
      type: item?.type ?? 'Veg',
    }));
    setItems(newData);
    setLoading(false);
    if(res?.status==500){
      alert('No menus found with provided restaurant id and restaurant name')
    }
  };
  

  useEffect(() => {
    getItems();
  }, []);


  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePriceChange = (min, max) => {
    setPriceRange({
      min: isNaN(min) || min < 0 ? 0 : min, 
      max: isNaN(max) || max < 0 ? 1000 : max
    });
  };

  const filteredItems = items?.filter(item => {
    const isPriceInRange = (priceRange.min === 0 && priceRange.max === 0) || 
                           (item.price >= priceRange.min && item.price <= priceRange.max);

    return (
      item.category === selectedCategory &&
      (selectedType === 'All' || item.type === selectedType) &&
      isPriceInRange &&
      (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  const [buttonAnimations, setButtonAnimations] = useState({});

const triggerZoomAnimation = (id, type) => {
  setButtonAnimations((prev) => ({
    ...prev,
    [id]: {
      ...prev[id],
      [type]: true,
    },
  }));

  setTimeout(() => {
    setButtonAnimations((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [type]: false,
      },
    }));
  }, 300); // Match the duration of the CSS animation (0.3s)
};


  const SkeletonLoader = () => (
    <div className="w-full h-auto flex flex-col bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
      <div className="flex flex-row items-start p-3 gap-5">
        <div className="w-36 h-36 bg-gray-300 rounded-lg animate-pulse"></div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center mb-2">
            <div className="h-6 w-3/4 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="mb-2">
            <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="flex justify-between items-center mt-auto">
            <div className="h-6 w-1/4 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-300 animate-pulse"></div>
    </div>
  );

  return (
    <div className='flex justify-center bg-white min-h-screen w-full'>
      <div className='flex flex-col w-full pb-20'>
        <div><h5 className='px-3 pt-5 pb-3 font-bold text-4xl'>Find delicious items from</h5></div>
        <div><h5 className='px-2 font-bold text-4xl' style={{ color: themeColor }}>{restaurantName}</h5></div>

        <div className='flex flex-row px-3 items-center justify-between'>
          <div className='flex gap-2 pt-3 font-bold items-center text-gray-600'>
            <div className="relative inline-block">
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value="Starters">Starters</option>
                <option value="Main Course">Main Course</option>
                <option value="Desserts">Desserts</option>
              </select>
            </div>
          </div>

          <div className='flex flex-row gap-5'>
            <div
              className={`border ${selectedType === 'Veg' ? 'border-green-500' : 'border-gray-500'} rounded p-1 cursor-pointer`}
              onClick={() => handleTypeChange('Veg')}
            >
              <div className={`w-3 h-3 ${selectedType === 'Veg' ? 'bg-green-500' : 'bg-gray-500'} rounded`}></div>
            </div>
            <div
              className={`border ${selectedType === 'Non-Veg' ? 'border-red-500' : 'border-gray-500'} rounded p-1 cursor-pointer`}
              onClick={() => handleTypeChange('Non-Veg')}
            >
              <div className={`w-3 h-3 ${selectedType === 'Non-Veg' ? 'bg-red-500' : 'bg-gray-500'} rounded`}></div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex w-full justify-center px-3 mt-5">
          <div className="relative w-full flex items-center">
            <Icon
              icon="icon-park-outline:search"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              ref={searchInputRef} // Attach the ref to the search bar
              className="w-full rounded-lg p-2 pl-8 border shadow bg-transparent"
              style={{ borderColor: themeColor }}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, description, or category"
            />
          </div>
        </div>

        {/* Price Filter */}
        <div className="flex justify-between mt-5 px-3">
          <div className="text-sm font-semibold text-gray-700">Price Range:</div>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={priceRange.min || ""}
              onChange={(e) => handlePriceChange(Number(e.target.value), priceRange.max)}
              placeholder="Min"
              className="w-20 px-2 py-1 border border-gray-300 rounded"
            />
            <span>-</span>
            <input
              type="number"
              value={priceRange.max || ""}
              onChange={(e) => handlePriceChange(priceRange.min, Number(e.target.value))}
              placeholder="Max"
              className="w-20 px-2 py-1 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className='flex flex-col gap-3 mt-3'>
          {loading ? (
            Array(5).fill().map((_, idx) => <SkeletonLoader key={idx} />)
          ) : (
            filteredItems?.map((item) => (
              <div key={item.id} className='w-full h-auto flex flex-col bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl'>
                <div className='flex flex-row items-start p-3 gap-5'>
                  <div className='w-36 h-36'>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className='w-full h-full object-cover rounded-lg shadow-md transition-all duration-300 ease-in-out'
                    />
                  </div>
                  <div className='flex flex-col w-full'>
                    <div className='flex justify-between items-center mb-2'>
                      <h1 className='font-semibold text-lg text-gray-800 transition-colors duration-200'>{item.name}</h1>
                    </div>
                    <div className='mb-2'>
                      <p className='text-sm text-gray-600'>
                        {item.description.slice(0, 60)} 
                        <span className='font-semibold hover:underline'>{item?.description.length > 60 ? '...more' : ''}</span>
                      </p>
                    </div>

                    <div className='flex justify-between items-center mt-auto'>
                      <h1 className='font-semibold text-xl'  style={{ color: themeColor }}>&#8377; {item.price}</h1>

                      {item?.cartCount === 0 ? (
                        <button
                          onClick={() => updateToCart(item?.id)}
                          className='px-6 py-2 text-white rounded-full font-semibold shadow-lg hover:bg-[#059669] transition-all duration-300 transform hover:scale-105'
                          style={{
                            backgroundColor: themeColor, // Dynamically set background color
                            transition: 'background-color 0.3s ease', // Smooth transition for hover effect
                          }}
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <div
                        className="flex items-center gap-3 border-2 rounded-full p-2"
                        style={{
                          borderColor: themeColor, // Dynamically set border color from themeColor state
                        }}
                      >
                        <button
                          onClick={() => {
                            minusItems(item?.id);
                            triggerZoomAnimation(item?.id, "minus");
                          }}
                          className={`px-3 py-1 font-semibold rounded-full ${
                            buttonAnimations[item.id]?.minus ? "animate-zoom" : ""
                          }`}
                          style={{
                            color: themeColor, // Set dynamic text color
                          }}
                        >
                          <Icon icon="ic:baseline-minus" />
                        </button>
                      
                        <span
                          className="font-semibold text-lg"
                          style={{
                            color: themeColor, // Set dynamic text color
                          }}
                        >
                          {item?.cartCount}
                        </span>
                      
                        <button
                          onClick={() => {
                            plusItems(item?.id);
                            triggerZoomAnimation(item?.id, "plus");
                          }}
                          className={`px-3 py-1 font-semibold rounded-full ${
                            buttonAnimations[item.id]?.plus ? "animate-zoom" : ""
                          }`}
                          style={{
                            color: themeColor, // Set dynamic text color
                          }}
                        >
                          <Icon icon="ic:baseline-plus" />
                        </button>
                      </div>
                      

                      )}
                    </div>
                  </div>
                </div>
                <div className='w-full h-[1px] bg-gray-300'></div>
              </div>
            ))
          )}
        </div>
      </div>
        {/* Pass the scroll function to AddCart */}
        <AddCart
        themeColor={themeColor}
        cartCount={cartItems.length} // Total unique line item count
        cartItems={cartItems} // Pass cart items for the popup
        onSearchIconClick={scrollToSearchBar} // Trigger scroll to search bar
/>
    </div>
  );
}

export default Home;
