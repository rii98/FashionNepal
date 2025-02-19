/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React,{useEffect, useState} from 'react'
import useShopStore from '../store/shopStore'
import Title from "../components/Title"
import ProductItem from "../components/ProductItem"

const RelatesProducts = ({category,subCategory}) => {
    const {products}=useShopStore()
    const [related,setRelated]=useState([])

    useEffect(()=>{
        if(products.length>0){
            let productsCopy=products.slice()
            productsCopy=productsCopy.filter((item)=>category===item.category)
            productsCopy=productsCopy.filter((item)=>subCategory===item.subCategory)            
            setRelated(productsCopy.slice(0,5))
        }
    },[products])

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <Title text1={'RELATED'} text2={'PRODUCTS'}/>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-4'>
        {related.map((rp,index)=>{
            return(
                <ProductItem key={index} id={rp._id} name={rp.name} image={rp.image} price={rp.price} />
            )
        })}
      </div>
    </div>
  )
}

export default RelatesProducts
