const addSuggestion = require('../core/addSuggestion.js');
const visitedSuggestion = require('../core/visitedSuggestion.js');
const getSuggestions = require('../core/getSuggestions.js');
const listSuggestions = require('../core/listSuggestions.js');
const cacheProvider = require('../../utils/cacheProvider.js');

const cache = cacheProvider.getInstance();

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

    // sync cache header (seconds) with internal cache (ms)
    const suggestionTimeLeft = cache.getTtl('suggestions') || 0;
    res.header('Cache-Control', `public, max-age=${suggestionTimeLeft / 1000}`);

    res.send(response);
  } catch (e) {
    console.error('Something went wrong', e);
    res.sendStatus(500);
  }
};

exports.listSuggestionsHandler = async (req, res) => {
  try {
    const response = await listSuggestions();
    res.send(response);
  } catch (e) {
    console.error('Something went wrong', e);
    res.sendStatus(500);
  }
};