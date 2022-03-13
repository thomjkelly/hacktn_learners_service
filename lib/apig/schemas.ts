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

export const postFunderRequestSchema = {
    type: JsonSchemaType.OBJECT,
    required: ['firstName', 'lastName', 'bio', 'investmentInterests', 'availableSupport', 'city', 'state'],
    properties: {
        firstName: {type: JsonSchemaType.STRING},
        lastName: {type: JsonSchemaType.STRING},
        bio: {type: JsonSchemaType.STRING},
        investmentInterests: {type: JsonSchemaType.STRING},
        availableSupport: {type: JsonSchemaType.STRING},
        city: {type: JsonSchemaType.STRING},
        state: {type: JsonSchemaType.STRING}
    }
}

export const postFunderInvestmentRequestSchema = {
    type: JsonSchemaType.OBJECT,
    required: ['funderId', 'learnerId', 'amount', 'paybackPlan'],
    properties: {
        funderId: {type: JsonSchemaType.STRING},
        learnerId: {type: JsonSchemaType.STRING},
        amount: {type: JsonSchemaType.STRING},
        paybackPlan: {type: JsonSchemaType.STRING}
    }
}

export const postPartnerRequestSchema = {
    type: JsonSchemaType.OBJECT,
    required: ['name', 'profile', 'city', 'state'],
    properties: {
        name: {type: JsonSchemaType.STRING},
        profile: {type: JsonSchemaType.STRING},
        city: {type: JsonSchemaType.STRING},
        state: {type: JsonSchemaType.STRING}
    }
}