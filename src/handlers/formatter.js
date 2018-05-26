const config = require('../../config/main.js');

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
  rating,
  place_id,
  opening_hours,
  website,
  formatted_address,
  photos
}) => ({
  name,
  rating,
  website,
  geolocation: geometry.location,
  address: formatted_address,
  placeId: place_id,
  open: opening_hours.open_now,
  photos: photoFormatter(photos)
});

exports.photoFormatter = photoFormatter;
exports.placesFormatter = placesFormatter;
