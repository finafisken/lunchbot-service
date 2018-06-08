const axios = require('axios');
const config = require('../../config');
const { placesFormatter, placesDetailFormatter } = require('../../utils/formatter.js');

exports.placesSearch = query => {
  return axios
    .get(config.api.placesSearch, {
      params: {
        query,
        key: process.env.GOOGLE_API_KEY
      }
    })
    .then(({ data }) => {
      if (data && data.status === 'OK' && data.results) {
        return data.results.map(placesFormatter);
      } else {
        const reason = (data && data.status) || 'Bad response from API';
        return Promise.reject(reason);
      }
    });
};

exports.placesSearchById = (placeid, detailed) => {
  return axios
    .get(config.api.placesDetail, {
      params: {
        placeid,
        key: process.env.GOOGLE_API_KEY
      }
    })
    .then(({ data }) => {
      if (data && data.status === 'OK' && data.result) {
        const format = detailed ? placesDetailFormatter : placesFormatter;
        return format(data.result);
      } else {
        const reason = (data && data.status) || 'Bad response from API';
        return Promise.reject(reason);
      }
    });
};
