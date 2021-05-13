resource "aws_dynamodb_table" "homes-table" {
  name           = "Homes"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "Email"
  range_key      = "SharedHouseId"

  attribute {
    name = "Email"
    type = "S"
  }

  attribute {
    name = "SharedHouseId"
    type = "S"
  }

  global_secondary_index {
    name               = "SharedHouseIndex"
    hash_key           = "SharedHouseId"
    range_key          = "Email"
    projection_type    = "KEYS_ONLY"
  }

}