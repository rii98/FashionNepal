/* eslint-disable no-unused-vars */
import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row  items-center h-[80vh] bg-gradient-to-r from-gray-100 to-gray-300 rounded-4xl'>
      {/* Left section */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141]'>
            <div className='flex items-center gap-2'>
                <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                <p className='font-medium text-sm md:text-2xl'>ELEVATE YOUR STYLE</p>
            </div>
            <h1 className='text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Trendy. Chic. Timeless.</h1>
            <div className='flex items-center gap-2'>
                <p className='font-semibold text-sm md:text-2xl'>SHOP THE LOOK</p>
                <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            </div>
        </div>
      </div>
      {/* Right section with circular image */}
      <div className='w-full sm:w-1/2 flex justify-center items-center'>
        <img src={assets.hero_img} className='w-72 h-72 sm:w-96 sm:h-96 rounded-full object-cover' alt="" />
      </div>
    </div>
  )
}

export default Hero
