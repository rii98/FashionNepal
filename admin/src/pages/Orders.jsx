/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../assets/assets";
import {currency} from "../App"

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const url = import.meta.env.VITE_BACKEND_URL;

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateOrderStatus=async(orderId,e)=>{
    try {
      const response = await axios.post(`${url}/api/order/status`,{orderId,orderStatus: e.target.value},{headers:{token}})
      if(response.data.success){
        toast.success(response.data.message)
        await fetchOrders()
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div>
      <h3>All Orders</h3>
      <div>
        {orders.map((order, index) => {
          return (
            <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 md:my-4 text-xs sm:text-sm text-gray-700 " key={index}>
              <img className="w-12" src={assets.parcel_icon} alt="" />
              <div>
                <div>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return (
                        <p className="py-0.5" key={index}>
                          {item.name} x {item.quantity}{" "}
                          <span>Size:{item.size}</span>
                        </p>
                      );
                    } else {
                      return (
                        <p className="py-0.5" key={index}>
                          {item.name} x {item.quantity}{" "}
                          <span>Size:{item.size}</span>,
                        </p>
                      );
                    }
                  })}
                </div>
                <p className="mt-3 mb-2 font-medium">{order.address.firstName + " " + order.address.lastName}</p>
                <div>
                  <p>{order.address.street + ","}</p>
                  <p>
                    {order.address.city +
                      "," +
                      order.address.state +
                      "," +
                      order.address.country +
                      "," +
                      order.address.zipcode}
                  </p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
                <p className="mt-3">Method: {order.paymentMethod==="cod"?"Cash on Delivery":order.paymentMethod}</p>
                <p>Payment:{order.payment?" Done":" Pending"}</p>
                <p>Date:{new Date(order.date).toLocaleString()}</p>
              </div>
              <p className="text-sm sm:text-[15px]">{currency}{order.amount}</p>
              <select value={order.status} onChange={(e)=>updateOrderStatus(order._id,e)} className="p-2 font-semibold">
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
