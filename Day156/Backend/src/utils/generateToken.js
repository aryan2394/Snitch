import jwt from "jsonwebtoken";
import {config} from "../config/config.js";
export async function generateToken(user,res,message,statusCode)
{
    try
    {
        const token=jwt.sign(
            {
                id:user._id,
            },
            config.JWT_SECRET,
            {
                expiresIn: "1h"
            }

        );
        res.cookie("token",token);
        return res.status(statusCode).json({
            message,
            success:true,
            user:{
                id:user._id,
                email:user.email,
                fullname:user.fullname,
                contact:user.contact,
                role:user.role
            },
            token
        });
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:"Internal server error"});
    }
}