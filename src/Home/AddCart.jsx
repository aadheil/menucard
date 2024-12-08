import { Icon } from '@iconify/react';
import React, { useState } from 'react';

function AddCart({ cartCount = 0, cartItems = [] }) {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <>
      {/* Fixed bottom navigation */}
      <div className="fixed bottom-0 w-full h-20 bg-white drop-shadow-2xl z-50 flex items-center justify-around px-4 rounded-t-lg border-t border-gray-200">
        <div className="flex justify-between w-full max-w-lg items-center">
          
          {/* Home Icon */}
          <div className="flex flex-col items-center cursor-pointer p-3 transition-all duration-300 ease-in-out hover:text-[#F39C12] hover:scale-110">
            <Icon icon="mdi:home" className="text-3xl text-[#F39C12]" onClick={() => alert('Navigating to Home...')} />
            <span className="text-sm text-[#F39C12] mt-1">Home</span>
          </div>

          {/* Search Icon */}
          <div className="flex flex-col items-center cursor-pointer p-3 transition-all duration-300 ease-in-out hover:text-[#F39C12] hover:scale-110">
            <Icon icon="mdi:magnify" className="text-3xl text-[#F39C12]" onClick={() => alert('Navigating to Search...')} />
            <span className="text-sm text-[#F39C12] mt-1">Search</span>
          </div>

          {/* Profile Icon */}
          <div className="flex flex-col items-center cursor-pointer p-3 transition-all duration-300 ease-in-out hover:text-[#F39C12] hover:scale-110">
            <Icon icon="mdi:account" className="text-3xl text-[#F39C12]" onClick={() => alert('Navigating to Profile...')} />
            <span className="text-sm text-[#F39C12] mt-1">Profile</span>
          </div>

          {/* Cart Icon with cart count */}
          <div className="flex flex-col items-center cursor-pointer p-3 transition-all duration-300 ease-in-out hover:text-[#F39C12] hover:scale-110 relative">
            <Icon icon="fluent:cart-24-regular" className="text-3xl text-[#F39C12]" onClick={togglePopup} />
            
            {/* Cart item count */}
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>
            )}

            <span className="text-sm text-[#F39C12] mt-1">Cart</span>
          </div>
        </div>
      </div>

      {/* Cart Popup */}
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-lg p-4">
            <h2 className="text-lg font-bold mb-4">Your Cart</h2>
            {cartItems.length > 0 ? (
              <ul>
                {cartItems.map((item, index) => (
                  <li key={index} className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-md font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-md font-bold">${item.price.toFixed(2)}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            )}

            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded-md mr-2"
                onClick={togglePopup}
              >
                Close
              </button>
              <button
                className="bg-[#F39C12] text-white px-4 py-2 rounded-md"
                onClick={() => alert('Proceeding to Checkout...')}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddCart;
