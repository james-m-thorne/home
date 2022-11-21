resource "aws_apigatewayv2_api" "api" {
  name          = "Home Finder API"
  description   = "API to proxy to external services"
  protocol_type = "HTTP"
  cors_configuration {
    allow_origins     = ["https://www.${var.domain}", "https://${var.domain}", "http://api.192.168.3.254.nip.io:30000"]
    allow_methods     = ["GET", "POST", ]
    allow_credentials = true
    allow_headers     = ["authorization", "content-type"]
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
  api_id             = aws_apigatewayv2_api.api.id
  integration_type   = "HTTP_PROXY"
  integration_uri    = "https://gateway.homes.co.nz/map/dots"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "api_route_map" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "POST /map"
  target    = "integrations/${aws_apigatewayv2_integration.api_integration_map.id}"
}

resource "aws_apigatewayv2_integration" "api_integration_plan" {
  api_id             = aws_apigatewayv2_api.api.id
  integration_type   = "HTTP_PROXY"
  integration_uri    = "https://api.at.govt.nz/journeyplanner/v2/plan"
  integration_method = "GET"
}

resource "aws_apigatewayv2_route" "api_route_plan" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "GET /plan"
  target    = "integrations/${aws_apigatewayv2_integration.api_integration_plan.id}"
}

resource "aws_apigatewayv2_integration" "api_integration_property" {
  api_id             = aws_apigatewayv2_api.api.id
  integration_type   = "HTTP_PROXY"
  integration_uri    = "https://gateway.homes.co.nz/property"
  integration_method = "GET"
}

resource "aws_apigatewayv2_route" "api_route_property" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "GET /property"
  target    = "integrations/${aws_apigatewayv2_integration.api_integration_property.id}"
}

resource "aws_apigatewayv2_integration" "api_integration_search" {
  api_id             = aws_apigatewayv2_api.api.id
  integration_type   = "HTTP_PROXY"
  integration_uri    = "https://gateway.homes.co.nz/address/search"
  integration_method = "GET"
}

resource "aws_apigatewayv2_route" "api_route_search" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "GET /search"
  target    = "integrations/${aws_apigatewayv2_integration.api_integration_search.id}"
}

resource "aws_apigatewayv2_integration" "api_integration_listing" {
  api_id             = aws_apigatewayv2_api.api.id
  integration_type   = "HTTP_PROXY"
  integration_uri    = "https://gateway.homes.co.nz/listing/{listingId}/detail"
  integration_method = "GET"
}

resource "aws_apigatewayv2_route" "api_route_listing" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "GET /listing/{listingId}"
  target    = "integrations/${aws_apigatewayv2_integration.api_integration_listing.id}"
}

resource "aws_apigatewayv2_integration" "api_integration_graphql" {
  api_id             = aws_apigatewayv2_api.api.id
  integration_type   = "HTTP_PROXY"
  integration_uri    = "https://api.${var.domain}/v1/graphql"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "api_route_graphql" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "POST /graphql"
  target    = "integrations/${aws_apigatewayv2_integration.api_integration_graphql.id}"
}
