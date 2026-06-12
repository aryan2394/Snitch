import express from "express"
import authRouter from "./routes/auth.routes.js"
import { config } from "./config/config.js";
import cookieParser from "cookie-parser";
import passport from "passport"
import {Strategy as GoogleStrategy} from "passport-google-oauth20" 
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
passport.use(new GoogleStrategy({
    clientID:config.GOOGLE_CLIENT_ID,
    clientSecret:config.GOOGLE_CLIENT_SECRET,
    callbackURL:"/api/auth/google/callback"
},(accessToken,refreshToken,profile,done)=>{
    console.log(accessToken,refreshToken,profile)
    return done(null,profile);
}))
app.use("/api/auth",authRouter);
export default app; 