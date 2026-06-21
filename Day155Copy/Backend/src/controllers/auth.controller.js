import userModel from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken"
export const register = async (req, res) => {
    const { email, contact, password, fullname, isSeller } = req.body;
    try {
        const userExists = await userModel.findOne({
            $or: [{ email }, { contact }]
        })
        if (userExists) {
            return res.status(400).json({ message: "User with this email or contact already exists" });
        }
        const user = await userModel.create({
            email,
            contact,
            password,
            fullname,
            role: isSeller ? "seller" : "buyer"
        })
        await generateToken(user, res, "User registered successfully", 201);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}
export async function login(req, res) {
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
        await generateToken(user, res, "Login successful", 200);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const googleCallback = async (req, res) => {
    try {
        const { id, displayName, emails } = req.user;
        const email = emails[0].value;
        let user = await userModel.findOne({ email });
        if (!user) {
            user = await userModel.create({
                email,
                fullname: displayName,
                googleId: id,
                role: "pending"
            })
        }
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        )
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        // Redirect based on role
        if (user.role === "pending") {
            return res.redirect("http://localhost:5173/choose-role");
        } else if (user.role === "seller") {
            return res.redirect("http://localhost:5173/seller/dashboard");
        } else {
            return res.redirect("http://localhost:5173");
        }
    } catch (error) {
        console.error("Google Callback Error:", error);
        return res.redirect("http://localhost:5173/login?error=auth_failed");
    }
}
export const getMe = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({
            message: "User found successfully",
            success: true,
            user: {
                id: user._id,
                email: user.email,
                fullname: user.fullname,
                role: user.role
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateRole = async (req, res) => {
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
            success: true,
            message: "Role updated successfully",
            user: {
                id: user._id,
                email: user.email,
                fullname: user.fullname,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Update Role Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}
