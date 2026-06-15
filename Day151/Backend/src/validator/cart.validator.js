import { param,body,validationResult } from "express-validator";
async function validate(req,res,next){
    const result=validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({errors:result.array()});
    }
    next();
}
export const validateAddToCart=[
    param("productId").isMongoId().withMessage("Invalid product id"),
    param("variantId").isMongoId().withMessage("Invalid variant id"),
    body("quantity").isInt({min:1}).withMessage("Quantity must be at least 1"),
    validate
]