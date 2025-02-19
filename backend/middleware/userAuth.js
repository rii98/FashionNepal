import jwt from "jsonwebtoken"

const userAuth = async(req,res,next)=>{
    try {
            const {token} = req.headers; 
            if(!token){
                return res.json({success:false,message:"Access denied. No token provided."})
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.body.userId=decoded.id
            next()
        } catch (error) {
            return res.json({success:false,message:error.message})
        }
}

export default userAuth