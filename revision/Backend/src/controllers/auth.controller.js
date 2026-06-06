import userModel from "../models/user.model.js";
import {generateToken} from "../utils/generateToken.js";
export const register=async(req,res)=>
{
    const {email,contact,password,fullname}=req.body;
    try
    {
        const userExists=await userModel.findOne({
            $or:[{email},{contact}]
        })
        if(userExists)        {
            return res.status(400).json({message:"User with this email or contact already exists"});
        }
        const user=await userModel.create({
            email,
            contact,
            password,
            fullname
        })
        await generateToken(user,res,"User registered successfully",201);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:"Internal server error"});
    }
}