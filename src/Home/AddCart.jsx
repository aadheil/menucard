import React from 'react';
import { Icon } from '@iconify/react'; 

function AddCart({ cartCount }) {
  return (
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
          <Icon icon="fluent:cart-24-regular" className="text-3xl text-[#F39C12]" onClick={() => alert('Navigating to Cart...')} />
          
          {/* Cart item count */}
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>
          )}

          <span className="text-sm text-[#F39C12] mt-1">Cart</span>
        </div>
      </div>
    </div>
  );
}

export default AddCart;
