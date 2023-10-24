terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.16.2"
    }
  }
  # backend "s3" {
  #   bucket         = "mqp-terraform-state-bucket"
  #   key            = "frontend/terraform.tfstate"
  #   region         = "us-east-1"
  #   dynamodb_table = "mqp-terraform-state-lock-table"
  #   encrypt        = true
  #   profile        = "509"
  # }
}

provider "aws" {
  region  = "us-east-1"
  profile = "509"
}
