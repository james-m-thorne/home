var request = require('request')

exports.handler = (event, context, callback) => {
  const userId = event.request.userAttributes.sub
  const email = event.userName
  const hasuraAdminSecret = process.env.HASURA_ADMIN_SECRET
  const url = 'https://api.thorne.net.nz/v1/graphql'
  const upsertUserQuery = `
    mutation($userId: uuid, $email: String!) {
      insert_users(objects: {user_id: $userId, email: $email}, on_conflict: {constraint: users_email_key, update_columns: []}) {
        affected_rows
      }
    }`
  const graphqlReq = {'query': upsertUserQuery, "variables": { "userId": userId, "email": email }}

  request.post({
    headers: {'content-type': 'application/json', 'x-hasura-admin-secret': hasuraAdminSecret},
    url: url,
    body: JSON.stringify(graphqlReq)
  }, function (error, response, body) {
    console.log(body)
    if (body.errors) {
      callback(event)
    } else {
      callback(null, event)
    }
  })
}