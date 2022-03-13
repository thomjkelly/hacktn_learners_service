import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_dynamodb as ddb } from 'aws-cdk-lib';
import { aws_lambda as lambda } from 'aws-cdk-lib';
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { addGetLearnersApiIntegration } from './apig/getLearnersDynamoDirectProxy';
import { addGetFundersApiIntegration } from './apig/getFundersDynamoDirectProxy';
import { addPostLearnerApiIntegration } from './apig/postLearnerLambdaProxy';
import { addGetLearnerApiIntegration } from './apig/getLearnerDynamoDirectProxy';
import { addPostFunderApiIntegration } from './apig/postFunderLambdaProxy';
import { addGetFunderApiIntegration } from './apig/getFunderDynamoDirectProxy';
import { addGetPartnersApiIntegration } from './apig/getPartnersDynamoDirectProxy';
import { addGetPartnerApiIntegration } from './apig/getPartnerDynamoDirectProxy';
import { addPostPartnerApiIntegration } from './apig/postPartnerLambdaProxy';

export class LearnerStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // dynamo
    const table = new ddb.Table(this, 'Table', {
      partitionKey: { name: 'pk', type: ddb.AttributeType.STRING },
      sortKey: { name: 'sk', type: ddb.AttributeType.STRING },
      billingMode: ddb.BillingMode.PAY_PER_REQUEST,
    });
    table.addGlobalSecondaryIndex({
      indexName: 'gsi1-sk-Index',
      partitionKey: {name: 'gsi1', type: ddb.AttributeType.STRING},
      sortKey: {name: 'sk', type: ddb.AttributeType.STRING},
      projectionType: ddb.ProjectionType.ALL,
    })

    //lambda
    const postLearnerLambda = new lambda.Function(this, 'postLearner', {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'postLearner.handler',
      code: lambda.Code.fromAsset("resources"),
    });

    table.grantWriteData(postLearnerLambda);

    const postFunderLambda = new lambda.Function(this, 'postFunder', {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'postFunder.handler',
      code: lambda.Code.fromAsset("resources"),
    });

    table.grantWriteData(postFunderLambda);

    const postPartnerLambda = new lambda.Function(this, 'postPartner', {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'postPartner.handler',
      code: lambda.Code.fromAsset("resources"),
    });

    table.grantWriteData(postPartnerLambda);
    
    // apig
    const api = new apigateway.RestApi(this, "learners-api", {
      restApiName: "Learners Service",
      description: "API Endpoint for Learners Service"
    });

    const v1Resource = api.root.addResource("api").addResource("v1");
    const learnerResource = v1Resource.addResource("learner");
    const learnerByIdResource = learnerResource.addResource("{id}");
    const funderResource = v1Resource.addResource("funder");
    const funderByIdResource = funderResource.addResource("{id}");
    const partnerResource = v1Resource.addResource("partner");
    const partnerByIdResource = partnerResource.addResource("{id}");

    addGetLearnersApiIntegration(this, api, learnerResource, table);
    addGetLearnerApiIntegration(this, api, learnerByIdResource, table);
    addPostLearnerApiIntegration(this, api, learnerResource, postLearnerLambda, table);
    addGetFundersApiIntegration(this, api, funderResource, table);
    addGetFunderApiIntegration(this, api, funderByIdResource, table);
    addPostFunderApiIntegration(this, api, funderResource, postFunderLambda, table);
    addGetPartnersApiIntegration(this, api, partnerResource, table);
    addGetPartnerApiIntegration(this, api, partnerByIdResource, table);
    addPostPartnerApiIntegration(this, api, partnerResource, postPartnerLambda, table);
  }
}
