import {body,validationResult} from "express-validator";
async function validate(req,res,next)
{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({
            success:false,
            message:errors.array()
        })
    }
    next()
}
export const registerValidate=[
    body("fullname").trim().notEmpty().withMessage("fullname is required"),
    body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Email is invalid"),
    body("password").trim().notEmpty().withMessage("Password is required"),
    body("contact").trim().notEmpty().withMessage("contact is required").isLength({min:10}).withMessage("contact is invalid"),
    body("isSeller").isBoolean().withMessage("isSeller is required"),
    validate
]
export const loginValidate=[
    body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Email is invalid"),
    body("password").trim().notEmpty().withMessage("Password is required"),
    validate
]