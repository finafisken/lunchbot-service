const AWS = require('aws-sdk');
const config = require('../../config');

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html

const DAY_MS = 86400000; // 24 hours in ms

// Places DB

exports.addPlace = Item =>
  new Promise((resolve, reject) => {
    const dbconfig = {
      region: config.aws.region,
      accessKeyId: process.env.AWS_KEY_ID,
      secretAccessKey: process.env.AWS_KEY_SECRET
    };
    if (process.env.NODE_ENV === 'development') {
      dbconfig.endpoint = 'http://local_dynamo_db:8000';
    }
    const dynamodb = new AWS.DynamoDB.DocumentClient(dbconfig);
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
    const dbconfig = {
      region: config.aws.region,
      accessKeyId: process.env.AWS_KEY_ID,
      secretAccessKey: process.env.AWS_KEY_SECRET
    };
    if (process.env.NODE_ENV === 'development') {
      dbconfig.endpoint = 'http://local_dynamo_db:8000';
    }
    const dynamodb = new AWS.DynamoDB.DocumentClient(dbconfig);
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
    const dbconfig = {
      region: config.aws.region,
      accessKeyId: process.env.AWS_KEY_ID,
      secretAccessKey: process.env.AWS_KEY_SECRET
    };
    if (process.env.NODE_ENV === 'development') {
      dbconfig.endpoint = 'http://local_dynamo_db:8000';
    }
    const dynamodb = new AWS.DynamoDB.DocumentClient(dbconfig);
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

exports.listPlaces = () =>
  new Promise((resolve, reject) => {
    const lastVisitedThreshold =
      Date.now() - config.suggestions.daysSinceLastVisit * DAY_MS;
    const dbconfig = {
      region: config.aws.region,
      accessKeyId: process.env.AWS_KEY_ID,
      secretAccessKey: process.env.AWS_KEY_SECRET
    };
    if (process.env.NODE_ENV === 'development') {
      dbconfig.endpoint = 'http://local_dynamo_db:8000';
    }
    const dynamodb = new AWS.DynamoDB.DocumentClient(dbconfig);
    dynamodb.scan(
      {
        TableName: config.aws.locationsDb
        // FilterExpression: 'lastVisitedAt <= :lastVisitedThreshold',
        // ExpressionAttributeValues: {
        //   ':lastVisitedThreshold': lastVisitedThreshold
        // }
      },
      (err, { Items = [] }) => {
				console.log(err);
        if (err) {
          return reject(err);
        } else {
          return resolve(Items);
        }
      }
    );
  });

// Users DB

exports.addUser = Item =>
  new Promise((resolve, reject) => {
    const dbconfig = {
      region: config.aws.region,
      accessKeyId: process.env.AWS_KEY_ID,
      secretAccessKey: process.env.AWS_KEY_SECRET
    };
    if (process.env.NODE_ENV === 'development') {
      dbconfig.endpoint = 'http://local_dynamo_db:8000';
    }
    const dynamodb = new AWS.DynamoDB.DocumentClient(dbconfig);
    dynamodb.put(
      {
        TableName: config.aws.usersDb,
        Item,
        ConditionExpression: 'attribute_not_exists(userName)'
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

exports.getUser = userName =>
  new Promise((resolve, reject) => {
    const dbconfig = {
      region: config.aws.region,
      accessKeyId: process.env.AWS_KEY_ID,
      secretAccessKey: process.env.AWS_KEY_SECRET
    };
    if (process.env.NODE_ENV === 'development') {
      dbconfig.endpoint = 'http://local_dynamo_db:8000';
    }
    const dynamodb = new AWS.DynamoDB.DocumentClient(dbconfig);
    dynamodb.get(
      {
        TableName: config.aws.usersDb,
        Key: {
          userName: userName
        }
      },
      (err, { Item = {} }) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(Item);
        }
      }
    );
  });
