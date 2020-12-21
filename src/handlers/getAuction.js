import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from '@middy/http-error-handler';
import createError from 'http-errors';


const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getAuction(event, context) {
    let auctions;
    const { id } = event.pathParameters;
    try {
        const results = await dynamodb.get({
            TableName: process.env.AUCTIONS_TABLE_NAME,
            Key: { id },
        }).promise()
        auctions = results.Item;

    } catch (error) {
        console.log('🚀 ~ file: getAuctions.js ~ line 17 ~ getAuction ~ error', error)
        throw new createError.InternalServerError(error);
    }

    if(!auctions){
        throw new createError.NotFound(`Auction with ${id} is non exists` );
    }
    return {
        statusCode: 200,
        body: JSON.stringify(auctions),
    };
}

export const handler = middy(getAuction)
    .use(httpJsonBodyParser())
    .use(httpEventNormalizer())
    .use(httpErrorHandler())
    ;


