import { Router } from 'express';
import passport from 'passport';
import { register, login, logout, googleCallback, getMe, updateRole } from '../controllers/auth.controller.js';
import { registerValidation, loginValidation } from '../validator/auth.validator.js';
import { authenticateSeller, authenticateUser } from '../middlewares/auth.middleware.js';
import { config } from '../config/config.js';
const router = Router();

// @route:  POST /auth/register
// @desc:   Register a new user
// @access: Public
router.post("/register", registerValidation, register);


// @route:  POST /auth/login
// @desc:   Login a new user
// @access: Public
router.post("/login", loginValidation, login);


router.post("/logout", authenticateUser, logout);

// @route:  GET /auth/google
// @desc:   Login a new user via google
// @access: Public
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));


// @route:  GET /auth/google/callback
// @desc:   Callback for google authentication
// @access: Public
router.get("/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${config.FRONTEND_URL}/login`,
    session: false
  }),
  googleCallback
);


// @route:  GET /auth/me
// @desc:   Get current user
// @access: Private
router.get("/me", authenticateUser, getMe);

// @route:  PUT /auth/update-role
// @desc:   Update user role (buyer/seller)
// @access: Private
router.put("/update-role", authenticateUser, updateRole);

export default router;  