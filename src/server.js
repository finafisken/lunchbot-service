const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const corsHeaders = require('./middlewares/cors.js');
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

// setup
const PORT = process.env.PORT || 1337;
const app = express();
app.use(helmet());
app.use(morgan('dev'));
app.use(corsHeaders);

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
