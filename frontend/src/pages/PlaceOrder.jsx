/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Title from "../components/Title"
import CartTotal from "../components/CartTotal"
import { assets } from '../assets/assets'
import {useNavigate} from "react-router-dom"
import { toast } from 'react-toastify'
import axios from 'axios'
import useShopStore from '../store/shopStore'

const PlaceOrder = () => {
  const {token,cartItems,clearCart,getCartAmount,delivery_fee,products}=useShopStore()
  const [method,setMethod]=useState("cod")
  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:'',
  })
  const url = import.meta.env.VITE_BACKEND_URL

  const onChangeHandler=(e)=>{
    setData((prevData)=>({...prevData,[e.target.name]:e.target.value}))
  }

  const navigate = useNavigate()

  const onSubmitHandler=async(e)=>{
    e.preventDefault()
    try {
      let orderItems=[]
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item]>0){
            const itemInfo=structuredClone(products.find(product=>product._id===items))
            if(itemInfo){
              itemInfo.size=item
              itemInfo.quantity=cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      } 
      let orderData={
        items:orderItems,
        address:data,
        amount:getCartAmount()+delivery_fee
      }     
      switch (method) {
        case "cod":
          const response= await axios.post(`${url}/api/order/place`,orderData,{headers:{token}})
          if(response.data.success){
            clearCart()
            navigate('/orders')
            toast.success(response.data.message)
          }else{
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

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 min-h-[80vh] border-t '>
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
          <CartTotal/>
        </div>
        <div className='mt-12'>
          <Title text1={"PAYMENT"} text2={"METHOD"}/>
          <div  className='flex gap-3 flex-col sm:flex-row'>
            <div onClick={()=>setMethod("stripe")} className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border border-gray-200 rounded-full ${method==="stripe"?'bg-green-500':''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={()=>setMethod("esewa")} className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border border-gray-200 rounded-full ${method==="esewa"?'bg-green-500':''}`}></p>
              <img className='h-6 mx-4' src={assets.esewa_logo} alt="" />
            </div>
            <div onClick={()=>setMethod("cod")} className='flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border border-gray-200 rounded-full ${method==="cod"?'bg-green-500':''}`}></p>
              <p className='text-gray-500 text-sm font-medium '>Cash on Delivery</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button type='submit'  className='cursor-pointer bg-black text-white text-sm px-16 py-3'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
