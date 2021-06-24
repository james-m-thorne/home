var request = require('request')

exports.handler = (event, context, callback) => {
  const userId = event.userName
  const hasuraAdminSecret = process.env.HASURA_ADMIN_SECRET
  const url = 'https://api.thorney.me/v1/graphql'
  const upsertUserQuery = `
    mutation($userId: String!){
      insert_users(objects: [{ user_id: $userId }], on_conflict: { constraint: users_pkey, update_columns: [] }) {
        affected_rows
      }
    }`
  const graphqlReq = {'query': upsertUserQuery, 'variables': {'userId': userId}}

  request.post({
    headers: {'content-type': 'application/json', 'x-hasura-admin-secret': hasuraAdminSecret},
    url: url,
    body: JSON.stringify(graphqlReq)
  }, function (error, response, body) {
    console.log(body)
    callback(null, userId, context)
  })
}