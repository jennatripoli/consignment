locals {
  s3_origin_id = "s3_origin"
}

resource "aws_cloudfront_distribution" "cloudfront" {
  comment             = "Created using terraform"
  default_root_object = "index.html"

  origin {
    domain_name              = aws_s3_bucket.s3_bucket.bucket_regional_domain_name
    origin_id                = local.s3_origin_id
    origin_access_control_id = aws_cloudfront_origin_access_control.OAC.id
  }

  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }

  default_cache_behavior {
    allowed_methods        = ["HEAD", "GET"]
    cached_methods         = ["HEAD", "GET"]
    target_origin_id       = local.s3_origin_id
    viewer_protocol_policy = "allow-all"
    compress               = true
    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }
  enabled = true

  restrictions {
    geo_restriction {
      locations        = []
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

}

resource "aws_cloudfront_origin_access_control" "OAC" {
  name                              = "s3_access_control"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}
