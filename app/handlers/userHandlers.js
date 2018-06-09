const registerUser = require('../users/register.js');

exports.registerUserHandler = async (req, res) => {
  try {
    const response = await registerUser(req.body)
    //res.sendStatus(501);
    res.send(response);
  } catch (e) {
    console.error('Something went wrong', e);
    res.sendStatus(500);
  }
};

exports.authenticateUserHandler = async (req, res) => {
  try {
    res.sendStatus(501);
  } catch (e) {
    console.error('Something went wrong', e);
    res.sendStatus(500);
  }
};