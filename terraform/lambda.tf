
module "lambda_add_hasura_jwt_claims" {
  source = "terraform-aws-modules/lambda/aws"

  function_name = "add_hasura_jwt_claims"
  handler       = "lambda_function.handler"
  runtime       = "nodejs12.x"
  publish       = true
  source_path   = "${path.module}/lambda/add_hasura_jwt_claims"
  reserved_concurrent_executions = 10
  allowed_triggers = {
    Cognito = {
      principal  = "cognito-idp.amazonaws.com"
      source_arn = aws_cognito_user_pool.cognito_pool.arn
    }
  }
}

module "lambda_sync_hasura_users" {
  source = "terraform-aws-modules/lambda/aws"

  function_name = "sync_hasura_users"
  handler       = "lambda_function.handler"
  runtime       = "nodejs12.x"
  publish       = true
  source_path   = "${path.module}/lambda/sync_hasura_users"
  reserved_concurrent_executions = 10
  allowed_triggers = {
    Cognito = {
      principal  = "cognito-idp.amazonaws.com"
      source_arn = aws_cognito_user_pool.cognito_pool.arn
    }
  }
}