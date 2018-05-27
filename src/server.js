const express = require('express');
const { placesSearchById, placesSearch } = require('./handlers/places.js');
const distance = require('./handlers/distance.js');

// read env variables from .env
require('dotenv').config();

const PORT = process.env.PORT || 1337;
const app = express();

// route handlers
app.get('/', (req, res) => res.send('Well, hello to you good sir!'));
app.get('/search/:query', placesSearch);
app.get('/search/id/:placeId', placesSearchById);
app.get('/distance/:placeId', distance);

app.listen(PORT, () => console.log(`Lunchbot service running on port ${PORT}`));
