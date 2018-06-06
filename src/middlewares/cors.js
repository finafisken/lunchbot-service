const setCorsHeaders = (req, res, next) => {
  const allowedHeaders = [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authentication'
  ].join(',');

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', allowedHeaders);
  next();
};

module.exports = setCorsHeaders;