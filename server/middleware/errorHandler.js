const errorHandler = (err, req, res, next) => {
  let statusCode = err.status || 500;
  let message = err.message || "Internal Server Error";

  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  if (err.type === "entity.parse.failed") {
    statusCode = 400;
    message = "Invalid JSON payload";
  }

  if (err.code === "23505") {
    statusCode = 409;
    message = "A record with that value already exists";
  }

  if (err.code === "23503") {
    statusCode = 400;
    message = "Related record not found";
  }

  const response = {
    success: false,
    message
  };

  if (err.details) {
    response.details = err.details;
  } else if (process.env.NODE_ENV === "development") {
    response.details = err.stack;
  }

  if (statusCode >= 500) {
    console.error("[error]", err);
  }

  res.status(statusCode).json(response);
};

export default errorHandler;
