import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "./users.service.js";

export const create = async (req, res) => {
  try {
    const user = await createUser(req.body);

    return res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: "Failed to create user",
      error: error.message,
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const { skip = 0, take = 10 } = req.query;
    const result = await getAllUsers(skip, take);

    return res.json({
      message: "Users retrieved successfully",
      ...result,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: "Failed to retrieve users",
      error: error.message,
    });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    return res.json({
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: "Failed to retrieve user",
      error: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await updateUser(id, req.body);

    return res.json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: "Failed to update user",
      error: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUser(id);

    return res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: "Failed to delete user",
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
