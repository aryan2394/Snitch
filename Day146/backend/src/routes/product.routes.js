import {Router} from 'express';
import multer from "multer";
import { authenticateSeller } from '../middlewares/auth.middleware.js';
import { createProduct } from '../controllers/product.controller.js';
const upload=multer({
    storage:multer.memoryStorage(),
    limits:{
        fileSize:5*1024*1024, // 5mb
    }
});
const router=Router();
router.post("/",authenticateSeller,upload.array("images", 7),createProduct);
export default router; 