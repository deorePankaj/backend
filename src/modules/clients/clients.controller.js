import {
    createClient,
    getAllClients,
    getClientById,
    updateClient,
    deleteClient,
} from "./clients.service.js";

export const create = async (req, res) => {
    try {
        const client = await createClient(req.body);

        return res.status(201).json({
            message: "Client created successfully",
            data: client,
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: "Failed to create client",
            error: error.message,
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const { skip = 0, take = 10 } = req.query;
        const result = await getAllClients(skip, take);

        return res.json({
            message: "Clients retrieved successfully",
            ...result,
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: "Failed to retrieve clients",
            error: error.message,
        });
    }
};

export const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await getClientById(id);

        return res.json({
            message: "Client retrieved successfully",
            data: client,
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: "Failed to retrieve client",
            error: error.message,
        });
    }
};

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedClient = await updateClient(id, req.body);

        return res.json({
            message: "Client updated successfully",
            data: updatedClient,
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: "Failed to update client",
            error: error.message,
        });
    }
};

export const remove = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteClient(id);

        return res.json({
            message: "Client deleted successfully",
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: "Failed to delete client",
            error: error.message,
        });
    }
};

export default {
    create,
    getAll,
    getById,
    update,
    remove,
};
