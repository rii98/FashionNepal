/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import useShopStore from "../store/shopStore";
import Title from "../components/Title";
import { toast } from "react-toastify";
import axios from "axios";

const Orders = () => {
  const { token, currency } = useShopStore();
  const url = import.meta.env.VITE_BACKEND_URL;
  const [orderData, setOrderData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/user-orders`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let myOrders = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            myOrders.push(item);
          });
        });
        setOrderData(myOrders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {orderData.map((product, index) => {
          return (
            <div
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              key={index}
            >
              <div className="flex items-start gap-6 text-sm">
                <img className="w-16 sm:w-20" src={product.image[0]} alt="" />
                <div>
                  <p className="text-base font-medium">{product.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p className="text-lg">
                      {currency}{product.price + 40}
                    </p>
                    <p>{product.quantity}</p>
                    <p>Size: {product.size}</p>
                  </div>
                  <p className="mt-2">Date:{" "}<span className="text-gray-400">{new Date(product.date).toLocaleString()}</span></p>
                  <p className="mt-2">Payment:{" "}<span className="text-gray-400">{product.paymentMethod==="cod"?"Cash on Delivery":product.paymentMethod}</span></p>
                  
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{product.status}</p>
                </div>
                <button onClick={fetchOrders} className="cursor-pointer border px-4 py-2 text-sm font-medium rounded-sm ">
                  Track Order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
