const { placesSearch, placesSearchById } = require('../services/placesApi.js');

exports.placesSearchHandler = async (req, res) => {
  try {
    const response = await placesSearch(req.params.query);
    res.send(response);
  } catch (e) {
    console.error('Something went wrong', e);
    res.sendStatus(500);
  }
};

exports.placesSearchByIdHandler = async (req, res) => {
  try {
    const response = await placesSearchById(req.params.placeId, true);
    res.send(response);
  } catch (e) {
    console.error('Something went wrong', e);
    res.sendStatus(500);
  }
};
