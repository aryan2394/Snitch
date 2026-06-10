import jwt from "jsonwebtoken"
import { config } from "../config/config.js"
export async function authenticateUser(req,res,next)
{
    try{
        const token=req.cookies.token;
        if(!token)
        {
            return res.status(401).json({
                status:false,
                message:"Unauthorized"
            })
        }
        const decode=jwt.verify(token,config.JWT_SECRET);
        const user=await userModel.findById(decode.id).select("-password");
        if(!user)
        {
            return res.status(404).json({
                status:false,
                message:"User not found"
            })
        }
        req.user=user;
        next();
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json({
            status:false,
            message:"Internal server error"
        })
    }
}
