/* eslint-disable no-unused-vars */
import React from 'react'
import Title from "../components/Title"
import { assets } from '../assets/assets'
import NewsLetterBox from "../components/NewsLetterBox"

const Contact = () => {
  return (
    <div>
      <div className='border-t text-center pt-10 text-2xl'>
         <Title text1={"CONTACT"} text2={"US"}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[450px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store kere kha</p>
          <p className='text-gray-500'> Boudha <br/>Kathmandu, Nepal </p>
          <p className='text-gray-500'>Tel: 986000000 <br />Email: fashionnepal@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Fashion Nepal</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 hover:bg-black hover:text-white cursor-pointer transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  )
}

export default Contact
