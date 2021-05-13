import requests

def main(event, context):   
    response = requests.get("https://docs.aws.amazon.com")
    print(response.text)
    return response.text