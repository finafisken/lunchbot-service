const NodeCache = require('node-cache');

let cache = null;

// singleton cache so we can reuse it
const getInstance = () => {
  if (!cache) {
    // checkperiod needs to be same as shortest cache lifetime?
    cache = new NodeCache({ checkperiod: 60*5 });
  }
  return cache;
};

// get seconds left of internal cache item
const getSecondsLeft = key => {
  const cache = getInstance();
  const ttlTimestamp = cache.getTtl(key);
  if (!ttlTimestamp) return 0;

  return Math.floor((ttlTimestamp - Date.now()) / 1000);
}

module.exports = {
  getInstance,
  getSecondsLeft,
};