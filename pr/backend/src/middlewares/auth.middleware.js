import userModel from "../models/user.model.js";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken"
export async function authenticateUser(req,res,next)
{
    const token=req.cookies.token;
    if(!token)
    {
        return res.status(401).json({message:"Unauthorized"})
    }
    try
    {
        const decoded=jwt.verify(token,config.JWT_SECRET);
        const user=await userModel.findById(decoded.id);
        if(!user)
        {
            return res.status(404).json({message:"User not found"})
        }
        req.user=user;
        next();
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:"Internal server error"});
    }
}
export async function authenticateSeller(req,res,next)
{
    const token=req.cookies.token;
    if(!token)
    {
        return res.status(401).json({message:"Unauthorized"})
    }
    try
    {
        const decoded=jwt.verify(token,config.JWT_SECRET);
        const user=await userModel.findById(decoded.id);
        if(!user)
        {
            return res.status(404).json({message:"User not found"})
        }
        if(user.role!=="seller")
        {
            return res.status(403).json({message:"User is not a seller"})
        }
        req.user=user;
        next();
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:"Internal server error"});
    }
}