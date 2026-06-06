import jwt from "jsonwebtoken";
import {config} from "../config/config.js";
import userModel from "../models/user.model.js";
export async function authenticateSeller(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        const user=await userModel.findById(decoded.id); 
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (user.role !== "seller") {
            return res.status(403).json({ message: "Forbidden" });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

// ye dekho karna kya cha raha hai ki hymein dekho ye find karna ai user is seller or not becuase user buyser huwa toh hum jo feature bana rahe hai ki seller can create the product wo wla anahi bana payenge
// toh humein seller kaise pata chalega humne uske liye user ka models bana rakha hai jismein user ka role hai ki wo seller hai ya buyer hai 
// decoded mein data aaya hai jo aap save karte hai res.cookie("token,token") se 
// toh humne id:user.id se save kiya hai token mein pahle find the user then 
// uska role dekho lo kya hai agar user seller hai then ok and pass the request to the controller else return forbidden