const generatePolicy = function (principalId, effect, resource) {
    const authResponse = {};
    authResponse.principalId = principalId;
    if (effect && resource) {
        const policyDocument = {};
        policyDocument.Version = '2012-10-17';
        policyDocument.Statement = [];
        const statementOne = {};
        statementOne.Action = 'execute-api:Invoke';
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    return authResponse;
};

const auth = (event, context, callback) => {
    console.log('🚀 ~ file: auth.js ~ line 11 ~ auth ~ event', event)
    console.log('🚀 ~ file: auth.js ~ line 11 ~ auth ~ context', context)
    console.log(event);
    console.log("==================");
    console.log("Authorization: ", event.headers["Authorization"]);
    console.log("==================");

    var token = event.headers["Authorization"];
    /*
     *
     * extra custom authorization logic here: OAUTH, JWT ... etc
     *
     */

    // In this example, the token is treated as the status for simplicity.
    switch (token) {
        case 'allow':
            callback(null, generatePolicy('user', 'Allow', event.methodArn));
            break;
        case 'deny':
            callback(null, generatePolicy('user', 'Deny', event.methodArn));
            break;
        case 'unauthorized':
            callback('Unauthorized!!');
            break;
        default:
            callback('Error!!');
    }
};


export const handler = auth;