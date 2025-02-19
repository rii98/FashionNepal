/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import useShopStore from "../store/shopStore";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { getCartCount, setShowSearch,token, setToken,clearCart } = useShopStore();
  const location = useLocation();
  const [visibleSearchIcon, setVisibleSearchIcon] = useState(false);


  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    clearCart()
    navigate("/login");
  };

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisibleSearchIcon(true);
    } else {
      setVisibleSearchIcon(false);
    }
  }, [location]);

  return (
    <div className="flex items-center justify-between py-5 font-medium  bg-white">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        className="w-36 cursor-pointer"
        alt=""
      />
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to={"/"} className="flex flex-col items-center gap-1">
          <p className="text-[16px]">Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to={"/collection"}
          className="flex flex-col items-center gap-1"
        >
          <p className="text-[16px]">Collection</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to={"/about"} className="flex flex-col items-center gap-1">
          <p className="text-[16px]">About</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to={"/contact"} className="flex flex-col items-center gap-1">
          <p className="text-[16px]">Contact</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        {visibleSearchIcon && (
          <img
            onClick={() => setShowSearch(true)}
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt=""
          />
        )}
        {token ? (
          <div className="group relative">
            <Link to={"/login"}>
              <img
                src={assets.profile_icon}
                className="w-5 cursor-pointer"
                alt=""
              />
            </Link>
            <div className="hidden group-hover:block absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p onClick={()=>navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                <p
                  onClick={() => logout()}
                  className="cursor-pointer hover:text-black"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="group relative">
            <Link to={"/login"}>
              <p className="text-[18px] mt-1">Sign in</p>
            </Link>
          </div>
        )}
        <Link to={"/cart"} className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] text-center leading-4  bg-black text-white w-4 aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>
      {/* Side bar for mobiles */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border "
            to={"/"}
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border "
            to={"/collection"}
          >
            Collection
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border "
            to={"/about"}
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border "
            to={"/contact"}
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
