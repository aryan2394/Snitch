import {Router} from 'express';
const router=Router();
import {register} from '../controllers/auth.controller.js';
import {registerValidation} from '../validator/auth.validator.js';
router.post("/register",registerValidation,register);
export default router;