import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { GetProductList } from '../Services/allApi';
import AddCart from './AddCart';

function Home() {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Starters');
  const [selectedType, setSelectedType] = useState('All');
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0); // Track total items in the cart

  const updateToCart = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, cartCount: 1 } : item
    ));
    setCartCount(cartCount + 1); // Increment cart count when an item is added
  };

  const plusItems = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, cartCount: item.cartCount + 1 } : item
    ));
    setCartCount(cartCount + 1); // Increment cart count when items are added
  };

  const minusItems = (id) => {
    setItems(items.map(item =>
      item.id === id && item.cartCount > 1
        ? { ...item, cartCount: item.cartCount - 1 }
        : item.id === id && item.cartCount === 1
        ? { ...item, cartCount: 0 }
        : item
    ));
    setCartCount(cartCount > 0 ? cartCount - 1 : 0); // Decrement cart count when items are removed
  };

  const getItems = async () => {
    const username = "admin";
    const password = "admin123";
    const reqHeaders = {
      'Authorization': 'Basic ' + btoa(username + ":" + password)
    };
    const res = await GetProductList(reqHeaders);
    const newData = res?.data?.map((item) => ({
      id: item?.id,
      name: item?.itemName,
      description: item?.itemDescription,
      price: item?.price,
      image: item?.image ?? 'https://th.bing.com/th/id/OIP.XSCo5S6kP3o-7-jVqH4vGgHaE8?rs=1&pid=ImgDetMain',
      category: item?.category ?? 'Starters',
      cartCount: 0,
      type: item?.type ?? 'Veg',
    }));
    setItems(newData);
    setLoading(false);
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

  const filteredItems = items.filter(item =>
    (item.category === selectedCategory) &&
    (selectedType === 'All' || item.type === selectedType)
  );

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
        <div><h5 className='px-2 font-bold text-4xl text-[#F39C12]'>Aswin Restaurant</h5></div>

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

        <div className="flex w-full justify-center px-3 mt-5">
          <div className="relative w-full flex items-center">
            <Icon
              icon="icon-park-outline:search"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              className="w-full rounded-lg p-2 pl-8 border-[#F39C12] border shadow bg-transparent"
              type="text"
              placeholder="Search"
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
                      src={item.image}
                      alt={item.name}
                      className='w-full h-full object-cover rounded-lg shadow-md transition-all duration-300 ease-in-out'
                    />
                  </div>
                  <div className='flex flex-col w-full'>
                    <div className='flex justify-between items-center mb-2'>
                      <h1 className='font-semibold text-lg text-gray-800 hover:text-[#F39C12] transition-colors duration-200'>{item.name}</h1>
                    </div>
                    <div className='mb-2'>
                      <p className='text-sm text-gray-600'>
                        {item.description.slice(0, 60)} 
                        <span className='font-semibold text-[#F39C12] hover:underline'>{item?.description.length > 60 ? '...more' : ''}</span>
                      </p>
                    </div>

                    <div className='flex justify-between items-center mt-auto'>
                      <h1 className='font-semibold text-xl text-[#F39C12]'>&#8377; {item.price}</h1>

                      {item?.cartCount === 0 ? (
                        <button
                          onClick={() => updateToCart(item?.id)}
                          className='px-6 py-2 bg-[#F39C12] text-white rounded-full font-semibold shadow-lg hover:bg-[#e67e22] transition-all duration-300 transform hover:scale-105'
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <div className='flex items-center gap-3 border-2 border-[#F39C12] rounded-full p-2'>
                          <button
                            onClick={() => minusItems(item?.id)}
                            className='px-3 py-1 text-[#F39C12] font-semibold rounded-full hover:bg-[#F39C12] hover:text-white transition-all duration-300 transform hover:scale-110'
                          >
                            <Icon icon="ic:baseline-minus" />
                          </button>
                          <span className='font-semibold text-[#F39C12] text-lg'>{item?.cartCount}</span>
                          <button
                            onClick={() => plusItems(item?.id)}
                            className='px-3 py-1 text-[#F39C12] font-semibold rounded-full hover:bg-[#F39C12] hover:text-white transition-all duration-300 transform hover:scale-110'
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

      {/* Pass the cartCount to AddCart component */}
      <AddCart cartCount={cartCount} />
    </div>
  );
}

export default Home;
