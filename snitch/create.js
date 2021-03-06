'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = Date.now();
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.DYNAMODB_TABLE,

    Item: {
      id: uuid.v1(),
      origin: data.origin,
      ref: data.ref,
      href: data.href,
      city: data.city,
      country: data.country,
      isp: data.isp,
      lon: data.lon,
      lat: data.lat,
      timezone: data.timezone,
      zip: data.zip
    },
  };

  // write the todo to the database
  dynamoDb.put(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t create the todo item.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
      },
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });
};
