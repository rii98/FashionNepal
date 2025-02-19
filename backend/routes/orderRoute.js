import express from "express"
import { displayAllOrders, displayUserOrders, placeOrder, placeOrderEsewa, placeOrderStripe, updateOrderStatus } from "../controllers/orderController.js"
import userAuth from "../middleware/userAuth.js"
import adminAuth from "../middleware/adminAuth.js"


const orderRouter=express.Router()

//payment
orderRouter.post('/place',userAuth,placeOrder)
orderRouter.post('/place-stripe',userAuth,placeOrderStripe)
orderRouter.post('/place-esewa',userAuth,placeOrderEsewa)


//Admin
orderRouter.post('/list',adminAuth,displayAllOrders)
orderRouter.post('/status',adminAuth,updateOrderStatus)

//user
orderRouter.post('/user-orders',userAuth,displayUserOrders)

export default orderRouter
