resource "aws_cognito_user_pool_domain" "cognito_domain" {
  domain          = "auth.thorney.me"
  certificate_arn = aws_acm_certificate.cert.arn
  user_pool_id    = aws_cognito_user_pool.cognito_pool.id
}

resource "aws_cognito_user_pool" "cognito_pool" {
  name = "homes-user-pool"
}

resource "aws_cognito_user_pool_client" "client" {
  name                 = "homes-client"
  user_pool_id         = aws_cognito_user_pool.cognito_pool.id
  callback_urls        = ["https://www.thorney.me/callback"]
  default_redirect_uri = "https://www.thorney.me/callback"

  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_flows                  = ["code"]
  allowed_oauth_scopes                 = ["email", "openid", "profile"]
  supported_identity_providers         = ["COGNITO"]
}