import express from "express";
import {
  authenticateUser,
  authorizeRoles,
} from "../auth/auth.middleware.js";

const userRoute = express.Router();

userRoute.get("/profile", authenticateUser, (req, res) => {
  return res.json({ user: req.user });
});

userRoute.get("/admin", authenticateUser, authorizeRoles("Admin"), (req, res) => {
    return res.json({ message: "Admin access granted", user: req.user });
  }
);

export default userRoute;
