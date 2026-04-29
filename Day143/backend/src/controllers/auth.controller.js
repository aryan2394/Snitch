import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { config } from "../config/config.js";
async function sendTokenResponse(user,res,message)
{
    const token =jwt.sign(
        {
            id:user._id,
        },
        config.JWT_SECRET,
        {
            expiresIn:"7d"
        }
    )
    res.cookie("token",token);
    return res.status(200).json({
        message,
        success:true,
        user:{
            id:user.email,
            email:user.email,
            fullname:user.fullname,
            contact:user.contact,
            role:user.role
        }
    })
}
export const register=async (req,res)=>
{
    const {email,password,contact,fullname,isSeller}=req.body;
    try {
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
        email,contact,fullname,password,role:isSeller?"seller":"buyer"
    })
    await sendTokenResponse(user,res,"user registered successfully by shri ji");
}
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const login=async (req,res)=>
{
    const {email,password}=req.body;
    try {
        const user=await userModel.findOne({email});
        if(!user)
        {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch=await user.comparePassword(password);
        if(!isMatch)
        {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        await sendTokenResponse(user, res, "user logged in successfully");
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error" });
    }
}