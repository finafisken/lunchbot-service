const AWS = require('aws-sdk');
const config = require('../../config');

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html

const DAY_MS = 86400000; // 24 hours in ms

exports.addPlace = Item =>
  new Promise((resolve, reject) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient({
      region: config.aws.region,
      accessKeyId: process.env.AWS_KEY_ID,
      secretAccessKey: process.env.AWS_KEY_SECRET
    });
    dynamodb.put(
      {
        TableName: config.aws.locationsDb,
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

exports.updatePlace = placeId =>
  new Promise((resolve, reject) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient({
      region: config.aws.region,
      accessKeyId: process.env.AWS_KEY_ID,
      secretAccessKey: process.env.AWS_KEY_SECRET
    });
    dynamodb.update(
      {
        TableName: config.aws.locationsDb,
        Key: { placeId },
        UpdateExpression: 'set lastVisitedAt = :timestamp',
        ExpressionAttributeValues: {
          ':timestamp': Date.now()
        },
        ConditionExpression: 'attribute_exists(placeId)',
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

exports.getPlaces = () =>
  new Promise((resolve, reject) => {
    const lastVisitedThreshold =
      Date.now() - config.suggestions.daysSinceLastVisit * DAY_MS;
    const dynamodb = new AWS.DynamoDB.DocumentClient({
      region: config.aws.region,
      accessKeyId: process.env.AWS_KEY_ID,
      secretAccessKey: process.env.AWS_KEY_SECRET
    });
    dynamodb.scan(
      {
        TableName: config.aws.locationsDb,
        FilterExpression: 'lastVisitedAt <= :lastVisitedThreshold',
        ExpressionAttributeValues: {
          ':lastVisitedThreshold': lastVisitedThreshold
        }
      },
      (err, { Items = [] }) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(Items);
        }
      }
    );
  });
