const jwt = require('jsonwebtoken');

const verifyAuth = (req, res, next) => {
  try {
    const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    console.log({ decoded });
    res.locals.userName = decoded.userName;
    next();
  } catch (e) {
    return res.sendStatus(401);
  }
};

module.exports = verifyAuth;