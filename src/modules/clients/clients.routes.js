import express from "express";
import { create, getAll, getById, update, remove } from "./clients.controller.js";
import { createClientSchema } from "./clients.validation.js";
import validate from "../../middlewares/validate.middleware.js";

const clientRoutes = express.Router();

// Create a new client
clientRoutes.post("/", validate(createClientSchema), create);

// Get all clients
clientRoutes.get("/", getAll);

// Get client by ID
clientRoutes.get("/:id", getById);

// Update client by ID
clientRoutes.put("/:id", update);

// Delete client by ID
clientRoutes.delete("/:id", remove);

export default clientRoutes;
