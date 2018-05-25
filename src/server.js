const express = require('express');
const places = require('./handlers/places.js');

// read env variables from .env
require('dotenv').config();

const PORT = process.env.PORT || 1337;
const app = express();

// route handlers
app.get('/', (req, res) => res.send('Well, hello to you good sir!'));
app.get('/place-search/:query', places.search);
app.get('/place-search-id/:placeId', places.searchById);

app.listen(PORT, () => console.log(`Lunchbot service running on port ${PORT}`));
