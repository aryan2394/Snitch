import jwt from "jsonwebtoken"
import {config} from "../config/config.js";
async function sendToken(user,res,status,message)
{
    const token=jwt.sign(
        {
            id:user._id,
        },
        config.JWT_SECRET,
        {
            expiresIn:"1h"
        }
    )
    res.cookie("token",token);
    return res.status(status).json({
        message,
        success:true,
        user:{
            id:user._id,
            email:user.email,
            fullname:user.fullname,
            role:user.role
        },
        token
    });
} 
export default sendToken;