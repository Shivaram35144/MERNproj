import { body, ValidationChain, validationResult} from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validate = (validations: ValidationChain[]) => {
    return async(req: Request, res: Response, next: NextFunction) => {
        
        //print the body
        console.log(req.body);
        for(let validation of validations){

            const result = await validation.run(req);
            if (!result.isEmpty()){
                console.log("Validation failed");
                break;
            }
        }
            const errors = validationResult(req);
            
            if(errors.isEmpty()){
                console.log("No errors found");
                return next(); // if no errors, move to the next middleware defined in api route
            }

            return res.status(422).json({errors: errors.array()}); //422 is for validation errors

        
    }
};

export const loginValidator = [
    body("email").trim().isEmail().withMessage("Enter a valid email"),
    // body("password").trim().isLength({ min: 6 }).withMessage("Password must be atleast 6 characters long")
];

export const signupValidator = [
    
    body("name").notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Enter a valid email"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password must be atleast 6 characters long")
];


export const chatValidator = [
    body("message").notEmpty().withMessage("Message is required")
];
