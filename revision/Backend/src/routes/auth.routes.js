import {Router} from 'express';
const router=Router();
import {register,login} from '../controllers/auth.controller.js';
import {registerValidation,loginValidation} from '../validator/auth.validator.js';
router.post("/register",registerValidation,register);
router.post("/login",loginValidation,login);
export default router;