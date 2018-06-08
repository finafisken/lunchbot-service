const { distanceById } = require('../services/distanceApi');

exports.distanceByIdHandler = async (req, res) => {
  try {
    const response = await distanceById(req.params.placeId);
    res.send(response);
  } catch (e) {
    console.error('Something went wrong', e);
    res.sendStatus(500);
  }
};
