  import User from "../models/User.js";
  import asyncHandler from "../utils/asyncHandler.js";
  import sendResponse from "../utils/sendResponse.js";
  import { createHttpError, parsePagination } from "../utils/validator.js";

  const getUsers = asyncHandler(async (req, res) => {
    const pagination = parsePagination(req.query);
    const result = await User.list({
      search: req.query.search,
      role: req.query.role,
      status: req.query.status,
      page: pagination.page,
      limit: pagination.limit
    });

    return sendResponse(res, {
      message: "Users fetched successfully",
      data: result.users,
      meta: {
        total: result.total,
        page: result.page,
        limit: result.limit
      }
    });
  });

  const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    return sendResponse(res, {
      message: "User fetched successfully",
      data: user
    });
  });

  const updateUser = asyncHandler(async (req, res) => {
    const existingUser = await User.findById(req.params.id);

    if (!existingUser) {
      throw createHttpError(404, "User not found");
    }

    const user = await User.updateByAdmin(req.params.id, {
      fullName: req.body.fullName || req.body.name,
      phone: req.body.phone,
      role: req.body.role,
      status: req.body.status
    });

    return sendResponse(res, {
      message: "User updated successfully",
      data: user
    });
  });

  const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.softDelete(req.params.id);

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    return sendResponse(res, {
      message: "User deleted successfully",
      data: user
    });
  });

  export { getUsers, getUserById, updateUser, deleteUser };
