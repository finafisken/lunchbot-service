const AWS = require('aws-sdk');

// configure aws here

const addSuggestion = (place) => new Promise((resolve, reject) => {
  var dynamodb = new AWS.DynamoDB.DocumentClient();
  resolve('Suggestion was added!');
});

exports = addSuggestion;