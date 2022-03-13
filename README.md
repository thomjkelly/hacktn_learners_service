# Welcome to your CDK TypeScript project

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

## API

### GET /learner

#### response example: 

```
{
  "learners": [
    {
      "learnerId": "c9bbde54-db14-4d8a-93ed-12d32f15c548",
      "firstName": "Bob",
      "lastName": "Davidson",
      "bio": "I haven't worked in 7 years, and I realize that I need a skill in order to make it in today's economy",
      "tradeFocus": "Plumber",
      "investmentNeeds": "$10,000 to cover class fees and meals",
      "city": "Nashville",
      "state": "TN"
    },
    {
      "learnerId": "d75d719d-c87e-44fd-bba0-770a005627dc",
      "firstName": "Alice",
      "lastName": "Ordway",
      "bio": "I'm a mom looking to get back into the workforce. I used to be a grocery clerk, but I would like to learn a trade",
      "tradeFocus": "Electrician",
      "investmentNeeds": "$5,000 to cover childcare expenses",
      "city": "Madison",
      "state": "TN"
    }
  ]
}
```

### POST /learner

#### request example

```
{
    "firstName": "Alice",
    "lastName": "Ordway",
    "bio": "I'm a mom looking to get back into the workforce. I used to be a grocery clerk, but I would like to learn a trade",
    "tradeFocus": "Electrician",
    "investmentNeeds": "$5,000 to cover childcare expenses",
    "city": "Madison",
    "state": "TN"
}
```

#### response example: 

```
{
  "id": "9ae37a91-e040-4b96-b234-c5f55b224d78",
  "firstName": "Alice",
  "lastName": "Ordway",
  "bio": "I'm a mom looking to get back into the workforce. I used to be a grocery clerk, but I would like to learn a trade",
  "tradeFocus": "Electrician",
  "investmentNeeds": "$5,000 to cover childcare expenses",
  "city": "Madison",
  "state": "TN"
}
```