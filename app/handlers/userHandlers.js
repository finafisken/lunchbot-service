exports.registerUserHandler = async (req, res) => {
  try {
    res.sendStatus(501);
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