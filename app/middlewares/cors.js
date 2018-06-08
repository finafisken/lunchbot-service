const setCorsHeaders = (req, res, next) => {
  const allowedHeaders = [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authentication'
  ].join(',');

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', allowedHeaders);

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
    return res.sendStatus(200);
  }

  next();
};

module.exports = setCorsHeaders;