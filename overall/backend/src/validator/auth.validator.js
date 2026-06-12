import { body,validationResult } from "express-validator";
const validate=(req,res,next)=>
{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({
            errors:errors.array()
        })
    }
    next()
}
export const registerValidator=[
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Email is not valid"),
    body("password").notEmpty().withMessage("Password is required"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long"),
    body("fullname").notEmpty().withMessage("Full Name is required"),
    body("contact").notEmpty().withMessage("Contact is required"),
    body("contact").isLength({min:10,max:10}).withMessage("Contact must be 10 digits long"),
    validate
]
export const loginValidator=[
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Email is not valid"),
    body("password").notEmpty().withMessage("Password is required"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long"),
    validate
]