import userModel from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
export async function register(req,res)
{
    try{
        const {email,password,fullname,contact,isSeller}=req.body;
        const isUserExist=await userModel.findOne({email});
        if(isUserExist)
        {
            return res.status(400).json({
                status:false,
                message:"User already exists"
            })
        }
        const user=await userModel.create({
            email,
            password,
            fullname,  
            contact,
            role:isSeller?"seller":"buyer",
        });
        await generateToken(user,res,"new user register successfully",201); 
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            status:false,
            message:"Internal server error"
        })
    }
}
export async function login(req,res)
{
    try {
        const {email,password}=req.body;
        const user=await userModel.findOne({email});
        if(!user)
        {
            return res.status(404).json({
                status:false,
                message:"User not found"
            })
        }
        const isPasswordValid=await user.comparePassword(password);
        if(!isPasswordValid)
        {
            return res.status(401).json({
                status:false,
                message:"Invalid password"
            })
        }
        await generateToken(user,res,"User logged in successfully",200);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status:false,
            message:"Internal server error"
        })
    }
}
export async function getMe(req,res)
{
    try{
        const user=req.user;
        return res.status(200).json({
            status:true,
            message:"User data fetched successfully",
            user
        })
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({
            status:false,
            message:"Internal server error"
        })
    }
}
export async function googleCallback(req,res)
{
    try {
        const {id,displayName,emails}=req.user; 
        const email=emails[0].value;

        let user = await userModel.findOne({ email });

        if (!user) {
            user = await userModel.create({
                email,
                fullname: displayName,
                googleId: id,
                role: "pending",
            });
        }

        const token = jwt.sign(
            { id: user._id },
            config.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        return res.redirect("http://localhost:5173");
    } catch (error) {
        console.error("Google Callback Error:", error);
        return res.redirect("http://localhost:5173/login?error=auth_failed");
    }
}

export async function updateRole(req, res)
{
    try {
        const { role } = req.body;

        if (!["buyer", "seller"].includes(role)) {
            return res.status(400).json({
                status: false,
                message: "Invalid role selected",
            });
        }

        const user = await userModel.findByIdAndUpdate(
            req.user._id,
            { role },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            status: true,
            message: "Role updated successfully",
            user,
        });
    } catch (error) {
        console.error("Update Role Error:", error);
        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
} 