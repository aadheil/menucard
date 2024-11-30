import React from 'react';
import { Icon } from '@iconify/react'; // Import Iconify's Icon component

function AddCart() {
  return (
    <div className="fixed bottom-0 w-full h-20 bg-gray-50 drop-shadow-2xl shadow-2xl z-50 flex items-center justify-around px-4 rounded-t-lg border-t border-gray-200">
      {/* Home and Category Icons */}
      <div className="flex items-center space-x-16">
        {/* Home Icon */}
        <div className="flex flex-col items-center cursor-pointer">
          <Icon icon="mdi:home" className="text-2xl text-gray-700 hover:text-black" />
          <span className="text-sm text-gray-600">Home</span>
        </div>

        {/* Category Icon */}
        {/* <div className="flex flex-col items-center cursor-pointer">
          <Icon icon="mdi:apps" className="text-2xl text-gray-700 hover:text-black" />
          <span className="text-sm text-gray-600">Category</span>
        </div> */}
      </div>

      {/* View Cart Button */}
      <button
        onClick={() => alert('Navigating to Cart...')}
        className="bg-[#F39C12] flex items-center gap-2 text-white px-6 py-2 rounded-lg hover:bg-[#f39d12e1] transition-all"
      >
        <span>View Cart</span>
        <Icon icon="fluent:cart-24-regular" width="24" height="24" />
      </button>
    </div>
  );
}

export default AddCart;
