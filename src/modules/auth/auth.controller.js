import { loginUser, registerUser, requestPasswordReset, resetUserPassword } from "./auth.service.js";

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

export const forgotPassword = async (req, res) => {
  try {
    const { token } = await requestPasswordReset(req.body.email);

    return res.json({
      message: "Password reset token generated",
      token,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: "Failed to generate reset token",
      error: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    await resetUserPassword(token, password);

    return res.json({ message: "Password reset successful" });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: "Password reset failed",
      error: error.message,
    });
  }
};

export default {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
};
