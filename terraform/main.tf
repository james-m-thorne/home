provider "aws" {
  region = "us-east-1"
}

terraform {
  backend "s3" {
    bucket = "james-thorne-terraform"
    key    = "home/"
    region = "us-east-1"
  }
}

provider "archive" {}
