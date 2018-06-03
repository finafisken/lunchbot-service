const dynamodb = require('../../utils/dynamodb.js');
const config = require('../../config/main.js');

const getSuggestions = async () => {
  const { Items } = await dynamodb.getItems();
  const suggestionsPool = [...Items];
  const suggestions = suggestionsPool
    .sort(() => 0.5 - Math.random())
    .slice(0, config.suggestions.numberOfSuggestions);

  return suggestions;
};

module.exports = getSuggestions;
