import Joi from "joi";

export const createUserSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  mobileNumber: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .required()
    .messages({
      "string.empty": "Mobile number is required",
    }),
  password: Joi.string().min(8).max(20).required(),
  role: Joi.string().valid("Admin", "Architect", "SiteEngineer", "Client"),
});

export const updateUserSchema = Joi.object({
  firstName: Joi.string().min(2).max(50),
  lastName: Joi.string().min(2).max(50),
  email: Joi.string().email(),
  mobileNumber: Joi.string().pattern(/^[6-9]\d{9}$/),
  password: Joi.string().min(8).max(20),
  role: Joi.string().valid("Admin", "Architect", "SiteEngineer", "Client"),
  isActive: Joi.boolean(),
}).min(1);

export default {
  createUserSchema,
  updateUserSchema,
};
