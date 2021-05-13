provider "aws" {
  region = "us-east-1"
}

provider "archive" {}

module "lambda-get-user" {
   source = "./lambda/get-user"
}
