import Joi from "joi";

const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),

  lastName: Joi.string().min(2).max(50).required(),

  email: Joi.string().email().required(),

  password: Joi.string().min(8).required(),

  role: Joi.string()
    .valid("Architect", "SiteEngineer", "Client")
    .required(),
});

export default  registerSchema;
