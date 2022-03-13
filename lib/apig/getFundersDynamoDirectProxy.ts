import { AwsIntegration, JsonSchemaType, MethodOptions, Resource, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Effect, Policy, PolicyStatement, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import { errorResponses } from "./common";


export const addGetFundersApiIntegration: (
    stack: Construct,
    api: RestApi,
    apiResource: Resource,
    table: Table
) => void = (
    stack: Construct,
    api: RestApi,
    apiResource: Resource,
    table: Table
) => {
    const namePrefix = "getFunders"
    const getPolicy = new Policy(stack, `${namePrefix}Policy`, {
        statements: [
          new PolicyStatement({
            actions: ['dynamodb:GetItem', 'dynamodb:Query'],
            effect: Effect.ALLOW,
            resources: [table.tableArn],
          }),
        ],
      });
  
      const getRole = new Role(stack, `${namePrefix}Role`, {
        assumedBy: new ServicePrincipal('apigateway.amazonaws.com'),
      });
      getRole.attachInlinePolicy(getPolicy);

      const requestTemplate = `{
        "TableName": "${table.tableName}",
        "KeyConditionExpression": "pk = :pk",
        "ExpressionAttributeValues": {
          ":pk": {
            "S": "FUNDER#"
          }
        }
      }`
  
      const responseTemplate = `#set($inputRoot = $input.path('$')) {
        "funders": [
          #foreach($elem in $inputRoot.Items) {
          #set($skComponents = $elem.sk.S.split("#"))
            "funderId": "$skComponents.get(1)"
          }#if($foreach.hasNext),#end
          #end
        ]
      }
      `
  
      const responseModel = api.addModel(
        `${namePrefix}Model`, {
          contentType: 'application/json',
          schema: {
            type: JsonSchemaType.OBJECT,
            properties: {
              message: { type: JsonSchemaType.STRING},
              data: { 
                type: JsonSchemaType.ARRAY,
                items: {
                  type: JsonSchemaType.OBJECT,
                  properties: {
                    funderId: {
                      type: JsonSchemaType.STRING
                    }
                  }
                }
              }
            }
          }
        }
      )
  
      const methodOptions: MethodOptions = {
        methodResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Content-Type": true,
              "method.response.header.Access-Control-Allow-Origin": true
            },
            responseModels: {
              "application/json": responseModel
            }
          }
        ]
      }
  
      const integration = new AwsIntegration({
        action: 'Query',
        integrationHttpMethod: "POST",
        options: {
          credentialsRole: getRole,
          integrationResponses: [
            {
              statusCode: '200',
              responseTemplates: {
                'application/json': responseTemplate },
            },
            ...errorResponses,
          ],
          requestTemplates: {
            'application/json': requestTemplate
          },
        },
        service: 'dynamodb',
      });

      apiResource.addMethod("GET", integration, methodOptions);
}
