import boto3
import uuid
import json

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('LearnerStack-TableCD117FA1-1JO9LMXB4WXU2')

def handler(event, context):
    body = event["body"]
    json_body = json.loads(body)
    id = str(uuid.uuid4())

    dynamo_item = {
        "pk": f"INVESTMENT#FUNDER#{json_body['funderId']}#",
        "sk": f"INVESTMENT#{id}#",
        "gsi1": f"INVESTMENT#LEARNER#{json_body['learnerId']}#",
        "amount": int(json_body['amount']),
        "currencyType": "USD",
        "status": "PENDING",
        "paybackPlan": json_body['paybackPlan']
    }
    table.put_item(Item=dynamo_item)

    return_item = dynamo_item.copy()
    del return_item["pk"]
    del return_item["sk"]
    del return_item["gsi1"]
    return_item["id"] = id 
    return_item["funderId"] = json_body['funderId']
    return_item["learnerId"] = json_body['learnerId']

    return {
        'statusCode': 200,
        'body': json.dumps(return_item)
    }
