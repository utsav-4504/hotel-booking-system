// Request Logger Middleware
const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  // Log response when it finishes
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const log = {
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString()
    };

    // Log in different colors based on status
    if (res.statusCode >= 400) {
      console.error('❌', JSON.stringify(log));
    } else if (res.statusCode >= 300) {
      console.warn('⚠️ ', JSON.stringify(log));
    } else {
      console.log('✓ ', JSON.stringify(log));
    }
  });

  next();
};

export default requestLogger;
