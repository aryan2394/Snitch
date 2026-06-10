import jwt from "jsonwebtoken"
import { config } from "../config/config.js";
async function generateToken(user,res,message,statusCode)
{
    const token=jwt.sign(
        {
            id:user._id,
        },
        config.JWT_SECRET,
        {
            expiresIn:"7d"
        }
    )
    res.cookie("token",token);
    return res.status(statusCode).json({
        status:true,
        message,
        user
    })
}
export default generateToken;