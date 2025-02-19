
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import useShopStore from "../store/shopStore";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollections = () => {
  const { products } = useShopStore();
  const [latestProducts,setLatestProducts]=useState([])

  useEffect(()=>{
    setLatestProducts(products.slice(-10))
  },[products])

  return (
    <div className="my-10 ">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our latest collection arrivals—fresh styles, bold designs.
          Elevate your wardrobe with the newest trends today!
        </p>
      </div>
        {/* Latest products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {latestProducts.map((lp,index)=>{
            return(
              <ProductItem key={index} id={lp._id} image={lp.image} price={lp.price} name={lp.name} />
            )
          })}
        </div>
    </div>
  );
};

export default LatestCollections;
