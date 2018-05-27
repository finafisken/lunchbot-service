const axios = require('axios');
const config = require('../../config/main.js');
const { placesFormatter } = require('./formatter.js');

exports.placesSearch = async (req, res) => {
  try {
    const { data } = await axios.get(config.api.placesSearch, {
      params: {
        query: req.params.query,
        key: process.env.GOOGLE_API_KEY
      }
    });
    if (data && data.status === 'OK' && data.results) {
      const response = data.results.map(placesFormatter);
      res.send(response);
    } else {
      throw new Error('Bad response from Places API');
    }
  } catch (e) {
    console.error('Something went wrong', e);
    res.sendStatus(500);
  }
};

exports.placesSearchById = async (req, res) => {
  try {
    const { data } = await axios.get(config.api.placesDetail, {
      params: {
        placeid: req.params.placeId,
        key: process.env.GOOGLE_API_KEY
      }
    });
    if (data && data.status === 'OK' && data.result) {
      const response = placesFormatter(data.result);
      res.send(response);
    } else {
      throw new Error('Bad response from Places API');
    }
  } catch (e) {
    console.error('Something went wrong', e);
    res.sendStatus(500);
  }
};
