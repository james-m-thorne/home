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