const dynamodb = require('../services/dynamodb.js');

const visitedSuggestion = placeId => dynamodb.updatePlace(placeId);

module.exports = visitedSuggestion;
