const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dynamodb = require('../services/dynamodb.js');

const authenticateUser = async body => {
  const { userName, password } = body;
  return dynamodb
    .getUser(userName)
    .then(user => bcrypt.compare(password, user.password))
    .then(validPassword => {
      if (!validPassword) {
        return Promise.reject();
      }
      const token = jwt.sign({ userName }, process.env.JWT_KEY, { expiresIn: '1h' });
      return { user: userName, token };
    })
    .catch(err => Promise.reject({ status: 401, message: 'Auth failed' }));
};

module.exports = authenticateUser;
