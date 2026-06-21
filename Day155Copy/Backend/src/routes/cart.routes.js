import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js"; 
import { validateAddToCart,validateIncrementCartItemQuantity,validateRemoveCartItem,validateDecrementCartItemQuantity } from "../validator/cart.validator.js";
import { addToCart,getCart,incrementCartItemQuantity,decrementCartItemQuantity,removeCartItem,createOrderController,verifyOrderController } from "../controllers/cart.controller.js"; 
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
router.patch("/quantity/increment/:productId/:variantId",authenticateUser,validateIncrementCartItemQuantity,incrementCartItemQuantity)

//@route:patch api/cart/quantity/decrement/:productId/:variantId
//@desc:Decrement quantity of product in cart by 1
//@access:Private 
router.patch("/quantity/decrement/:productId/:variantId",authenticateUser,validateDecrementCartItemQuantity,decrementCartItemQuantity)

//@route:delete api/cart/remove/:productId/:variantId
//@desc:Remove product from cart
//@access:Private 
router.delete("/remove/:productId/:variantId",authenticateUser,validateRemoveCartItem,removeCartItem)

//@route:POST /api/cart/payment/create/order
//@desc:Create order for payment
//@access:Private 
router.post("/payment/create/order",authenticateUser,createOrderController);

//@route:POST /api/cart/payment/verify/order
//@desc:Verify order for payment
//@access:Private  
router.post("/payment/verify/order",authenticateUser,verifyOrderController);

export default router;