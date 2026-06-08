import {Router} from 'express';
import passport from 'passport';
const router=Router();
import {register,login,googleCallback} from '../controllers/auth.controller.js';
import {registerValidation,loginValidation} from '../validator/auth.validator.js';
router.post("/register",registerValidation,register);
router.post("/login",loginValidation,login);
router.get("/google",passport.authenticate("google",{scope:["profile","email"]}));
router.get("/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
    session: false
  }),
  googleCallback
);
export default router;