const express = require('express');
const places = require('./handlers/places.js');

const app = express();

// set up env variables from .env
require('dotenv').config()

app.get('/place-search/:query', places.search);

app.listen(1337, () => console.log('Lunchbot service running on port 1337'));