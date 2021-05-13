
resource "null_resource" "install_dependencies" {
  provisioner "local-exec" {
    command = "pip install -r ${path.module}/requirements.txt -t ${path.module}/package --upgrade && cp ${path.module}/*.py ${path.module}/package"
  }

  # Only re-run this if the dependencies or their versions
  # have changed since the last deployment with Terraform
  triggers = {
    dependencies_versions = filemd5("${path.module}/requirements.txt")
    # source_code_hash = random_uuid.lambda_src_hash.result # This is a suitable option too
  }
}

data "archive_file" "lambda_source_package" {
  type        = "zip"
  source_dir  = "${path.module}/package"
  output_path = "${path.module}/package/get-user-package.zip"

  depends_on = [null_resource.install_dependencies]
}

resource "aws_iam_role" "lambda_iam" {
  name = "lambda_iam"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_lambda_function" "homes_lambda" {
  filename      = data.archive_file.lambda_source_package.output_path
  function_name = "get-user"
  role          = aws_iam_role.lambda_iam.arn
  handler       = "lambda_function.main"

  source_code_hash = data.archive_file.lambda_source_package.output_base64sha256

  runtime = "python3.8"

  environment {
    variables = {
      foo = "bar"
    }
  }
}