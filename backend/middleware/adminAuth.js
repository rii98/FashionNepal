import jwt from "jsonwebtoken"

const adminAuth=async(req,res,next)=>{
    try {
        const {token} = req.headers
        if(!token){
            return res.json({success:false,message:"Access denied. No token provided."})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if(decoded!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:"Access denied."})
        }
        next()
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

export default adminAuth