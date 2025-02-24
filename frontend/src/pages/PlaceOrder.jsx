/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Truck } from 'lucide-react';
import Title from "../components/Title"
import CartTotal from "../components/CartTotal"
import { assets } from '../assets/assets'
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import axios from 'axios'
import useShopStore from '../store/shopStore'
import { GenerateSignature } from '../utils/GenerateSignature.js';


const PlaceOrder = () => {
  const { token, cartItems, clearCart, getCartAmount, delivery_fee, products } = useShopStore();
  const transaction_uuid = Date.now().toString()
  const baseURL = import.meta.env.VITE_BACKEND_URL


  const [method, setMethod] = useState("cod")
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })
  const url = import.meta.env.VITE_BACKEND_URL

  const onChangeHandler = (e) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    localStorage.setItem('orderAddress', JSON.stringify(data));
  }

  const navigate = useNavigate()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      let orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      let orderData = {
        items: orderItems,
        address: data,
        amount: getCartAmount() + delivery_fee
      }
      switch (method) {
        case "cod":
          const response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } })
          if (response.data.success) {
            clearCart()
            navigate('/orders')
            toast.success(response.data.message)
          } else {
            toast.error(response.data.message)
          }
          break;

        default:
          break;
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const totalAmount = getCartAmount() + delivery_fee
  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 min-h-[80vh] border-t '>
      {/* left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className='flex gap-3'>
          <input name='firstName' onChange={onChangeHandler} value={data.firstName} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
          <input name='lastName' onChange={onChangeHandler} value={data.lastName} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
        </div>
        <input name='email' onChange={onChangeHandler} value={data.email} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address ' />
        <input name='street' onChange={onChangeHandler} value={data.street} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street ' />
        <div className='flex gap-3'>
          <input name='city' onChange={onChangeHandler} value={data.city} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input name='state' onChange={onChangeHandler} value={data.state} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
          <input name='country' onChange={onChangeHandler} value={data.country} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
        </div>
        <input name='phone' onChange={onChangeHandler} value={data.phone} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
      </div>
      {/* Right side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className='flex gap-3 flex-col sm:flex-row'>
            <div className="flex flex-col gap-4 p-4 bg-white rounded-2xl shadow-md">
              {/* Esewa Payment Button */}
              <p className='text-sm text-pretty'>For testing Esewa: <br />eSewa ID: 9806800001 Password/MPIN: 1122 Token/OTP:123456</p>
              <form id="esewaForm" action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
                <input type="hidden" name="amount" value={totalAmount} />
                <input type="hidden" name="tax_amount" value="0" />
                <input type="hidden" name="total_amount" value={totalAmount} />
                <input type="hidden" name="transaction_uuid" value={transaction_uuid} />
                <input type="hidden" name="product_code" value="EPAYTEST" />
                <input type="hidden" name="product_service_charge" value="0" />
                <input type="hidden" name="product_delivery_charge" value="0" />
                <input type="hidden" name="success_url" value={`${baseURL}/api/payment/esewa/success`} />
                <input type="hidden" name="failure_url" value={`${baseURL}/api/payment/esewa/failure`} />
                <input type="hidden" name="signed_field_names" value="total_amount,transaction_uuid,product_code" />
                <input type="hidden" name="signature" value={GenerateSignature(`total_amount=${totalAmount},transaction_uuid=${transaction_uuid},product_code=EPAYTEST`)} />
                <button type="submit" className="flex justify-center items-center w-full border-2 border-green-500 rounded-lg transition hover:bg-green-100">
                  <img src={assets.esewa_logo} alt="eSewa" className="w-20 h-full object-contain" />
                  <p>Pay with eSewa</p>
                </button>
              </form>


              {/* Cash on Delivery Button */}
              <button
                size="sm"
                onClick={onSubmitHandler}
                className="flex items-center justify-center gap-2 bg-gray-800 text-white hover:bg-gray-900 transition rounded-lg py-3"
              >
                <Truck className="w-5 h-5" />
                <span >Cash on Delivery</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
