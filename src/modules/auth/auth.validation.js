import Joi from "joi";

const registerSchema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),

    lastName: Joi.string().min(2).max(50).required(),

    emailId: Joi.string().email().required(),

    mobileNumber: Joi.string()
        .pattern(/^[6-9]\d{9}$/)
        .required()
        .messages({
            "string.empty": "Mobile number is required",
        }),

    password: Joi.string()
        .min(8)
        .max(20)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 8 characters long",
            "string.max": "Password cannot exceed 20 characters",
            "string.pattern.base":
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            "any.required": "Password is required",
        }),

    confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .messages({
            "any.only": "Confirm password must match password",
            "any.required": "Confirm password is required",
        }),
});

export default registerSchema;
