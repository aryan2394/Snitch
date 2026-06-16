import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js"; 
import { validateAddToCart,validateIncrementCartItemQuantity } from "../validator/cart.validator.js";
import { addToCart,getCart,incrementCartItemQuantity } from "../controllers/cart.controller.js"; 
const router=Router();

// @route:POST /api/cart/add/:productId/:variantId
// @desc:Add product to cart
// @access:Private 
router.post("/add/:productId/:variantId",authenticateUser,validateAddToCart,addToCart);
// @route:GET /api/cart
// @desc:Get cart
// @access:Private 
router.get("/",authenticateUser,getCart);


// @route:patch api/cart/quantity/increment/:productId/:variantId
// @desc:Increment quantity of product in cart by 1
// @access:Private 
router.patch("quantity/increment/:productId/:variantId",authenticateUser,validateIncrementCartItemQuantity,incrementCartItemQuantity)


export default router;