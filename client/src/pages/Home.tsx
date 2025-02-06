import React from "react";
import { Button } from "../ui";
import { useAppContext } from "../context/AppContext";

const Home: React.FC = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <section className="section-pd-x h-full grid  lg:grid-cols-[0.75fr_1fr] gap-[8rem] items-center bg-gradient-to-r from-[#fdfbfb] to-[#f5f7fa] backdrop-blur-md">
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
        <div className="flex gap-12">
          <Button
            buttonType="secondary"
            label="View events"
            href="/events"
          ></Button>
          <Button
            label="Organize events"
            href={isLoggedIn ? "/events" : "/sign-in"}
          ></Button>
        </div>
      </div>

      {/* Right Block - Image Container */}
      <div className="relative w-full h-[70%] rounded-2xl overflow-hidden  flex justify-center">
        <div className="h-full flex items-center ml-auto">
          <img
            src="/images/hero.png"
            alt="Hero Image"
            className="h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
