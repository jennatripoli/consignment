resource "aws_s3_bucket" "s3_bucket" {
  bucket = var.bucket_name
}

module "template_files" {
  source = "hashicorp/dir/template"

  base_dir = var.build_dir
  template_vars = {
  }
}

resource "aws_s3_object" "objects" {
  for_each     = module.template_files.files
  bucket       = aws_s3_bucket.s3_bucket.id
  key          = each.key
  source       = each.value.source_path
  content_type = each.value.content_type
  etag         = filemd5("${each.value}")
}

resource "aws_s3_bucket_policy" "cloudfront_policy" {
  bucket = aws_s3_bucket.s3_bucket.id
  policy = data.aws_iam_policy_document.cloudfrontaccesstos3.json

}

data "aws_iam_policy_document" "cloudfrontaccesstos3" {
  version = "2008-10-17"
  statement {
    sid    = "AllowCloudFrontServicePrincipal"
    effect = "Allow"
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
    actions   = ["s3:GetObject"]
    resources = ["arn:aws:s3:::${var.bucket_name}/*"]
    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.cloudfront.arn]
    }
  }
}
