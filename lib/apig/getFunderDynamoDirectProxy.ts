import { AwsIntegration, JsonSchemaType, MethodOptions, Resource, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Effect, Policy, PolicyStatement, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import { errorResponses } from "./common";


export const addGetFunderApiIntegration: (
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
    const namePrefix = "getFunder"
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
        #set($id = $util.urlDecode($input.params('id')))
        "TableName": "${table.tableName}",
        "Key": {
            "pk": {
                "S": "FUNDER#"
            },
            "sk": {
                "S": "FUNDER#$id#"
            }
        }
      }`
  
      const responseTemplate = `
            #set($inputRoot = $input.path('$')) 
            #set($elem = $inputRoot.Item) 
            #set($skComponents = $elem.sk.S.split("#"))
        {
            "funderId": "$skComponents.get(1)",
            "firstName": "$elem.firstName.S",
            "lastName": "$elem.lastName.S",
            "bio": "$elem.bio.S",
            "avatar": "$elem.avatar.S",
            "availableSupport": "$elem.availableSupport.S",
            "investmentInterests": "$elem.investmentInterests.S",
            "city": "$elem.city.S",
            "state": "$elem.state.S"
        }`
  
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
        action: 'GetItem',
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