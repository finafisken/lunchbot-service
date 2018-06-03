const AWS = require('aws-sdk');
const config = require('../config/main.js');

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html

const DAY_MS = 86400000; // 24 hours in ms

exports.addItem = Item =>
  new Promise((resolve, reject) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient({
      region: config.awsRegion,
      accessKeyId: process.env.AWS_KEY_ID,
      secretAccessKey: process.env.AWS_KEY_SECRET
    });
    dynamodb.put(
      {
        TableName: config.dynamoDbTableName,
        Item,
        ConditionExpression: 'attribute_not_exists(placeId)'
      },
      (err, data) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(Item);
        }
      }
    );
  });

exports.updateItem = placeId =>
  new Promise((resolve, reject) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient({
      region: config.awsRegion,
      accessKeyId: process.env.AWS_KEY_ID,
      secretAccessKey: process.env.AWS_KEY_SECRET
    });
    dynamodb.update(
      {
        TableName: config.dynamoDbTableName,
        Key: { placeId },
        UpdateExpression: 'set lastVisitedAt = :timestamp',
        ExpressionAttributeValues: {
          ':timestamp': Date.now()
        },
        ReturnValues: 'ALL_NEW'
      },
      (err, data) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(data);
        }
      }
    );
  });

exports.getItems = () =>
  new Promise((resolve, reject) => {
    const lastVisitedThreshold =
      Date.now() - config.suggestions.daysSinceLastVisit * DAY_MS;
    const dynamodb = new AWS.DynamoDB.DocumentClient({
      region: config.awsRegion,
      accessKeyId: process.env.AWS_KEY_ID,
      secretAccessKey: process.env.AWS_KEY_SECRET
    });
    dynamodb.scan(
      {
        TableName: config.dynamoDbTableName,
        FilterExpression: 'lastVisitedAt <= :lastVisitedThreshold',
        ExpressionAttributeValues: {
          ':lastVisitedThreshold': lastVisitedThreshold
        }
      },
      (err, data) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(data);
        }
      }
    );
  });
