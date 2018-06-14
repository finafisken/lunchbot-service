const { placesSearchById } = require('../services/placesApi.js');
const dynamodb = require('../services/dynamodb.js');

const addSuggestion = (placeId, user) =>
  placesSearchById(placeId).then(place =>
    dynamodb.addPlace({ ...place, lastVisitedAt: 0, suggestedBy: user })
  );

module.exports = addSuggestion;
