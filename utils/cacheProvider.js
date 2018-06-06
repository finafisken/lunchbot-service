const NodeCache = require('node-cache');

let cache = null;

// singleton cache so we can reuse it
exports.getInstance = () => {
  if (!cache) {
    // checkperiod needs to be same as shortest cache lifetime?
    cache = new NodeCache({ checkperiod: 60*5 });
  }
  return cache;
};