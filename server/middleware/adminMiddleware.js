import { createHttpError } from "../utils/validator.js";

const authorizeRoles =
  (...roles) =>
  (req, res, next) => {
    if (!req.user) {
      return next(createHttpError(401, "Authentication required"));
    }

    if (!roles.includes(req.user.role)) {
      return next(createHttpError(403, "Access denied"));
    }

    return next();
  };

const requireAdmin = authorizeRoles("admin");

export { authorizeRoles, requireAdmin };
export default requireAdmin;
