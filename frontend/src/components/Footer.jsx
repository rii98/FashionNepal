/* eslint-disable no-unused-vars */
import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            Discover fashion that speaks to you. From casual chic to statement
            pieces, find everything you need to stay ahead of the trends.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+977-9600000000</li>
            <li>fashionnepal@gmail.com</li>
          </ul>
        </div>
        
      </div>
      <div>
          <hr />
          <p className="py-5 text-sm text-center ">
            Copyright {new Date().getFullYear()}@ fashionnepal.com - All Rights
            Reserved
          </p>
        </div>
    </div>
  );
};

export default Footer;
