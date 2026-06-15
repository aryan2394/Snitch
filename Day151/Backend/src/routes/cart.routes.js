import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js"; 
import { validateAddToCart } from "../validator/cart.validator.js";
import { addToCart,getCart } from "../controllers/cart.controller.js";
const router=Router();

// @route:POST /api/cart/add/:productId/:variantId
// @desc:Add product to cart
// @access:Private 
router.post("/add/:productId/:variantId",authenticateUser,validateAddToCart,addToCart);
// @route:GET /api/cart
// @desc:Get cart
// @access:Private 
router.get("/",authenticateUser,getCart); 
export default router;