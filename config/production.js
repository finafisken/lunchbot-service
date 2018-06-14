const config = {
  env: 'production',
  api: {
    placesSearch: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
    placesPhoto: 'https://maps.googleapis.com/maps/api/place/photo?photoreference={ref}&key={key}&maxwidth=800',
    placesDetail: 'https://maps.googleapis.com/maps/api/place/details/json',
    distanceMatrix: 'https://maps.googleapis.com/maps/api/distancematrix/json'
  },
  originPointCoord: {
    // MTG Office Ringvägen 52
    lat: 59.3100131,
    lng: 18.0592603
  },
  aws: {
    locationsDb: 'lunchbot-location-db',
    usersDb: 'lunchbot-user-db',
    region: 'eu-central-1',
  },
  suggestions: {
    daysSinceLastVisit: 5,
    numberOfSuggestions: 3,
    suggestionLifetime: 6, // hours
  }
};

module.exports = config;
