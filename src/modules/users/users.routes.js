import express from "express";
import {
  authenticateUser,
  authorizeRoles,
} from "../auth/auth.middleware.js";
import { create, getAll, getById, update, remove } from "./users.controller.js";
import { createUserSchema, updateUserSchema } from "./users.validation.js";
import validate from "../../middlewares/validate.middleware.js";


const userRoute = express.Router();

userRoute.get("/profile", authenticateUser, (req, res) => {
  return res.json({ user: req.user });
});

userRoute.get("/admin", authenticateUser, authorizeRoles("Admin"), (req, res) => {
  return res.json({ message: "Admin access granted", user: req.user });
});

//userRoute.post("/", authenticateUser, authorizeRoles("Admin"), validate(createUserSchema), create);
userRoute.get("/", authenticateUser, getAll);
userRoute.get("/:id", authenticateUser, getById);
//userRoute.put("/:id", authenticateUser, authorizeRoles("Admin"), validate(updateUserSchema), update);
//userRoute.delete("/:id", authenticateUser, authorizeRoles("Admin"), remove);

export default userRoute;
