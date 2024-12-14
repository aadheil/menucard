import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 text-gray-800 flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full backdrop-blur-lg bg-white/30 shadow-md z-10 px-6 md:px-12 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F39C12] to-[#e67e22]">
          Tablebite
        </h1>
        <button className="px-6 py-2 bg-gradient-to-r from-[#F39C12] to-[#e67e22] text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
          Get Started <Icon icon="bi:arrow-right" className="w-5 h-5" />
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 md:px-16 mt-20 md:mt-28 text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#F39C12] to-[#e67e22]">
          Redefining Luxury Dining Experiences
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-lg">
          Transform your dining with Tablebite. Scan the QR code and enjoy a seamless, paperless menu experience tailored for luxury.
        </p>

        {/* QR Code Section */}
        <div className="relative group">
          <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 shadow-2xl hover:scale-105 transition-transform duration-300">
            <img
              src="https://via.placeholder.com/200"
              alt="QR Code"
              className="h-48 w-48 mx-auto animate-pulse"
            />
            <p className="text-gray-500 mt-4 text-sm">Scan to explore Tablebite</p>
          </div>
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-br from-[#F39C12] via-[#e67e22] to-transparent rounded-3xl blur-xl opacity-50 pointer-events-none"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 px-6 md:px-16 bg-gradient-to-br from-white via-gray-50 to-gray-200 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
          Why Choose Tablebite?
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          Our platform offers a premium dining experience that combines modern technology with elegance.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-12">
          {/* Feature Cards */}
          {["Effortless Scanning", "Paperless Menus", "Premium Design"].map((feature, index) => (
            <div
              key={index}
              className="bg-white/70 backdrop-blur-md rounded-lg shadow-lg p-6 w-72 text-left hover:shadow-2xl transition-all flex flex-col gap-4 items-start"
            >
             <Icon icon="fa-solid:check-circle" className="text-3xl text-[#F39C12]" />
              <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#F39C12] to-[#e67e22]">
                {feature}
              </h3>
              <p className="text-gray-600">
                {
                  feature === "Effortless Scanning"
                    ? "Quickly scan a QR code to access a full menu on your device."
                    : feature === "Paperless Menus"
                    ? "Eliminate paper waste while enjoying a premium dining interface."
                    : "Designed for elegance, ensuring a luxurious user experience."
                }
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-12 bg-gradient-to-br from-[#F39C12] to-[#e67e22] text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Experience the Future of Dining?</h2>
        <p className="text-lg max-w-xl mx-auto mb-8">
          Join hundreds of restaurants transforming their menus and elevating customer satisfaction.
        </p>
        <button className="px-8 py-4 bg-white text-[#F39C12] font-medium rounded-full shadow-lg hover:shadow-xl transition-all">
          Get Started Today
        </button>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 bg-gray-900 text-gray-100 text-center">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F39C12] to-[#e67e22]">
            Tablebite
          </h1>
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Tablebite. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;