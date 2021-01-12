import AWS from 'aws-sdk';
import createError from 'http-errors';
import commonMiddleware from '../lib/commonMiddleware'


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

export const handler = commonMiddleware(getAuction)
    ;


