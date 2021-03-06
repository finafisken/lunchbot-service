const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const corsHeaders = require('./app/middlewares/cors.js');
const verifyAuth = require('./app/middlewares/verifyAuth.js');
const {
  placesSearchByIdHandler,
  placesSearchHandler
} = require('./app/handlers/placesHandler.js');
const { distanceByIdHandler } = require('./app/handlers/distanceHandler.js');
const {
  addSuggestionHandler,
  visitedSuggestionHandler,
  getSuggestionsHandler,
  listSuggestionsHandler
} = require('./app/handlers/suggestionsHandler.js');
const {
  registerUserHandler,
  authenticateUserHandler
} = require('./app/handlers/userHandlers.js');

// read env variables from .env
require('dotenv').config();

// setup
const PORT = process.env.PORT || 1337;
const app = express();
const jsonParser = bodyParser.json();

// apply middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(corsHeaders);

// route handlers
app.get('/', (req, res) => res.send('Hello to you good sir!'));

// main
app.post('/suggestion/:placeId', verifyAuth, addSuggestionHandler);
app.put('/suggestion/:placeId', verifyAuth, visitedSuggestionHandler);
app.get('/suggestion', getSuggestionsHandler);
app.get('/suggestion/list', listSuggestionsHandler);

// user
app.post('/user', jsonParser, registerUserHandler);
app.post('/user/auth', jsonParser, authenticateUserHandler);

// utility endpoints
app.get('/search/:query', verifyAuth, placesSearchHandler);
app.get('/search/id/:placeId', verifyAuth, placesSearchByIdHandler);
app.get('/distance/:placeId', verifyAuth, distanceByIdHandler);

app.listen(PORT, () => console.log(`Lunchbot service running on port ${PORT} with ${process.env.NODE_ENV} config`));
