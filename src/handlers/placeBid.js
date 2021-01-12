import AWS from 'aws-sdk';
import createError from 'http-errors';
import commonMiddleware from '../lib/commonMiddleware'


const dynamodb = new AWS.DynamoDB.DocumentClient();

async function placeBid(event, context) {
    let updatedAuction;
    const { id } = event.pathParameters;
    const { amount } = event.body;
    const params ={
        TableName: process.env.AUCTIONS_TABLE_NAME,
        Key: { id },
        UpdateExpression: 'set highestBid.amount = :amount',
        ExpressionAttributeValues: {
            ':amount': amount
        },
        ReturnValues: 'ALL_NEW',
    }
    try {
        const result = await dynamodb.update(params).promise();
        updatedAuction = result.Attributes;

    } catch (error) {
        console.log('🚀 ~ file: getAuctions.js ~ line 17 ~ getAuction ~ error', error)
        throw new createError.InternalServerError(error);
    }
    return {
        statusCode: 200,
        body: JSON.stringify(updatedAuction),
    };
}

export const handler = commonMiddleware(placeBid);


