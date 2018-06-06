const dynamodb = require('../services/dynamodb.js');

const visitedSuggestion = placeId => dynamodb.updateItem(placeId);

module.exports = visitedSuggestion;
