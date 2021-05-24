resource "aws_apigatewayv2_api" "api" {
  name            = "Home Finder API"
  description     = "API to proxy to external services"
  protocol_type   = "HTTP"
  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["GET", "POST",]
  }
}

resource "aws_apigatewayv2_stage" "api_stage" {
  api_id      = aws_apigatewayv2_api.api.id
  name        = "prod"
  auto_deploy = true

  default_route_settings {
    throttling_burst_limit = 10
    throttling_rate_limit  = 100
  }
}

resource "aws_apigatewayv2_api_mapping" "api_mapping" {
  api_id      = aws_apigatewayv2_api.api.id
  domain_name = aws_apigatewayv2_domain_name.api_domain.id
  stage       = aws_apigatewayv2_stage.api_stage.id
}

resource "aws_apigatewayv2_integration" "api_integration_map" {
  api_id           = aws_apigatewayv2_api.api.id
  integration_type = "HTTP_PROXY"
  integration_uri  = "https://gateway.homes.co.nz/map/dots"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "api_route_map" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "POST /map"
  target = "integrations/${aws_apigatewayv2_integration.api_integration_map.id}"
}

resource "aws_apigatewayv2_integration" "api_integration_plan" {
  api_id           = aws_apigatewayv2_api.api.id
  integration_type = "HTTP_PROXY"
  integration_uri  = "https://api.at.govt.nz/journeyplanner/v2/plan"
  integration_method = "GET"
}

resource "aws_apigatewayv2_route" "api_route_plan" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "GET /plan"
  target = "integrations/${aws_apigatewayv2_integration.api_integration_plan.id}"
}

resource "aws_apigatewayv2_integration" "api_integration_property" {
  api_id           = aws_apigatewayv2_api.api.id
  integration_type = "HTTP_PROXY"
  integration_uri  = "https://gateway.homes.co.nz/property"
  integration_method = "GET"
}

resource "aws_apigatewayv2_route" "api_route_property" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "GET /property"
  target = "integrations/${aws_apigatewayv2_integration.api_integration_property.id}"
}

resource "aws_apigatewayv2_integration" "api_integration_search" {
  api_id           = aws_apigatewayv2_api.api.id
  integration_type = "HTTP_PROXY"
  integration_uri  = "https://gateway.homes.co.nz/address/search"
  integration_method = "GET"
}

resource "aws_apigatewayv2_route" "api_route_search" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "GET /search"
  target = "integrations/${aws_apigatewayv2_integration.api_integration_search.id}"
}

resource "aws_apigatewayv2_integration" "get_user_api_integration" {
  api_id           = aws_apigatewayv2_api.api.id
  integration_type = "AWS_PROXY"
  description               = "Get user details Lambda"
  integration_method        = "POST"
  integration_uri           = module.get_user_lambda.lambda_function_invoke_arn
}

resource "aws_apigatewayv2_route" "get_user_api_route" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "GET /users"
  target = "integrations/${aws_apigatewayv2_integration.get_user_api_integration.id}"
}
