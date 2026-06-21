import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const registerUser = async ({ firstName, lastName, emailId, password, role, mobileNumber }) => {
  if (!firstName || !emailId || !password || !mobileNumber) {
    throw createError("First name, email, password, and mobile number are required", 400);
  }

  const existingUser = await prisma.user.findUnique({ where: { email:emailId } });

  if (existingUser) {
    throw createError("Email is already registered", 409);
  }

  const existingUserWithMobileNumber = await prisma.user.findUnique({ where: { mobileNumber} });

  if (existingUserWithMobileNumber) {
    throw createError("Mobile number is already registered", 409);
  }
  

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email: emailId,
      password: hashedPassword,
      ...(role ? { role } : {}),
      mobileNumber,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      mobileNumber: true,
      isActive: true,
      createdAt: true,
    },
  });

  return {
    //token: createToken(user),
    user,
  };
};

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw createError("Email and password are required", 400);
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.isActive) {
    throw createError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw createError("Invalid email or password", 401);
  }

  return {
    token: createToken(user),
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      mobileNumber: user.mobileNumber,
    },
  };
};

export default {
  registerUser,
  loginUser,
};
