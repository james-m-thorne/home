import simplejson as json
import boto3
from botocore.exceptions import ClientError


def main(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Homes')

    try:
        response = table.get_item(Key={'Email': 'james@thorney.me', 'SharedHouseId': 'b4520b89-59a8-4beb-ae64-7fe95358ce0f'})
        code = 200
        body = response['Item']
    except ClientError as e:
        code = 404
        body = e.response['Error']['Message']
    
    body = json.dumps(body)
    
    print(body)
    return {
        'statusCode': code,
        'body': body
    }
