const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');
const dynamodb = require('../services/dynamodb.js');

const registerUser = async (body) => {
  // sanitize/validate
  const { userName, password } = body;
  const user = {
    userName,
    password: await bcrypt.hash(password, 10),
    userId: uuid(),
  };
  return dynamodb.addUser(user);
};

module.exports = registerUser;