const dynamodb = require('../services/dynamodb.js');

const sortByLastvisited = (a, b) => {
  if (a.lastVisitedAt === b.lastVisitedAt) return 0;
  return a.lastVisitedAt < b.lastVisitedAt ? -1 : 1;
};

const listSuggestions = async () => {
  const places = await dynamodb.listPlaces();
  return places.sort(sortByLastvisited);
}

module.exports = listSuggestions;
