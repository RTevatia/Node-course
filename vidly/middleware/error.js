module.exports = function (err, req, res, next) {
  // Single log call with all metadata
  logger.error(err.message, {
    metadata: {
      name: err.name,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method,
      ip: req.ip,
      user: req.user ? req.user._id : 'anonymous',
      timestamp: new Date().toISOString()
    }
  });

  // Better error response
  const status = err.status || 500;
  const message = status === 500 ? 'Something failed.' : err.message;
  
  res.status(status).send(message);
};
