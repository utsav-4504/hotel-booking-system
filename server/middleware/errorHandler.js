// Error Handler Middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  let status = err.status || 500;
  let message = err.message || 'Internal Server Error';
  let details = process.env.NODE_ENV === 'development' ? err.stack : undefined;

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    status = 401;
    message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    status = 401;
    message = 'Token expired';
  }

  // Validation Errors
  if (err.status === 422) {
    status = 422;
    message = 'Validation error';
  }

  // Database Errors
  if (err.code === '23505') {
    status = 409;
    message = 'Duplicate entry';
  }

  if (err.code === '23503') {
    status = 400;
    message = 'Foreign key constraint violation';
  }

  res.status(status).json({
    success: false,
    status,
    message,
    ...(details && { details }),
    timestamp: new Date().toISOString()
  });
};

export default errorHandler;
