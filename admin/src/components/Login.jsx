/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import axios from "axios"

const Login = ({setToken}) => {
    const url=import.meta.env.VITE_BACKEND_URL

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const onSubmitHandler=async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/api/user/admin-login`,{email,password})
            if(response.data.success){
                setToken(response.data.token)
                toast.success("Logged in successfully")
                setEmail("")
                setPassword("")
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <div className='flex justify-center min-h-screen items-center w-full'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Admin Pannel</h1>
        <form onSubmit={onSubmitHandler}>
            <div className='mb-3 min-w-72 '>
                <p className='text-sm font-medium text-gray-700 mb-2 '>Email Address</p>
                <input required onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none ' type="email" placeholder='sample@gmail.com' />
            </div>
            <div className='mb-3 min-w-72 '>
                <p className='text-sm font-medium text-gray-700 mb-2 '>Password</p>
                <input required onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none ' type="password" placeholder='Enter password' />
            </div>
            <button className='cursor-pointer mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
