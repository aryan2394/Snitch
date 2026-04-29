import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { config } from "../config/config.js";
async function sendTokenResponse(user,res)
{
    const token =jwt.sign(
        {
            id:user._id,
        },
        config.JWT_SECRET
    )
}
export const register=async (req,res)=>
{
    const {email,password,contact,fullname}=req.body;
    const isUserExist=await userModel.findOne({
        $or:[
            {email},
            {contact}
        ]
    })
    if(isUserExist)
    {
        return res.status(400).json(
            "user already exists by email or contact by shri ji"
        )
    }
    const user=await userModel.create({
        email,contact,fullname,password
    })
}