const bcrypt = require('bcrypt');
const dynamodb = require('../services/dynamodb.js');

const registerUser = async (body) => {
  const { userName, password } = body;
  const user = {
    userName,
    password: await bcrypt.hash(password, 10),
  };
  return dynamodb.addUser(user);
};

module.exports = registerUser;