import {Router} from 'express';
import {authenticateSeller, authenticateUser} from '../middlewares/auth.middleware.js';
import {createProduct,getSellerProducts,getProducts, getProductDetails, addProductVariant, deleteProduct} from '../controllers/product.controller.js';
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

// @route GET /api/products
// @desc Get all products
// @access Public
// @more description:as we see ki bina login ke sab products dikhte hai amazon ya kisi site pe matlab user can see all the products withot login also
router.get("/",getProducts);

// @route GET /api/products/detail/:id 
// @desc Get product detail
// @access Public  
router.get("/detail/:id",getProductDetails);

// @route post /api/products/:productId/variants
// @desc Add variants to a product
// @access Private (Seller only) 
router.post("/:productId/variants",authenticateSeller,upload.array("images",7),addProductVariant);

// @route DELETE /api/products/:productId
// @desc Delete a product
// @access Private (Seller only)
router.delete("/:productId", authenticateSeller, deleteProduct);

export default router; 