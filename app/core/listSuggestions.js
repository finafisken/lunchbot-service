const dynamodb = require('../services/dynamodb.js');

const listSuggestions = () => dynamodb.listPlaces();

module.exports = listSuggestions;
