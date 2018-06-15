const registerUser = require('../users/register.js');
const authenticateUser = require('../users/authenticate.js');

exports.registerUserHandler = async (req, res) => {
  try {
    await registerUser(req.body);
    res.send('User created');
  } catch (e) {
    console.error('Something went wrong', e);
    res.sendStatus(500);
  }
};

exports.authenticateUserHandler = async (req, res) => {
  try {
    const response = await authenticateUser(req.body);
    res.send(response);
  } catch (e) {
    console.error('Something went wrong', e);
    if (e.status === 401) {
      res.sendStatus(401);
    } else {
      res.sendStatus(500);
    }
  }
};