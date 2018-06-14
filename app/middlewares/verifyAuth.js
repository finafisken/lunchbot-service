const jwt = require('jsonwebtoken');

const verifyAuth = (req, res, next) => {
  try {
    const decoded = jwt.verify(); // req.something here
    res.locals.user = decoded.user;
    next();
  } catch (e) {
    return res.sendStatus(401);
  }
};

module.exports = verifyAuth;