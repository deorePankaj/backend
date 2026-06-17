import express from "express";
import { register, login, logout } from "./auth.controller.js";
import { authenticateUser } from "./auth.middleware.js";
import registerSchema from "./auth.validation.js";
import validate from "../../middlewares/validate.middleware.js";

const authRoute = express.Router();

authRoute.post("/register", validate(registerSchema), register);
authRoute.post("/login", login);
authRoute.post("/logout", authenticateUser, logout);

export default authRoute;
