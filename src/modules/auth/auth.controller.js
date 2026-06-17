import { loginUser, registerUser } from "./auth.service.js";

export const register = async (req, res) => {
  try {
    const { token, user } = await registerUser(req.body);

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { token, user } = await loginUser(req.body);

    return res.json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

export const logout = (req, res) => {
  return res.json({ message: "Logout successful" });
};

export default {
  register,
  login,
  logout,
};
