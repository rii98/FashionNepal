import User from "../models/userModel.js"
import Product from "../models/productModel.js"


// add to cart
const addToCart=async(req,res)=>{
    try {
        const {userId,itemId,size}=req.body
        const user=await User.findById(userId)
        let cartData = await user.cartData
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1
            }else{
                cartData[itemId][size]=1
            }
        } else{
            cartData[itemId]={}
            cartData[itemId][size]=1
        }
        await User.findByIdAndUpdate(userId,{cartData})
        return res.json({success:true,message:"Product added to cart successfully"})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

// update cart
const updateCart=async(req,res)=>{
    try {
       const {userId,itemId,size,quantity}=req.body
       const user=await User.findById(userId)
       let cartData = await user.cartData
       cartData[itemId][size]=quantity
       await User.findByIdAndUpdate(userId,{cartData})
       return res.json({success:true,message:"Cart Updated"})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

// get the user cart
const getUserCart=async(req,res)=>{
    try {
      const {userId}=req.body
      const user=await User.findById(userId)
      return res.json({success:true,cartData:user.cartData})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

export{addToCart,updateCart,getUserCart}