import boto3
import json


dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('StockTable')


def main(event=None, context=None):
    print(event)

    if event['httpMethod'] == 'GET':
        body = table.scan()['Items']

    if event['httpMethod'] == 'POST':
        params = json.loads(event['body'])
        table.put_item(
            Item=params
        )
        body = {
            'message': 'ok'
        }

    return {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Origin": "*"
        },
        'body': json.dumps(body)
    }


if __name__ == '__main__':
    main()
