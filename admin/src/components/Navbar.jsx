/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import {assets} from "../assets/assets"
import { useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"

const Navbar = ({setToken}) => {
  const navigate=useNavigate()
  const logout=()=>{
    localStorage.removeItem('token')
    navigate('/')
    setToken("")
    toast.success("Logged out successfully")
  }
  return (
    <div className='flex justify-between items-center py-2 px-[4%]  '>
      <img onClick={()=>navigate('/') } className=' cursor-pointer w-[max(10%,80px)]' src={assets.logo} alt="" />
      <button onClick={()=>logout()} className='cursor-pointer bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar
