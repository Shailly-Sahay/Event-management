import React from "react";

const Home: React.FC = () => {
  return (
    <section className="section-pd-x h-[80vh] grid grid-cols-[0.75fr_1fr] items-center justify-between bg-gradient-to-r from-[#fdfbfb] to-[#f5f7fa] backdrop-blur-md">
      {/* Left Content */}
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Event planning <br /> made easier for everyone
        </h1>
        <p className="text-gray-600 text-lg">
          GoPlanMe provides guidance and vendors for a variety of event types
          including funerals, birthday parties, family reunions.
        </p>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Start Your Search"
            className="w-full py-3 px-5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute right-4 top-3 text-gray-500">🔍</span>
        </div>
      </div>

      {/* Right Block - Placeholder for Image */}
      <div className="relative w-full  mt-10 md:mt-0 flex justify-center">
        <div className="rounded-lg flex items-center justify-center">
          <img src="/images/hero.png" alt="" />
        </div>
      </div>
    </section>
  );
};

export default Home;
