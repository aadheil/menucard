import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useState, useRef } from 'react';
import { getMenuListByRestaurantIdAndRestaurantName, getRestaurantColorTheme } from '../Services/allApi';
import AddCart from './AddCart';
import { useSearchParams } from 'react-router';

function Home() {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Starters'); 
  const [selectedType, setSelectedType] = useState('Veg');
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams] = useSearchParams();

  const restaurantId = searchParams.get('restaurantId');
  const restaurantName = searchParams.get('restaurantName') || 'Italian Dorado';

  const [themeColor, setThemeColor] = useState(() => {
    const cachedTheme = localStorage.getItem('themeColor');
    return cachedTheme ? cachedTheme : "#2ebf6c";
  });

  const searchInputRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Fixed categories
  const categories = ['Starters', 'Main Course', 'Desserts'];

  useEffect(() => {
    fetchColorTheme();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
      const finalColor = newTheme.backgroundColor || "#2ebf6c";
      setThemeColor(finalColor);
      localStorage.setItem('themeColor', finalColor);
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
      searchInputRef.current.focus();
      searchInputRef.current.style.borderColor = themeColor;
      setTimeout(() => {
        if (searchInputRef.current) searchInputRef.current.style.borderColor = '';
      }, 1000);
    }
  };

  const updateToCart = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, cartCount: 1 } : item
    ));
    const selectedItem = items.find(item => item.id === id);
    if (selectedItem) {
      const existingItem = cartItems.find(ci => ci.id === id);
      if (!existingItem) {
        setCartItems([...cartItems, { ...selectedItem, cartCount: 1 }]);
      } else {
        setCartItems(cartItems.map(ci => ci.id === id ? { ...ci, cartCount: 1 } : ci));
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
        item.id === id ? { ...item, cartCount: item.cartCount - 1 } : item
      )
      .filter(item => item.cartCount > 0));
  };

  const getItems = async () => {
    const username = "admin";
    const password = "admin123";
    const reqHeaders = {
      'Authorization': 'Basic ' + btoa(username + ":" + password)
    };
    const res = await getMenuListByRestaurantIdAndRestaurantName(restaurantId, restaurantName, reqHeaders);
    const newData = res?.data?.map((item) => ({
      id: item?.id,
      name: item?.itemName,
      description: item?.itemDescription || "",
      price: item?.price,
      imageUrl: item?.imageUrl ?? 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
      category: item?.category ?? 'Starters',
      cartCount: 0,
      type: item?.type ?? 'Veg',
      rating: item?.rating ?? 4.2,
      ratingCount: item?.ratingCount ?? 250,
      customisable: item?.customisable || false
    }));
    setItems(newData);
    setLoading(false);

    if (res?.status === 500) {
      alert('No menus found with provided restaurant id and restaurant name');
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setShowDropdown(false);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = items?.filter(item => {
    return (
      (selectedCategory === '' || item.category === selectedCategory) &&
      (selectedType === 'All' || item.type === selectedType) &&
      (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  const SkeletonLoader = () => (
    <div className="w-full flex flex-row items-start p-3 border-b border-gray-200">
      <div className="w-20 h-20 bg-gray-200 rounded-md animate-pulse"></div>
      <div className="flex flex-col ml-3 flex-1 animate-pulse">
        <div className="h-4 bg-gray-200 w-3/4 rounded mb-2"></div>
        <div className="h-3 bg-gray-200 w-1/2 rounded mb-2"></div>
        <div className="h-3 bg-gray-200 w-1/3 rounded"></div>
      </div>
    </div>
  );

  return (
    <div className='bg-white min-h-screen w-full font-sans text-sm text-gray-800'>
      {/* Header Section */}
      <div className="flex flex-col px-3 py-8 border-b border-gray-200">
        <h1 className="font-bold text-black text-xl leading-tight">Find delicious items from</h1>
        <h2 className="font-bold text-black text-3xl mt-1">{restaurantName}</h2>
      </div>

      {/* Search Bar */}
      <div className="p-3 border-b border-gray-200" ref={searchInputRef}>
        <div className='relative w-full bg-gray-100 rounded-md px-3 py-2 flex items-center'>
          <input
            className='w-full bg-transparent text-sm placeholder-gray-600 focus:outline-none pr-8'
            type='text'
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder='Search for dishes'
          />
          <Icon
            icon='ic:round-search'
            className='text-gray-500 text-base absolute right-3 pointer-events-none'
          />
        </div>
      </div>

      {/* Veg/Non-Veg Toggle and Custom Dropdown */}
      <div className="p-3 border-b border-gray-200 flex items-center gap-4 relative" ref={dropdownRef}>
        {/* Veg Toggle */}
        <div className="flex items-center gap-2">
          <label className="relative inline-block w-11 h-6">
            <input
              type="checkbox"
              checked={selectedType === 'Veg'}
              onChange={() => handleTypeChange(selectedType === 'Veg' ? 'All' : 'Veg')}
              className="opacity-0 w-0 h-0 peer"
            />
            <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-200 rounded-full peer-checked:bg-green-600 transition"></span>
            <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition"></span>
          </label>
          <span className="text-sm text-gray-700 font-medium">Veg</span>
        </div>

        {/* Non-Veg Toggle */}
        <div className="flex items-center gap-2">
          <label className="relative inline-block w-11 h-6">
            <input
              type="checkbox"
              checked={selectedType === 'Non-Veg'}
              onChange={() => handleTypeChange(selectedType === 'Non-Veg' ? 'All' : 'Non-Veg')}
              className="opacity-0 w-0 h-0 peer"
            />
            <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-200 rounded-full peer-checked:bg-red-600 transition"></span>
            <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition"></span>
          </label>
          <span className="text-sm text-gray-700 font-medium">Non-Veg</span>
        </div>

        {/* Fixed Categories Dropdown */}
        <div className="ml-auto relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm font-medium flex items-center gap-1 focus:outline-none bg-white"
          >
            <span>{selectedCategory || 'Select Category'}</span>
            <Icon icon="ic:round-arrow-drop-down" className="text-base text-gray-500" />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md z-10 overflow-hidden">
              {['Starters', 'Main Course', 'Desserts'].map(cat => (
                <div
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                    selectedCategory === cat ? 'font-semibold text-gray-800' : 'text-gray-700'
                  }`}
                >
                  {cat}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

 {/* Item Listing */}
<div className='flex flex-col' style={{ paddingBottom: '80px' }}>
  {loading ? (
    Array(5).fill().map((_, idx) => <SkeletonLoader key={idx} />)
  ) : (
    filteredItems?.map((item) => (
      <div key={item.id} className='w-full flex flex-row items-start p-3 border-b border-gray-200'>
        <div className="flex-1 flex flex-col pr-3">
          <h1 className='font-semibold text-base text-gray-900'>{item.name}</h1>
          <h2 className='font-semibold text-sm text-gray-900 mb-1'>₹ {item.price}</h2>
          <div className='flex items-center text-xs mb-1'>
            <Icon icon="ic:round-star-rate" className="mr-1 text-yellow-500" />
            <span className='font-medium text-gray-700'>
              {item.rating ?? 4.2} ({item.ratingCount ?? 250})
            </span>
          </div>
          <p className='text-xs text-gray-600 mb-1'>
            Serves 1 | {item.description.slice(0, 60)}{item.description.length > 60 && '...'}{" "}
            <span className='text-xs cursor-pointer font-medium text-blue-600'>more</span>
          </p>
        </div>

        <div className='relative w-24 h-24'>
          <img
            src={item.imageUrl}
            alt={item.name}
            className='w-full h-full object-cover rounded-md'
          />
          {item.cartCount === 0 ? (
            <button
              onClick={() => updateToCart(item?.id)}
              className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[25%] bg-green-500 text-white font-medium text-sm rounded-full px-4 py-1 shadow'
            >
              ADD
            </button>
          ) : (
            <div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[25%] border-2 rounded-full p-1 bg-white flex items-center gap-2"
              style={{ borderColor: themeColor }}
            >
              <button
                onClick={() => minusItems(item?.id)}
                className='px-2 py-1 font-medium rounded-full text-xs focus:outline-none'
                style={{ color: themeColor }}
              >
                <Icon icon="ic:baseline-minus" />
              </button>

              <span
                className="font-medium text-xs"
                style={{ color: themeColor }}
              >
                {item?.cartCount}
              </span>

              <button
                onClick={() => plusItems(item?.id)}
                className='px-2 py-1 font-medium rounded-full text-xs focus:outline-none'
                style={{ color: themeColor }}
              >
                <Icon icon="ic:baseline-plus" />
              </button>
            </div>
          )}

          {item.customisable && (
            <span className='absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-medium text-gray-600'>
              Customisable
            </span>
          )}
        </div>
      </div>
    ))
  )}
</div>


      <AddCart
        themeColor={themeColor}
        cartCount={cartItems.length}
        cartItems={cartItems}
        onSearchIconClick={scrollToSearchBar}
      />
    </div>
  );
}

export default Home;
