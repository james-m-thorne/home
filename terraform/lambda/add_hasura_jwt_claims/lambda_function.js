exports.handler = (event, context, callback) => {
    event.response = {
        "claimsOverrideDetails": {
            "claimsToAddOrOverride": {
                "https://hasura.io/jwt/claims": JSON.stringify({
                    "x-hasura-user-id": event.request.userAttributes.sub,
                    "x-hasura-default-role": "user",
                    // do some custom logic to decide allowed roles
                    "x-hasura-allowed-roles": ["user"],
                })
            }
        }
    }
    callback(null, event)
}