const express = require('express');
const { placesSearchByIdHandler, placesSearchHandler } = require('./handlers/placesHandler.js');
const { distanceByIdHandler } = require('./handlers/distanceHandler.js');

// read env variables from .env
require('dotenv').config();

const PORT = process.env.PORT || 1337;
const app = express();

// route handlers
app.get('/', (req, res) => res.send('Well, hello to you good sir!'));
app.get('/search/:query', placesSearchHandler);
app.get('/search/id/:placeId', placesSearchByIdHandler);
app.get('/distance/:placeId', distanceByIdHandler);

app.listen(PORT, () => console.log(`Lunchbot service running on port ${PORT}`));
