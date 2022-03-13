import { JsonSchemaType } from "aws-cdk-lib/aws-apigateway";

export const postLearnerRequestSchema = {
    type: JsonSchemaType.OBJECT,
    required: ['firstName', 'lastName', 'bio', 'tradeFocus', 'investmentNeeds', 'city', 'state'],
    properties: {
        firstName: {type: JsonSchemaType.STRING},
        lastName: {type: JsonSchemaType.STRING},
        bio: {type: JsonSchemaType.STRING},
        tradeFocus: {type: JsonSchemaType.STRING},
        investmentNeeds: {type: JsonSchemaType.STRING},
        city: {type: JsonSchemaType.STRING},
        state: {type: JsonSchemaType.STRING}
    }
}