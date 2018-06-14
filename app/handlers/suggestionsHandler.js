const addSuggestion = require('../core/addSuggestion.js');
const visitedSuggestion = require('../core/visitedSuggestion.js');
const getSuggestions = require('../core/getSuggestions.js');

exports.addSuggestionHandler = async (req, res) => {
  try {
    const response = await addSuggestion(req.params.placeId, res.locals.userName);
    res.status(201).send(response);
  } catch (e) {
    console.error('Something went wrong', e);
    res.sendStatus(500);
  }
};

exports.visitedSuggestionHandler = async (req, res) => {
  try {
    const response = await visitedSuggestion(req.params.placeId);
    res.send(response);
  } catch (e) {
    console.error('Something went wrong', e);
    res.sendStatus(500);
  }
};

exports.getSuggestionsHandler = async (req, res) => {
  try {
    const response = await getSuggestions();
    res.send(response);
  } catch (e) {
    console.error('Something went wrong', e);
    res.sendStatus(500);
  }
};