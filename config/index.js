const configs = {
  development: require('./development.js'),
  staging: require('./staging.js'),
  production: require('./production.js'),
};

const env = process.env.NODE_ENV || 'development';

module.exports = configs[env];