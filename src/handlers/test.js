import createError from 'http-errors';
import commonMiddleware from '../lib/commonMiddleware'

async function test(event, context) {
    return {
        statusCode: 200,
        body: JSON.stringify({test: 'test'}),
    };
}

export const handler = test
    ;


