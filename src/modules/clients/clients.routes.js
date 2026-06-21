import express from "express";
import { create, getAll, getById, update, remove } from "./clients.controller.js";
import { createClientSchema } from "./clients.validation.js";
import validate from "../../middlewares/validate.middleware.js";
import { authenticateUser } from "../auth/auth.middleware.js";

const clientRoutes = express.Router();

// Create a new client
clientRoutes.post("/", validate(createClientSchema), authenticateUser, create);

// Get all clients
clientRoutes.get("/", authenticateUser, getAll);

// Get client by ID
clientRoutes.get("/:id", authenticateUser, getById);

// Update client by ID
clientRoutes.put("/:id", authenticateUser, update);

// Delete client by ID
clientRoutes.delete("/:id", authenticateUser, remove);

export default clientRoutes;
