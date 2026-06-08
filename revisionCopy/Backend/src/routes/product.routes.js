import {Router} from 'express';
import {authenticateSeller} from '../middlewares/auth.middleware.js';
import {createProduct} from '../controllers/product.controller.js';
import {upload} from '../middlewares/multer.middleware.js';
import {validateProduct} from '../validator/product.validator.js';
const router=Router();
router.post("/",authenticateSeller,validateProduct,upload.array("images",7),createProduct);
export default router;