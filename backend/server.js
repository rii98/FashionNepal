import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCLoudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
dotenv.config();


//configuring app
const app = express();
const PORT = process.env.PORT || 3000;


//mongodb connection
connectDB()
//cloudinary connection
connectCLoudinary()

//middlewares
app.use(cors());
app.use(express.json());



//api end points 

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/api/payment',paymentRouter)

app.get("/", (req, res) => {
  res.send("Working");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`
)});
