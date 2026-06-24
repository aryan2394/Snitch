import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import authRouter from './routes/auth.routes.js';
import productRouter from './routes/product.routes.js';
import cartRouter from './routes/cart.routes.js'; 
import {config} from "./config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json()); 
app.use(morgan('dev'));
app.use(cookieParser());
app.use(passport.initialize());
passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // Here you would typically find or create a user in your database
    // For this example, we'll just return the profile
    return done(null, profile);
  }
));

// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true
// }))
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/cart',cartRouter); 

// Serve static React build files
app.use(express.static(path.join(__dirname, '../public')));

// Catch-all route to serve React Router's index.html for client side routing
app.get('/*splat', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

export default app;