const config = require('../config/main.js');

const photoFormatter = photos => {
  if (!Array.isArray(photos)) return [];
  return photos.map(photo =>
    config.api.placesPhoto
      .replace('{ref}', photo.photo_reference)
      .replace('{key}', process.env.GOOGLE_API_KEY)
  );
};

const placesFormatter = ({
  geometry,
  name,
  place_id,
  website,
  formatted_address,
}) => ({
  name,
  website,
  geolocation: geometry.location,
  address: formatted_address,
  placeId: place_id,
});

const placesDetailFormatter = ({
  geometry,
  name,
  rating,
  place_id,
  opening_hours,
  website,
  url,
  formatted_address,
  photos
}) => ({
  name,
  rating,
  website,
  mapsUrl: url,
  geolocation: geometry.location,
  address: formatted_address,
  placeId: place_id,
  open: opening_hours.open_now,
  photos: photoFormatter(photos.slice(0, 3))
});

const distanceFormatter = ({
  destination_addresses,
  origin_addresses,
  rows
}) => ({
  from: origin_addresses[0],
  to: destination_addresses[0],
  distance: rows[0].elements[0].distance.text,
  time: rows[0].elements[0].duration.text
});

exports.photoFormatter = photoFormatter;
exports.placesFormatter = placesFormatter;
exports.placesDetailFormatter = placesDetailFormatter;
exports.distanceFormatter = distanceFormatter;
