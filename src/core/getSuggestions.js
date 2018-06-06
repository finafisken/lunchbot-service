const { placesSearchById } = require('../services/placesApi.js');
const dynamodb = require('../services/dynamodb.js');
const shuffle = require('../../utils/shuffle.js');
const config = require('../../config/main.js');
const cacheProvider = require('../../utils/cacheProvider.js');

const cache = cacheProvider.getInstance();
const suggestionLifetime = 3600 * config.suggestions.suggestionLifetime;
const detailsLifetime = 5 * 60;

const getSuggestions = async () => {
  let suggestions = cache.get('suggestions');

  if (!suggestions) {
    const { Items = [] } = await dynamodb.getItems();
    suggestions = shuffle(Items).slice(0, config.suggestions.numberOfSuggestions);
    cache.set('suggestions', suggestions, suggestionLifetime);
    cache.del('detailedSuggestions');
  }

  // populate suggestions with fresh data from places api (small cache)
  let detailedSuggestions = cache.get('detailedSuggestions');

  if (!detailedSuggestions) {
    const getDetails = suggestions.map(place => placesSearchById(place.placeId, true));
    detailedSuggestions = await Promise.all(getDetails);
    cache.set('detailedSuggestions', detailedSuggestions, detailsLifetime);
  }

  return detailedSuggestions;
};

module.exports = getSuggestions;
