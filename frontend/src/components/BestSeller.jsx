/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import useShopStore from "../store/shopStore";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useShopStore();
  const [bestSeller,setBestSeller]=useState([])

  useEffect(()=>{
    const bestSeller=products.filter((product)=>product.bestSeller)
    setBestSeller(bestSeller.slice(0,5))
  },[products])
  return (
    <div className="my-10 ">
      <div className="text-center py-8 text-3xl">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Explore our best sellers—timeless favorites, iconic designs. Upgrade
          your style with the most-loved pieces today!
        </p>
      </div>
      {/* best seller products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((bs, index) => {
          
            return (
              <ProductItem
                key={index}
                id={bs._id}
                image={bs.image}
                price={bs.price}
                name={bs.name}
              />
            );
        })}
      </div>
    </div>
  );
};

export default BestSeller;
