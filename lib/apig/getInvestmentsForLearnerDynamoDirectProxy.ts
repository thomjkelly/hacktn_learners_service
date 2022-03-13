import { AwsIntegration, JsonSchemaType, MethodOptions, Resource, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Effect, Policy, PolicyStatement, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import { errorResponses } from "./common";


export const addGetInvestmentsForLearnerApiIntegration: (
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
    const namePrefix = "getInvestmentsForLearner"
    const getPolicy = new Policy(stack, `${namePrefix}Policy`, {
        statements: [
          new PolicyStatement({
            actions: ['dynamodb:GetItem', 'dynamodb:Query'],
            effect: Effect.ALLOW,
            resources: [table.tableArn, `${table.tableArn}/index/*`],
          }),
        ],
      });
  
      const getRole = new Role(stack, `${namePrefix}Role`, {
        assumedBy: new ServicePrincipal('apigateway.amazonaws.com'),
      });
      getRole.attachInlinePolicy(getPolicy);

      const requestTemplate = `{
        #set($id = $util.urlDecode($input.params('id')))
        "TableName": "${table.tableName}",
        "IndexName": "gsi1-sk-Index",
        "KeyConditionExpression": "gsi1 = :gsi1",
        "ExpressionAttributeValues": {
          ":gsi1": {
            "S": "INVESTMENT#LEARNER#$id#"
          }
        }
      }`
  
      const responseTemplate = `#set($inputRoot = $input.path('$')) {
        "investments": [
          #foreach($elem in $inputRoot.Items) {
          #set($pkComponents = $elem.pk.S.split("#"))
          #set($skComponents = $elem.sk.S.split("#"))
          #set($gsi1Components = $elem.gsi1.S.split("#"))
          "investmentId": "$skComponents.get(1)",
          "funderId": "$pkComponents.get(2)",
          "learnerId": "$gsi1Components.get(2)",
          "amount": "$elem.amount.N",
          "currencyType": "$elem.currencyType.S",
          "status": "$elem.status.S",
          "paybackPlan": "$elem.paybackPlan.S"
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
