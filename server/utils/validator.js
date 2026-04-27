import { validationResult } from "express-validator";

const createHttpError = (status, message, details) => {
  const error = new Error(message);
  error.status = status;

  if (details) {
    error.details = details;
  }

  return error;
};

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return next(
    createHttpError(422, "Validation error", errors.array())
  );
};

const parseBoolean = (value, fallback = undefined) => {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    const normalizedValue = value.toLowerCase();

    if (["true", "1", "yes"].includes(normalizedValue)) {
      return true;
    }

    if (["false", "0", "no"].includes(normalizedValue)) {
      return false;
    }
  }

  return fallback;
};

const parsePagination = ({ page = 1, limit = 10 } = {}) => {
  const parsedPage = Math.max(Number(page) || 1, 1);
  const parsedLimit = Math.min(Math.max(Number(limit) || 10, 1), 100);

  return {
    page: parsedPage,
    limit: parsedLimit,
    offset: (parsedPage - 1) * parsedLimit
  };
};

export {
  createHttpError,
  validateRequest,
  parseBoolean,
  parsePagination
};
