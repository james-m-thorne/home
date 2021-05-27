
locals {
  public_ip = "115.188.149.196"
  site = "thorney.me"
  origin_id = "home-website"
}

// Be sure to change nameservers
resource "aws_route53_zone" "zone" {
  name = local.site
}

resource "aws_route53_record" "gateway" {
  name    = aws_apigatewayv2_domain_name.api_domain.domain_name
  type    = "A"
  zone_id = aws_route53_zone.zone.zone_id

  alias {
    name                   = aws_apigatewayv2_domain_name.api_domain.domain_name_configuration[0].target_domain_name
    zone_id                = aws_apigatewayv2_domain_name.api_domain.domain_name_configuration[0].hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_apigatewayv2_domain_name" "api_domain" {
  domain_name = "gateway.${local.site}"

  domain_name_configuration {
    certificate_arn = aws_acm_certificate.cert.arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}

resource "aws_route53_record" "cloudfront_domain" {
  name = local.site
  type = "A"
  zone_id = aws_route53_zone.zone.zone_id

  alias {
    name                   = aws_cloudfront_distribution.home_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.home_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www" {
  name = "www.${local.site}"
  type = "A"
  zone_id = aws_route53_zone.zone.zone_id

  alias {
    name                   = aws_cloudfront_distribution.home_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.home_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "api" {
  zone_id = aws_route53_zone.zone.zone_id
  name    = "api.${local.site}"
  type    = "A"
  ttl     = "300"
  records = [local.public_ip]
}


resource "aws_cloudfront_distribution" "home_distribution" {
  origin {
    custom_origin_config {
      // These are all the defaults.
      http_port              = "80"
      https_port             = "443"
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }

    domain_name = "api.${local.site}"
    origin_id = local.origin_id
  }

  custom_error_response {
    error_code = 404
    response_page_path = "/index.html"
    response_code = 200
    error_caching_min_ttl = 0
  }

  aliases = [local.site, "www.${local.site}"]

  enabled             = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.origin_id

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 300
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["NZ"]
    }
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.cert.arn
    ssl_support_method = "sni-only"
  }
}

// Create the cert
resource "aws_acm_certificate" "cert" {
  domain_name       = local.site
  subject_alternative_names = ["*.${local.site}"]
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# This is a DNS record for the ACM certificate validation to prove we own the domain
resource "aws_route53_record" "cert_record" {
  name     = tolist(aws_acm_certificate.cert.domain_validation_options)[0].resource_record_name
  type     = tolist(aws_acm_certificate.cert.domain_validation_options)[0].resource_record_type
  zone_id  = aws_route53_zone.zone.id
  records  = [tolist(aws_acm_certificate.cert.domain_validation_options)[0].resource_record_value]
  ttl      = 60
}

# This tells terraform to cause the route53 validation to happen
resource "aws_acm_certificate_validation" "cert_validation" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [aws_route53_record.cert_record.fqdn]
}
