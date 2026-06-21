import express from "express";
import { register, login, logout, forgotPassword, resetPassword } from "./auth.controller.js";
import { authenticateUser } from "./auth.middleware.js";
import registerSchema from "./auth.validation.js";
import { forgotSchema, resetSchema } from "./reset.validation.js";
import validate from "../../middlewares/validate.middleware.js";

const authRoute = express.Router();

authRoute.post("/register", validate(registerSchema), register);
authRoute.post("/login", login);
authRoute.post("/logout", authenticateUser, logout);
authRoute.post("/forgot-password", validate(forgotSchema), forgotPassword);
authRoute.post("/reset-password", validate(resetSchema), resetPassword);

export default authRoute;
