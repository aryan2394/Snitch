import userModel from "../models/user.model.js";
import sendToken from "../utils/sendToken.js";
export async function register(req,res)
{
    const {fullname,email,password,contact,isSeller}=req.body;
    const isUser=await userModel.findOne({email});
    if(isUser)
    {
        return res.status(400).json({message:"User already exists"});
    }
    const user=await userModel.create({
        fullname,
        email,
        password,
        contact,
        role:isSeller?"seller":"buyer",
    });
    await sendToken(user,res,201,"User registered successfully"); 
    
}
export async function login(req,res)
{
    const {email,password}=req.body;
    const user=await userModel.findOne({email}).select("+password");
    if(!user)
    {
        return res.status(404).json({message:"User not found"})
    }
    const isPasswordMatch=await user.comparePassword(password);
    if(!isPasswordMatch)
    {
        return res.status(401).json({message:"Invalid credentials"})
    }
    await sendToken(user,res,200,"User logged in successfully")
}
export async function getMe(req,res)
{
    const user=req.user;
    return res.status(200).json({
        message:"User fetched successfully",
        success:true,
        user
    })
}
