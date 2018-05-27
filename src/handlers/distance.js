const axios = require('axios');
const config = require('../../config/main.js');
const { distanceFormatter } = require('./formatter');

const distance = async (req, res) => {
  try {
    const { data } = await axios.get(config.api.distanceMatrix, {
      params: {
        origins: `${config.originPointCoord.lat},${config.originPointCoord.lng}`,
        destinations: `place_id:${req.params.placeId}`,
        units: 'metric',
        mode: 'walking',
        key: process.env.GOOGLE_API_KEY
      }
    });
    if (data && data.status === 'OK') {
      const response = distanceFormatter(data);
      res.send(response);
    } else {
      throw new Error('Bad response from Distance API');
    }
  } catch (e) {
    console.error('Something went wrong', e);
    res.sendStatus(500);
  }
};

module.exports = distance;
