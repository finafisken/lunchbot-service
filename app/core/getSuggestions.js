const { placesSearchById } = require('../services/placesApi.js');
const { distanceById } = require('../services/distanceApi.js');
const dynamodb = require('../services/dynamodb.js');
const shuffle = require('../../utils/shuffle.js');
const config = require('../../config');
const cacheProvider = require('../../utils/cacheProvider.js');

const cache = cacheProvider.getInstance();
const suggestionLifetime = 3600 * config.suggestions.suggestionLifetime;
const detailsLifetime = 5 * 60;

const getSuggestions = async () => {
  let suggestions = cache.get('suggestions');

  if (!suggestions) {
    const places = await dynamodb.getPlaces();
    suggestions = shuffle(places).slice(0, config.suggestions.numberOfSuggestions);

    cache.set('suggestions', suggestions, suggestionLifetime);
    cache.del('enhancedSuggestions');
  }

  // populate suggestions with fresh data from places/distance api (small cache)
  let enhancedSuggestions = cache.get('enhancedSuggestions');

  if (!enhancedSuggestions) {
    let detailedSuggestions = await Promise.all(
      suggestions.map(({ placeId }) => placesSearchById(placeId, true))
    );
    const distances = await Promise.all(
      suggestions.map(({ placeId }) => distanceById(placeId))
    );

    detailedSuggestions = detailedSuggestions.map((place, i) => {
      const { lastVisitedAt, suggestedBy } = suggestions[i];
      const { distance, time } = distances[i];
      return { ...place, distance, time, suggestedBy, lastVisitedAt };
    });

    const generatedAt = new Date().toUTCString();
    const expiresAt = new Date(Date.now() + suggestionLifetime * 1000).toUTCString();

    enhancedSuggestions = {
      generatedAt,
      expiresAt,
      suggestions: detailedSuggestions,
    };

    cache.set('enhancedSuggestions', enhancedSuggestions, detailsLifetime);
  }

  return enhancedSuggestions;
};

module.exports = getSuggestions;
