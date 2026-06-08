import {Router} from 'express';
import {authenticateSeller} from '../middlewares/auth.middleware.js';
import {createProduct,getSellerProducts} from '../controllers/product.controller.js';
import {upload} from '../middlewares/multer.middleware.js';
import {validateProduct} from '../validator/product.validator.js';
const router=Router();

// @route POST /api/products
// @desc Create a new product
// @access Private (Seller only)
router.post("/",authenticateSeller,upload.array("images",7),validateProduct,createProduct);

// @route GET /api/products/seller
// @desc Get all products of the authenticated seller
// @access Private (Seller only)

router.get("/seller",authenticateSeller,getSellerProducts); 
export default router;