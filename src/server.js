const express = require('express');
const {
  placesSearchByIdHandler,
  placesSearchHandler
} = require('./handlers/placesHandler.js');
const { distanceByIdHandler } = require('./handlers/distanceHandler.js');
const {
  addSuggestionHandler,
  visitedSuggestionHandler,
  getSuggestionsHandler
} = require('./handlers/suggestionsHandler.js');

// read env variables from .env
require('dotenv').config();

const PORT = process.env.PORT || 1337;
const app = express();

// allow CORS request from clients
app.use(function(req, res, next) {
  const allowedHeaders = [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authentication'
  ].join(',');

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', allowedHeaders);
  next();
});

// route handlers
app.get('/', (req, res) => res.send('Hello to you good sir!'));

// main
app.post('/suggestion/:placeId', addSuggestionHandler);
app.put('/suggestion/:placeId', visitedSuggestionHandler);
app.get('/suggestion', getSuggestionsHandler);

// utility endpoints
app.get('/search/:query', placesSearchHandler);
app.get('/search/id/:placeId', placesSearchByIdHandler);
app.get('/distance/:placeId', distanceByIdHandler);

app.listen(PORT, () => console.log(`Lunchbot service running on port ${PORT}`));
