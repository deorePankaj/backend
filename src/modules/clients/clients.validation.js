import Joi from "joi";

const createClientSchema = Joi.object({

    clientType: Joi.string().required(),
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    emailId: Joi.string().email().required(),
    countryCode: Joi.string().length(3).required(),
    mobileNumber: Joi.string()
        .pattern(/^[6-9]\d{9}$/)
        .required()
        .messages({
            "string.empty": "Mobile number is required",
        }),
    whatsappNumber: Joi.string()
        .pattern(/^[6-9]\d{9}$/)
        .required()
        .messages({
            "string.empty": "Whatsapp number is required",
        }),
    alternatePhone: Joi.string()
        .pattern(/^[6-9]\d{9}$/)
        .messages({
            "string.empty": "Alternate phone number is invalid",
        }),
    website: Joi.string()
        .uri({
            scheme: ["http", "https"]
        })
        .messages({
            "string.uri": "Please enter a valid website URL",
        }),
    companyName: Joi.string().min(2).max(100),
    contactPersonName: Joi.string().min(2).max(100),
    clientCategory: Joi.string().min(2).max(100),
    designation: Joi.string().min(2).max(100),
    whatsappVerified: Joi.boolean().default(false),
    gstNumber: Joi.string().min(2).max(100),
    panNumber: Joi.string().min(2).max(100),
});

export { createClientSchema };
