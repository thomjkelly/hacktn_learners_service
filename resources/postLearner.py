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
        "pk": "LEARNER#",
        "sk": f"LEARNER#{id}#",
        "firstName": json_body["firstName"],
        "lastName": json_body["lastName"],
        "avatar": json_body.get("avatar"),
        "bio": json_body["bio"],
        "whereIam": json_body.get("whereIam"),
        "whereIWannaBe": json_body.get("whereIWannaBe"),
        "whatDoINeed": json_body.get("whatDoINeed"),
        "tradeFocus": json_body["tradeFocus"],
        "investmentNeeds": json_body["investmentNeeds"],
        "city": json_body["city"],
        "state": json_body["state"]
    }
    table.put_item(Item=dynamo_item)

    return_item = dynamo_item.copy()
    del return_item["pk"]
    del return_item["sk"]
    return_item["id"] = id 

    return {
        'statusCode': 200,
        'body': json.dumps(return_item)
    }
