const config = {
  api: {
    placesSearch: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
    placesPhoto: 'https://maps.googleapis.com/maps/api/place/photo?photoreference={ref}&key={key}',
    placesDetail: 'https://maps.googleapis.com/maps/api/place/details/json',
    distanceMatrix: 'https://maps.googleapis.com/maps/api/distancematrix/json'
  },
  originPointCoord: {
    // MTG Office Ringvägen 52
    lat: 59.3100131,
    lng: 18.0592603
  }
};

module.exports = config;
