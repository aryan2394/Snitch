import userModel from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import redis from "../config/cache.js";
import passport from "passport";

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
export async function logout(req, res) {
    try {
        const token = req.cookies.token;
        if (token) {
            const decoded = jwt.decode(token);
            if (decoded && decoded.exp) {
                const remainingTime = decoded.exp - Math.floor(Date.now() / 1000);
                if (remainingTime > 0) {
                    await redis.setex(`blacklist:${token}`, remainingTime, "true");
                }
            }
        }
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export const initiateGoogleAuth = (req, res, next) => {
    const fromQuery = req.query.from;
    const referer = req.get('referer') || '';
    
    let frontendOrigin = fromQuery || '';
    if (!frontendOrigin && referer) {
        try {
            frontendOrigin = new URL(referer).origin;
        } catch (e) {
            // ignore malformed referer
        }
    }
    
    // Security Whitelist to prevent Open Redirect
    const isRender = frontendOrigin.startsWith("https://") && frontendOrigin.endsWith(".onrender.com");
    
    const isLocalhost = frontendOrigin.startsWith("http://localhost:") || 
                        frontendOrigin.startsWith("http://127.0.0.1:") || 
                        frontendOrigin === "http://localhost" || 
                        frontendOrigin === "http://127.0.0.1";
                        
    if (!isLocalhost && !isRender) {
        frontendOrigin = config.FRONTEND_URL || `${req.protocol}://${req.get('host')}`;
    }

    passport.authenticate("google", {
        scope: ["profile", "email"],
        state: frontendOrigin
    })(req, res, next);
};

export const authenticateGoogleCallback = (req, res, next) => {
    const state = req.query.state || config.FRONTEND_URL || '';
    passport.authenticate("google", {
        failureRedirect: `${state}/login?error=auth_failed`,
        session: false
    })(req, res, next);
};

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

        // Dynamic redirect using req.query.state
        const frontendUrl = req.query.state || config.FRONTEND_URL || `${req.protocol}://${req.get('host')}`;
        if (user.role === "pending") {
            return res.redirect(`${frontendUrl}/choose-role`);
        } else if (user.role === "seller") {
            return res.redirect(`${frontendUrl}/seller/dashboard`);
        } else {
            return res.redirect(`${frontendUrl || "/"}`);
        }
    } catch (error) {
        console.error("Google Callback Error:", error);
        const frontendUrl = req.query.state || config.FRONTEND_URL || `${req.protocol}://${req.get('host')}`;
        return res.redirect(`${frontendUrl}/login?error=auth_failed`);
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
                contact: user.contact,
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
