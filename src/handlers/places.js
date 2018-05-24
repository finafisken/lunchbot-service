const axios = require('axios');
const config = require('../../config/main.js');

exports.search = async (req, res) => {
  try {
    const { data } = await axios.get(config.api.placesSearch, {
      params: {
        query: req.params.query,
        key: process.env.GOOGLE_API_KEY,
      }
    });
    if (data && data.results) {
      const response = data.results.map(result => ({
        geolocation: result.geometry.location,
        name: result.name,
        address: result.formatted_address,
        placeId: result.place_id,
        rating: result.rating,
        open: result.opening_hours.open_now,
        photos: result.photos.map(photo => {
          return config.api.placesPhoto
            .replace('{ref}', photo.photo_reference)
            .replace('{key}', process.env.GOOGLE_API_KEY);
        }),
      }));
      res.send(response);
    } else {
      throw new Error('Missing results from response', data);
    }
  } catch (e) {
    console.log('Something went wrong', e);
    res.sendStatus(500);
  }
  
};

exports.searchById = async (req, res) => {
  try {
    const { data } = await axios.get(config.api.placesDetail, {
      params: {
        placeid: req.params.placeId,
        key: process.env.GOOGLE_API_KEY,
      }
    });
    if (data && data.status === 'OK' && data.result) {
      const { geometry, name, rating, place_id, opening_hours, website, formatted_address } = data.result;
      const response = {
        geolocation: geometry.location,
        name,
        rating,
        website,
        address: formatted_address,
        placeId: place_id,
        open: opening_hours.open_now,
      };
      res.send(response);
    } else {
      throw new Error('Missing result from response', data);
    }
  } catch (e) {
    console.log('Something went wrong', e);
    res.sendStatus(500);
  }
}