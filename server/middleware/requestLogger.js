const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    const logLine = [
      `[${new Date().toISOString()}]`,
      req.method,
      req.originalUrl,
      res.statusCode,
      `${duration}ms`
    ].join(" ");

    if (res.statusCode >= 500) {
      console.error(logLine);
    } else if (res.statusCode >= 400) {
      console.warn(logLine);
    } else {
      console.log(logLine);
    }
  });

  next();
};

export default requestLogger;
