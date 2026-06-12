import {Router} from "express"
import passport from "passport";
import { register,login,getMe,googleCallback,updateRole} from "../controllers/auth.controller.js";
import { registerValidator ,loginValidator} from "../validator/auth.validator.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
const router=Router();
router.post("/register",registerValidator,register);
router.post("/login",loginValidator,login);
router.get("/me",authenticateUser,getMe);
router.put("/update-role",authenticateUser,updateRole);
router.get("/google",passport.authenticate("google",{scope:["profile","email"]}))
router.get("/google/callback",
    passport.authenticate("google",{
        failureRedirect:"http://localhost:5173/login",
        session:false
    }),
googleCallback);
export default router;