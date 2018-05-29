const addSuggestion = require('../core/addSuggestion.js');

exports.addSuggestionHandler = (req, res) => {
  try {
    const response = await addSuggestion(req.params.placeId);
    res.send(response);
  } catch (e) {
    console.error('Something went wrong', e);
    res.sendStatus(500);
  }
};

exports.visitedSuggestionHandler = (req, res) => res.send('Visited suggestion');
exports.getSuggestionsHandler = (req, res) => res.send('Here are some suggestions');