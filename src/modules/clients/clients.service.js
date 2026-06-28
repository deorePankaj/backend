import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const createError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

export const createClient = async (requestBody) => {

    const existingClient = await prisma.user.findUnique({ where: { email: requestBody.emailId } });

    if (existingClient) {
        throw createError(`Client with this Email: ${requestBody.emailId} is already registered`, 409);
    }

    const existingClientWithMobileNumber = await prisma.user.findUnique({ where: { mobileNumber: requestBody.mobileNumber } });

    if (existingClientWithMobileNumber) {
        throw createError(`Client with this Mobile number: ${requestBody.mobileNumber} is already registered`, 409);
    }

    const hashedPassword = await bcrypt.hash(requestBody.password ? requestBody.password : requestBody.emailId, 10);
    
    const user = await prisma.user.create({
        data: {
            firstName: requestBody.firstName,
            lastName: requestBody.lastName,
            email: requestBody.emailId,
            password: hashedPassword,
            ...(requestBody.role ? { role: requestBody.role } : { role: "Client" }),
            mobileNumber: requestBody.mobileNumber,
        },
    });

    const client = await prisma.client.create({
        data: {
            userId: user.id,
            clientType: requestBody.clientType,
            companyName: requestBody.companyName,
            contactPersonName: requestBody.contactPersonName,
            clientCategory: requestBody.clientCategory,
            designation: requestBody.designation,
            countryCode: requestBody.countryCode,
            whatsappNumber: requestBody.whatsappNumber,
            whatsappVerified: requestBody.whatsappVerified,
            alternatePhone: requestBody.alternatePhone,
            website: requestBody.website,
            gstNumber: requestBody.gstNumber,
            panNumber: requestBody.panNumber,
        },
    });

    return client;
};

export const getAllClients = async (skip = 0, take = 10) => {
    const clients = await prisma.client.findMany({
        skip: parseInt(skip),
        take: parseInt(take),
        orderBy: { createdAt: "desc" },
        include: {
            user: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    mobileNumber: true,
                },
            }
        },
    });

    const total = await prisma.client.count();

    return {
        data: clients,
        total,
        skip: parseInt(skip),
        take: parseInt(take),
    };
};

export const getClientById = async (id) => {
    if (!id) {
        throw createError("Client ID is required", 400);
    }

    const client = await prisma.client.findUnique({
        where: { id: parseInt(id) },
        include: {
            user: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    mobileNumber: true,
                },
            }
        },
    });

    if (!client) {
        throw createError("Client not found", 404);
    }

    return client;
};

export const updateClient = async (
    id,
    { clientType, clientName, companyName, contactPersonName }
) => {
    if (!id) {
        throw createError("Client ID is required", 400);
    }

    const client = await prisma.client.findUnique({
        where: { id: parseInt(id) },
    });

    if (!client) {
        throw createError("Client not found", 404);
    }

    // Check if clientName is unique when updating
    if (clientName && clientName !== client.clientName) {
        const existingClient = await prisma.client.findUnique({
            where: { clientName },
        });

        if (existingClient) {
            throw createError("Client with this name already exists", 409);
        }
    }

    const updatedClient = await prisma.client.update({
        where: { id: parseInt(id) },
        data: {
            ...(clientType && { clientType }),
            ...(clientName && { clientName }),
            ...(companyName && { companyName }),
            ...(contactPersonName && { contactPersonName }),
        },
    });

    return updatedClient;
};

export const deleteClient = async (id) => {
    if (!id) {
        throw createError("Client ID is required", 400);
    }

    const client = await prisma.client.findUnique({
        where: { id: parseInt(id) },
    });

    if (!client) {
        throw createError("Client not found", 404);
    }

    // Soft delete by marking as inactive
    const deletedClient = await prisma.user.update({
        where: { id: parseInt(client.userId) },
        data: { isActive: false },
    });

    return deletedClient;
};

export default {
    createClient,
    getAllClients,
    getClientById,
    updateClient,
    deleteClient,
};
