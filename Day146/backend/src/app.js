import express from "express"
import morgan from "morgan";
import cookieParser from "cookie-parser"
// import cors from "cors"
import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import authRouter from "./routes/auth.routes.js"
import productRouter from "./routes/product.routes.js"
import { config } from "./config/config.js"
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(passport.initialize())
// app.use(cors({
//     origin:"http://localhost:5173",
//     credentials:true
// }))~
// cors  pata hai kyon use karte hai hum because borowser reject kar deta hai crossOrigin request ko matlab 
// backend is runnign on 3000 and frontend is running on 5173 
// jab hum maalo http:localhost:5173/register page mein hai browser mein and jab user apna form regsieter wala detaisl bhar ke submit krta hai then wo details saari jaati hai 
// in localhost/3000/api/auth/regsieter jo ki diffenrt origin hai 
// and haumre bRWOSER JO hai ek hi site ya ek page mein rahte huwe jo ki differnt url mein chal raha hai and diffenrt url mein jaana chahe ussi same page se toh not possible 

passport.use(new GoogleStrategy({
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/api/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
export default app;