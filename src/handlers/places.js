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
        placeId: result.place_id,
        open: result.opening_hours.open_now,
        photos: result.photos.map(photo => {
          return config.api.placesPhoto
            .replace('{ref}', photo.photo_reference)
            .replace('{key}', process.env.GOOGLE_API_KEY);
        }),
      }));
      console.log(response);
      res.send(response);
    } else {
      throw new Error('Missing results from response', data);
    }
  } catch (e) {
    console.log('Something went wrong', e);
    res.sendStatus(500);
  }
  
};

exports.searchById = (req, res) => {

}