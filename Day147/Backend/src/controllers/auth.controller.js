import userModel from "../models/user.model.js";
import {generateToken} from "../utils/generateToken.js";
export const register=async(req,res)=>
{
    const {email,contact,password,fullname,isSeller}=req.body;
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
            fullname,
            role:isSeller?"seller":"buyer"
        })
        await generateToken(user,res,"User registered successfully",201);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:"Internal server error"});
    }
}
export async function login(req,res)
{
    const {email,password}=req.body;
    try
    {
        const user=await userModel.findOne({email});
        if(!user)
        {
            return res.status(400).json({message:"Invalid email or password"});
        }
        const isMatch=await user.comparePassword(password);
        if(!isMatch)
        {
            return res.status(400).json({message:"Invalid email or password"});
        }
        await generateToken(user,res,"Login successful",200);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:"Internal server error"});
    }
}
export const googleCallback=async(req,res)=>
{
    // console.log(req.user);
    const {id,displayName,emails}=req.user;
    const email=emails[0].value;
    let user=await userModel.findOne({email});
    if(!user)
    {
        user=await userModel.create({
            email,
            fullname:displayName,
            googleId:id
        })
    }
    const token=jwt.sign(
            {
                id:user._id,
                email:user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"7d"
            }
        )
    res.cookie("token",token);
    return res.redirect("http://localhost:5173/");
}
