import {Router } from "express";
import { createProduct } from "../controller/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import {authenticateSeller} from "../middlewares/auth.middleware.js";
const router=Router();
router.post("/",authenticateSeller,upload.array("images",7),createProduct);
export default router;