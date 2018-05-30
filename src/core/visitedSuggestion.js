const dynamodb = require('../../utils/dynamodb.js');

const visitedSuggestion = placeId => dynamodb.updateItem(placeId);

module.exports = visitedSuggestion;
