import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator"

//register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: true, message: "All fields are required" });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.json({ success: false, message: "User already exist" });
    }
    if(!validator.isEmail(email)){
        return res.json({ success: false, message: "Invalid email" });
    }
    if(password.length<8){
        return res.json({ success: false, message: "Password must be at least 8 characters"})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const user=await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY)
    return res.json({success:true,token})
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//login
const loginUser = async (req, res) => {
    try{
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
            return res.json({success:false,message:"User not found"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"Invalid password"})
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY)
        return res.json({success:true,token})
    }catch(error){
        return res.json({ success: false, message: error.message });
    }
};

//admin login
const loginAdmin = async (req, res) => {
    try {
      const {email,password}=req.body
      if((email===process.env.ADMIN_EMAIL)&&(password==process.env.ADMIN_PASSWORD)){
         const token = jwt.sign(email+password,process.env.JWT_SECRET_KEY)
         return res.json({success:true,token})
      }else{
        return res.json({success:false,message:"Invalid admin credentials"})
      }
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
};

export { loginUser, registerUser, loginAdmin };
