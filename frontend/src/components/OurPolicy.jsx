/* eslint-disable no-unused-vars */
import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        <img src={assets.exchange_icon} className="m-auto w-12 mb-5" alt="" />
        <p className="font-semibold">Hassle-Free Exchange</p>
        <p className="text-gray-400">
          Enjoy a seamless exchange process with us
        </p>
      </div>
      <div>
        <img src={assets.quality_icon} className="m-auto w-12 mb-5" alt="" />
        <p className="font-semibold">7-Day Free Returns</p>
        <p className="text-gray-400">
          Return your purchase within 7 days, no questions asked
        </p>
      </div>
      <div>
        <img src={assets.support_img} className="m-auto w-12 mb-5" alt="" />
        <p className="font-semibold">24/7  Customer Assistance</p>
        <p className="text-gray-400">
          Our support team is always here to help you
        </p>
      </div>
    </div>
  );
};

export default OurPolicy;
