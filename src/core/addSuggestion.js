const { placesSearchById } = require('../services/placesApi.js');
const dynamodb = require('../services/dynamodb.js');

const addSuggestion = placeId =>
  placesSearchById(placeId).then(place =>
    dynamodb.addItem({ ...place, lastVisitedAt: 0 })
  );

module.exports = addSuggestion;
