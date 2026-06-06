import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { config } from "../config/config.js";
async function sendTokenResponse(user, res, message) {
    const token = jwt.sign(
        {
            id: user._id,
        },
        config.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    )
    res.cookie("token", token);
    return res.status(200).json({
        message,
        success: true,
        user: {
            id: user.email,
            email: user.email,
            fullname: user.fullname,
            contact: user.contact,
            role: user.role
        }
    })
}
export const register = async (req, res) => {
    const { email, password, contact, fullname, isSeller } = req.body;
    try {
        const isUserExist = await userModel.findOne({
            $or: [
                { email },
                { contact }
            ]
        })
        if (isUserExist) {
            return res.status(400).json(
                "user already exists by email or contact by shri ji"
            )
        }
        const user = await userModel.create({
            email, contact, fullname, password, role: isSeller ? "seller" : "buyer"
        })
        await sendTokenResponse(user, res, "user registered successfully by shri ji");
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        await sendTokenResponse(user, res, "user logged in successfully");
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error" });
    }
}

export const googleCallback = async (req, res) => {
    // console.log(req.user);
    // ab humare liye sabse badi dikkat kya hai ki humein ek hi button hota hai continue with google and agar user pahle se loign nahi hoga toh login karwa denge 
    // else register karwa denge 
    // lekin iss feature ke hisab se humein user model mein changes karne hoge kaafi cheezein 
    // sabse pahle toh user model mein kaafi chhezein hai lkein humein user se toh sirf fullname and email hi milga toh baaki ka data kaise hum save karenge ya baaki ka data kaise milega
    // toh humein kuch cheezein optional karni hogi user model mein jaise ki contact, and password tab save karo jab user normally else hum ek googleId rakhege jo ki agar google se rigtere karein toh ab password save hi nahi karenege
    // humein user model mein googleId field bhi add karni hogi
    const {id,displayName,emails} = req.user;
    const email = emails[0].value;
    let user=await userModel.findOne({email});
    if(!user)
    {
        user=await userModel.create({
            email:email,
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
    res.redirect("http://localhost:5173/");
}