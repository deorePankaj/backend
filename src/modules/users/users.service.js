import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const userSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  mobileNumber: true,
  role: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
};

export const createUser = async (requestBody) => {
  const firstName = requestBody.firstName;
  const lastName = requestBody.lastName;
  const email = requestBody.email ?? requestBody.emailId;
  const mobileNumber = requestBody.mobileNumber;
  const password = requestBody.password;
  const role = requestBody.role ?? "Client";

  if (!firstName || !lastName || !email || !password || !mobileNumber) {
    throw createError("First name, last name, email, password, and mobile number are required", 400);
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw createError("User with this email already exists", 409);
  }

  const existingUserWithMobileNumber = await prisma.user.findUnique({ where: { mobileNumber } });
  if (existingUserWithMobileNumber) {
    throw createError("User with this mobile number already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      mobileNumber,
      password: hashedPassword,
      role,
    },
    select: userSelect,
  });

  return user;
};

export const getAllUsers = async (skip = 0, take = 10) => {
  const users = await prisma.user.findMany({
    skip: parseInt(skip),
    take: parseInt(take),
    orderBy: { createdAt: "desc" },
    select: userSelect,
  });

  const total = await prisma.user.count();

  return {
    data: users,
    total,
    skip: parseInt(skip),
    take: parseInt(take),
  };
};

export const getUserById = async (id) => {
  if (!id) {
    throw createError("User ID is required", 400);
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
    select: userSelect,
  });

  if (!user) {
    throw createError("User not found", 404);
  }

  return user;
};

export const updateUser = async (id, updateData) => {
  if (!id) {
    throw createError("User ID is required", 400);
  }

  const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });

  if (!user) {
    throw createError("User not found", 404);
  }

  const sanitizedData = {};

  for (const [key, value] of Object.entries(updateData || {})) {
    if (value !== undefined && value !== null && value !== "") {
      sanitizedData[key] = value;
    }
  }

  if (Object.keys(sanitizedData).length === 0) {
    throw createError("At least one field is required for update", 400);
  }

  if (sanitizedData.email && sanitizedData.email !== user.email) {
    const existingUser = await prisma.user.findUnique({ where: { email: sanitizedData.email } });
    if (existingUser) {
      throw createError("User with this email already exists", 409);
    }
  }

  if (sanitizedData.mobileNumber && sanitizedData.mobileNumber !== user.mobileNumber) {
    const existingUserWithMobileNumber = await prisma.user.findUnique({ where: { mobileNumber: sanitizedData.mobileNumber } });
    if (existingUserWithMobileNumber) {
      throw createError("User with this mobile number already exists", 409);
    }
  }

  if (sanitizedData.password) {
    sanitizedData.password = await bcrypt.hash(sanitizedData.password, 10);
  }

  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data: sanitizedData,
    select: userSelect,
  });

  return updatedUser;
};

export const deleteUser = async (id) => {
  if (!id) {
    throw createError("User ID is required", 400);
  }

  const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });

  if (!user) {
    throw createError("User not found", 404);
  }

  const deletedUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { isActive: false },
    select: userSelect,
  });

  return deletedUser;
};

export default {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
