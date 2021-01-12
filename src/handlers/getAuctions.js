import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';
import middy from '@middy/core';
import createError from 'http-errors';

import commonMiddleware from '../lib/commonMiddleware'


const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getAuctions(event, context) {
let auctions;
try {
    const results = await dynamodb.scan({
        TableName: process.env.AUCTIONS_TABLE_NAME,
    }).promise()
    auctions = results.Items;
} catch (error) {
    console.log('🚀 ~ file: getAuctions.js ~ line 17 ~ getAuction ~ error', error)
    throw new createError.InternalServerError(error);
}
    return {
        statusCode: 200,
        body: JSON.stringify(auctions),
    };
}

export const handler = commonMiddleware(getAuctions);


