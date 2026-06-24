import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';
import { config } from '../config/config.js';
import redis from '../config/cache.js';

export async function authenticateUser(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const isBlacklisted = await redis.get(`blacklist:${token}`);
        if (isBlacklisted) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, config.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(403).json({ message: "Forbidden" });
        }
        req.user = user;
        next();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}
export async function authenticateSeller(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const isBlacklisted = await redis.get(`blacklist:${token}`);
        if (isBlacklisted) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, config.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        if (!user || user.role !== "seller") {
            return res.status(403).json({ message: "Forbidden" });
        }
        req.user = user;
        next();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}