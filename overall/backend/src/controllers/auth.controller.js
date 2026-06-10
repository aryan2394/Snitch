import userModel from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
export async function register(req,res)
{
    try{
        const {email,password,fullName,contact,isSeller}=req.body;
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
            fullName,
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