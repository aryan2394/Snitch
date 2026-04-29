import {body,validationResult} from "express-validator"

function validateRequest(req,res,next)
{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({
            error:errors.array()
        })
    }
    next()
}
export const validateRegisterUser= [

  // 🔹 email
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

  // 🔹 contact
  body("contact")
    .notEmpty().withMessage("Contact is required")
    .isLength({ min: 10, max: 10 }).withMessage("Contact must be 10 digits")
    .isNumeric().withMessage("Contact must be numbers only"),

  // 🔹 password
  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

  // 🔹 fullname
  body("fullname")
    .notEmpty().withMessage("Full name is required")
    .isLength({ min: 3 }).withMessage("Full name must be at least 3 characters"),

  // 🔹 role
  body("role")
    .optional()
    .isIn(["seller", "buyer"]).withMessage("Role must be seller or buyer"),

  body("isSeller")
  .isBoolean().withMessage("isSeller value must be a boolean value"),
  
    validateRequest
];

export const validateLoginUser=[
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

    body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

    validateRequest

]