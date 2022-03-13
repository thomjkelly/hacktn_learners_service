import { JsonSchemaType, LambdaIntegration, MethodOptions, RequestValidator, Resource, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { errorResponses } from "./common";
import { postFunderRequestSchema } from "./schemas";


export const addPostFunderApiIntegration: (
    stack: Construct,
    api: RestApi,
    apiResource: Resource,
    lambdaHandler: IFunction,
    table: Table
) => void = (
    stack: Construct,
    api: RestApi,
    apiResource: Resource,
    lambdaHandler: IFunction,
    table: Table
) => {
    const namePrefix = "postFunder"

    const requestValidator = api.addRequestValidator(
      `${namePrefix}RequestValidator`,
      {
        validateRequestBody: true,
        validateRequestParameters: true
      }
    )

    const requestModel = api.addModel(
      `${namePrefix}RequestModel`,
      {
        contentType: "application/json",
        schema: postFunderRequestSchema
      }
    )
  
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
                    learnerId: {
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
        requestModels: {
          "application/json": requestModel
        },
        requestValidator: requestValidator,
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
          },
          ...errorResponses
        ]
      }
  
      const integration = new LambdaIntegration(lambdaHandler);

      apiResource.addMethod("POST", integration, methodOptions);
}