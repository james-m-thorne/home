
locals {
  lambda_path = "${path.module}/lambda/get_user"
}


module "get_user_lambda" {
  source = "terraform-aws-modules/lambda/aws"

  function_name = "get-user"
  handler       = "lambda_function.main"
  runtime       = "python3.8"
  publish = true
  source_path = local.lambda_path

  attach_policy_statements = true
  policy_statements = {
    dynamodb = {
      effect    = "Allow",
      actions   = ["dynamodb:*"],
      resources = [aws_dynamodb_table.homes-table.arn]
    }
  }

  allowed_triggers = {
    APIGatewayAny = {
      service    = "apigateway"
      source_arn = "${aws_apigatewayv2_api.api.execution_arn}/*/*"
    }
  }
}
