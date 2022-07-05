
variable "hasura_admin_secret" {
  description = "Value of the Name tag for the EC2 instance"
  type        = string
}

variable "aws_access_key_id" {
  description = "AWS access key id for dns-challenge user"
  type        = string
}

variable "aws_secret_access_key_id" {
  description = "AWS secret access key id for dns-challenge user"
  type        = string
}
