const axios = require('axios');
const config = require('../../config');
const { distanceFormatter } = require('../../utils/formatter.js');

exports.distanceById = placeId => {
  return axios
    .get(config.api.distanceMatrix, {
      params: {
        origins: `${config.originPointCoord.lat},${
          config.originPointCoord.lng
        }`,
        destinations: `place_id:${placeId}`,
        units: 'metric',
        mode: 'walking',
        key: process.env.GOOGLE_API_KEY
      }
    })
    .then(({ data }) => {
      if (data && data.status === 'OK') {
        return distanceFormatter(data);
      } else {
        const reason = (data && data.status) || 'Bad response from API';
        return Promise.reject(reason);
      }
    });
};
