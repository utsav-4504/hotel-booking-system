import bcrypt from "bcryptjs";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import sendResponse from "../utils/sendResponse.js";
import { createHttpError } from "../utils/validator.js";

/* ===============================
   REGISTER
================================= */
const register = asyncHandler(async (req, res) => {
  try {
    const fullName =
      req.body.fullName || req.body.name;

    const { email, phone, password } =
      req.body;

    if (!fullName || !email || !password) {
      throw createHttpError(
        400,
        "Full name, email and password are required"
      );
    }

    const existingUser =
      await User.findByEmail(email, {
        includePassword: true
      });

    if (existingUser) {
      throw createHttpError(
        409,
        "An account with this email already exists"
      );
    }

    const passwordHash =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      phone,
      passwordHash,
      role: "customer"
    });

    const token = generateToken(user);

    return sendResponse(res, {
      statusCode: 201,
      success: true,
      message:
        "Registration successful",
      data: {
        user,
        token
      }
    });
  } catch (error) {
    console.log(
      "REGISTER ERROR:",
      error
    );

    throw createHttpError(
      error.statusCode || 500,
      error.message ||
        "Registration failed"
    );
  }
});

/* ===============================
   LOGIN
================================= */
const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } =
      req.body;

    if (!email || !password) {
      throw createHttpError(
        400,
        "Email and password are required"
      );
    }

    const user =
      await User.findByEmail(email, {
        includePassword: true
      });

    if (!user) {
      throw createHttpError(
        401,
        "Invalid email or password"
      );
    }

    const isPasswordValid =
      await bcrypt.compare(
        password,
        user.passwordHash
      );

    if (!isPasswordValid) {
      throw createHttpError(
        401,
        "Invalid email or password"
      );
    }

    if (user.status !== "active") {
      throw createHttpError(
        403,
        "Your account is not active. Please contact support."
      );
    }

    const updatedUser =
      await User.updateLastLogin(
        user.id
      );

    const token =
      generateToken(updatedUser);

    return sendResponse(res, {
      success: true,
      message:
        "Login successful",
      data: {
        user: updatedUser,
        token
      }
    });
  } catch (error) {
    console.log(
      "LOGIN ERROR:",
      error
    );

    throw createHttpError(
      error.statusCode || 500,
      error.message ||
        "Login failed"
    );
  }
});

/* ===============================
   GET PROFILE
================================= */
const getProfile = asyncHandler(
  async (req, res) => {
    try {
      return sendResponse(res, {
        success: true,
        message:
          "Profile fetched successfully",
        data: req.user
      });
    } catch (error) {
      console.log(
        "PROFILE ERROR:",
        error
      );

      throw createHttpError(
        500,
        "Failed to fetch profile"
      );
    }
  }
);

/* ===============================
   UPDATE PROFILE
================================= */
const updateProfile = asyncHandler(
  async (req, res) => {
    try {
      const user =
        await User.updateProfile(
          req.user.id,
          {
            fullName:
              req.body.fullName ||
              req.body.name,
            phone:
              req.body.phone,
            profilePictureUrl:
              req.body
                .profilePictureUrl ||
              req.body
                .profile_picture_url
          }
        );

      if (!user) {
        throw createHttpError(
          404,
          "User not found"
        );
      }

      return sendResponse(res, {
        success: true,
        message:
          "Profile updated successfully",
        data: user
      });
    } catch (error) {
      console.log(
        "UPDATE PROFILE ERROR:",
        error
      );

      throw createHttpError(
        error.statusCode || 500,
        error.message ||
          "Profile update failed"
      );
    }
  }
);

/* ===============================
   CHANGE PASSWORD
================================= */
const changePassword =
  asyncHandler(
    async (req, res) => {
      try {
        const currentPassword =
          req.body
            .currentPassword ||
          req.body
            .current_password;

        const newPassword =
          req.body.newPassword ||
          req.body.new_password;

        if (
          !currentPassword ||
          !newPassword
        ) {
          throw createHttpError(
            400,
            "Current password and new password are required"
          );
        }

        const user =
          await User.findById(
            req.user.id,
            {
              includePassword: true
            }
          );

        if (!user) {
          throw createHttpError(
            404,
            "User not found"
          );
        }

        const isPasswordValid =
          await bcrypt.compare(
            currentPassword,
            user.passwordHash
          );

        if (!isPasswordValid) {
          throw createHttpError(
            400,
            "Current password is incorrect"
          );
        }

        const passwordHash =
          await bcrypt.hash(
            newPassword,
            10
          );

        await User.updatePassword(
          req.user.id,
          passwordHash
        );

        return sendResponse(res, {
          success: true,
          message:
            "Password updated successfully"
        });
      } catch (error) {
        console.log(
          "CHANGE PASSWORD ERROR:",
          error
        );

        throw createHttpError(
          error.statusCode ||
            500,
          error.message ||
            "Password update failed"
        );
      }
    }
  );

export {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword
};