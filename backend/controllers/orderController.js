import User from "../models/userModel.js"
import Order from "../models/orderModel.js"

//Placing Orders
const placeOrder=async(req,res)=>{
    try {
       const {userId,amount,address,items}=req.body
       const orderData={
        userId:userId,
        amount:amount,
        address:address,
        items:items,
        paymentMethod:"cod",
        payment:false,
        date:Date.now()
       }
       const newOrder= new Order(orderData)
       await newOrder.save()
       await User.findByIdAndUpdate(userId,{cartData:{}})
       res.json({success:true,message:"Order Placed Successfully"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

//place order using stripe
const placeOrderStripe = async(req,res)=>{

}

//place order using esewa
const placeOrderEsewa = async(req,res)=>{
    console.log("inside placeorderesewa controller")
    try {
        const {userId,amount,address,items}=req.body
        const orderData={
         userId:userId,
         amount:amount,
         address:address,
         items:items,
         paymentMethod:"esewa",
         payment:true,
         date:Date.now()
        }
        const newOrder= new Order(orderData)
        await newOrder.save()
        await User.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true,message:"Order Placed Successfully"})
     } catch (error) {
         res.json({success:false,message:error.message})
     }
}

//display orders for admin
const displayAllOrders = async(req,res)=>{
    try {
        const orders=await Order.find({}) 
        res.json({success:true,orders})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

//display orders for user
const displayUserOrders = async(req,res)=>{
    try {
        const {userId}=req.body
        const orders=await Order.find({userId:userId})
        res.json({success:true,orders})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

//update order status
const updateOrderStatus = async(req,res)=>{
    try {
        const {orderId,orderStatus}=req.body
        await Order.findByIdAndUpdate(orderId,{status:orderStatus})
        res.json({success:true,message:"Status updated successfully"})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}


export {placeOrder,placeOrderEsewa,placeOrderStripe,displayAllOrders,displayUserOrders,updateOrderStatus}