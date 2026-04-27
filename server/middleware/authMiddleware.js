import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createHttpError } from "../utils/validator.js";

const getTokenFromRequest = (req) => {
  const header = req.headers.authorization || "";

  if (!header.startsWith("Bearer ")) {
    return null;
  }

  return header.slice(7).trim();
};

const authenticate = async (req, res, next) => {
  try {
    const token = getTokenFromRequest(req);

    if (!token) {
      return next(createHttpError(401, "Authentication required"));
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "development_secret_change_me"
    );
    const user = await User.findById(decoded.id);

    if (!user || user.status !== "active") {
      return next(createHttpError(401, "Invalid or expired token"));
    }

    req.user = user;
    return next();
  } catch (error) {
    return next(createHttpError(401, "Invalid or expired token"));
  }
};

const optionalAuthenticate = async (req, res, next) => {
  try {
    const token = getTokenFromRequest(req);

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "development_secret_change_me"
    );
    const user = await User.findById(decoded.id);

    if (user && user.status === "active") {
      req.user = user;
    }

    return next();
  } catch (error) {
    return next();
  }
};

export { authenticate, optionalAuthenticate };
export default authenticate;
