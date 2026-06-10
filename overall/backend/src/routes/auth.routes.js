import {Router} from "express"
import { register,login,getMe } from "../controllers/auth.controller.js";
import { registerValidator ,loginValidator} from "../validator/auth.validator.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
const router=Router();
router.post("/register",registerValidator,register);
router.post("/login",loginValidator,login);
router.get("/me",authenticateUser,getMe);
export default router;