const { placesSearchById } = require('../services/placesApi.js');
const dynamodb = require('../services/dynamodb.js');
const shuffle = require('../../utils/shuffle.js');
const config = require('../../config/main.js');

const HR_MS = 3600000; // hour in ms

const suggestions = {
  generatedAt: null,
  places: []
};

const getSuggestions = async () => {
  const lifetimeThreshold = Date.now() - HR_MS * config.suggestions.suggestionLifetime;

  // only generate new suggestions if lifetime has expired
  if (!suggestions.generatedAt || suggestions.generatedAt <= lifetimeThreshold) {
    const { Items = [] } = await dynamodb.getItems();
    suggestions.places = shuffle(Items).slice(0, config.suggestions.numberOfSuggestions);
    suggestions.generatedAt = Date.now();
  }

  // populate suggestions with fresh data from places api
  const detailedSuggestions = suggestions.places.map(async place =>
    placesSearchById(place.placeId, true)
  );

  return Promise.all(detailedSuggestions);
};

module.exports = getSuggestions;
