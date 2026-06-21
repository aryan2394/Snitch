import { Router } from "express";
import {login, register,getMe} from "../controller/auth.controller.js";
import { loginValidate, registerValidate } from "../validator/auth.validator.js";
import {authenticateUser} from "../middlewares/auth.middleware.js";
const router=Router();
router.post("/register",registerValidate,register);
router.post("/login",loginValidate,login);
router.get("/me",authenticateUser,getMe); 
export default router;