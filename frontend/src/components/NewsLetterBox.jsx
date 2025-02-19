/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

const NewsLetterBox = () => {

    const [email,setEmail]=useState("")

    const onSubmitHandler=(e)=>{
        e.preventDefault();
        setEmail("")
    }

  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 25% off</p>
      <p className='text-gray-400 mt-3'>Sign up today to receive exclusive deals and special offers</p>
      <form onSubmit={onSubmitHandler} className='flex w-full sm:w-1/2 items-center gap-3 mx-auto my-6 border pl-3'>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Enter your email' className='w-full outline-none sm:flex-1' required />
        <button type='submit' className='bg-black text-white text-xs px-10 py-4 cursor-pointer'>Subscribe</button>
      </form>
    </div>
  )
}

export default NewsLetterBox
