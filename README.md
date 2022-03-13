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
      "avatar": "https://picsum.photos/id/777/200/300",
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
      "avatar": "https://picsum.photos/id/333/200/300",
      "tradeFocus": "Electrician",
      "investmentNeeds": "$5,000 to cover childcare expenses",
      "city": "Madison",
      "state": "TN"
    }
  ]
}
```

### GET /learner/{id}

#### response example: 

```
{
  "learnerId": "c9bbde54-db14-4d8a-93ed-12d32f15c548",
  "firstName": "Bob",
  "lastName": "Davidson",
  "bio": "I haven't worked in 7 years, and I realize that I need a skill in order to make it in today's economy",
  "avatar": "https://picsum.photos/id/333/200/300",
  "tradeFocus": "Plumber",
  "investmentNeeds": "$10,000 to cover class fees and meals",
  "city": "Nashville",
  "state": "TN"
}
```

### POST /learner

#### request example

```
{
    "firstName": "Alice",
    "lastName": "Ordway",
    "bio": "I'm a mom looking to get back into the workforce. I used to be a grocery clerk, but I would like to learn a trade",
    "avatar": "https://picsum.photos/id/414/200/300",
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
  "avatar": "https://picsum.photos/id/414/200/300",
  "tradeFocus": "Electrician",
  "investmentNeeds": "$5,000 to cover childcare expenses",
  "city": "Madison",
  "state": "TN"
}
```

### GET /learner/{id}/investment

#### response example: 

```
{
  "investments": [
    {
      "investmentId": "1936e62a-7616-4d70-acb8-e827f766899f",
      "funderId": "03b4a168-9ee2-46c5-8158-02d2541d280a",
      "learnerId": "c9bbde54-db14-4d8a-93ed-12d32f15c548",
      "amount": "5000",
      "currencyType": "USD",
      "status": "PENDING",
      "paybackPlan": "DONATION"
    }
  ]
}
```

### GET /funder

#### response example: 

```
{
  "funders": [
    {
      "funderId": "03b4a168-9ee2-46c5-8158-02d2541d280a",
      "firstName": "Dave",
      "lastName": "Gartland",
      "bio": "I'm an active investor looking for good investments opportunities in my city",
      "avatar": "https://picsum.photos/id/333/200/300",
      "investmentInterests": "Tech. Trades",
      "availableSupport": "Mentoring. Financial.",
      "city": "Nashville",
      "state": "TN"
    },
    {
      "funderId": "69069cfe-ee4d-4d88-9d0f-1ed483d09aa7",
      "firstName": "Carlos",
      "lastName": "Forrest",
      "bio": "I'm a retired software engineer looking to give back to my community",
      "avatar": "https://picsum.photos/id/414/200/300",
      "investmentInterests": "Tech",
      "availableSupport": "Mentoring. Financial.",
      "city": "Brentwood",
      "state": "TN"
    }
  ]
}
```

### GET /funder/{id}

#### response example: 

```
{
  "funderId": "69069cfe-ee4d-4d88-9d0f-1ed483d09aa7",
  "firstName": "Carlos",
  "lastName": "Forrest",
  "bio": "I'm a retired software engineer looking to give back to my community",
  "avatar": "https://picsum.photos/id/414/200/300",
  "availableSupport": "Mentoring. Financial.",
  "investmentInterests": "Tech",
  "city": "Brentwood",
  "state": "TN"
}
```

### POST /funder

#### request example

```
{
    "firstName": "Carlos",
    "lastName": "Forrest",
    "bio": "I'm a retired software engineer looking to give back to my community",
    "availableSupport": "Mentoring. Financial.",
    "avatar": "https://picsum.photos/id/414/200/300",
    "investmentInterests": "Tech",
    "city": "Brentwood",
    "state": "TN"
}
```

#### response example: 

```
{
  "id": "69069cfe-ee4d-4d88-9d0f-1ed483d09aa7",
  "firstName": "Carlos",
  "lastName": "Forrest",
  "bio": "I'm a retired software engineer looking to give back to my community",
  "avatar": "https://picsum.photos/id/414/200/300",
  "investmentInterests": "Tech",
  "availableSupport": "Mentoring. Financial.",
  "city": "Brentwood",
  "state": "TN",
}
```

### GET /funder/{id}/investment

#### request example

```
{
  "investments": [
    {
      "investmentId": "1936e62a-7616-4d70-acb8-e827f766899f",
      "funderId": "03b4a168-9ee2-46c5-8158-02d2541d280a",
      "learnerId": "c9bbde54-db14-4d8a-93ed-12d32f15c548",
      "amount": "5000",
      "currencyType": "USD",
      "status": "PENDING",
      "paybackPlan": "DONATION"
    }
  ]
}
```

#### response example: 

```
{
  "id": "1936e62a-7616-4d70-acb8-e827f766899f",
  "funderId": "03b4a168-9ee2-46c5-8158-02d2541d280a",
  "learnerId": "c9bbde54-db14-4d8a-93ed-12d32f15c548",
  "amount": 5000,
  "currencyType": "USD",
  "status": "PENDING",
  "paybackPlan": "DONATION"
}
```

### POST /funder/{id}/investment

#### request example

```
{
    "funderId": "03b4a168-9ee2-46c5-8158-02d2541d280a",
    "learnerId": "c9bbde54-db14-4d8a-93ed-12d32f15c548",
    "amount": "5000",
    "paybackPlan": "DONATION"
}
```

#### response example: 

```
{
  "id": "1936e62a-7616-4d70-acb8-e827f766899f",
  "funderId": "03b4a168-9ee2-46c5-8158-02d2541d280a",
  "learnerId": "c9bbde54-db14-4d8a-93ed-12d32f15c548",
  "amount": 5000,
  "currencyType": "USD",
  "status": "PENDING",
  "paybackPlan": "DONATION"
}
```

### GET /funder/{id}/investment/{investmentid}

#### response example: 

```
{
  "investmentId": "1936e62a-7616-4d70-acb8-e827f766899f",
  "funderId": "03b4a168-9ee2-46c5-8158-02d2541d280a",
  "learnerId": "c9bbde54-db14-4d8a-93ed-12d32f15c548",
  "amount": "5000",
  "currencyType": "USD",
  "status": "PENDING",
  "paybackPlan": "DONATION"
}
```

### GET /partner

#### response example: 

```
{
  "partners": [
    {
      "partnerId": "06c9812f-e75b-4f74-9d98-ae3582a0dda6",
      "name": "Nashville Tech Bootcamp",
      "profile": "We are the original tech bootcamp in Tennessee",
      "city": "Nashville",
      "state": "TN"
    },
    {
      "partnerId": "cfbad09a-44ce-4398-af51-6c5f275e74c8",
      "name": "Surfin' Plumbers",
      "profile": "We are the only plumbers who regularly say 'Cowabunga'",
      "city": "Nashville",
      "state": "TN"
    }
  ]
}
```

### GET /partner/{id}

#### response example: 

```
{
  "partnerId": "cfbad09a-44ce-4398-af51-6c5f275e74c8",
  "name": "Surfin' Plumbers",
  "profile": "We are the only plumbers who regularly say 'Cowabunga'",
  "city": "Nashville",
  "state": "TN"
}
```

### POST /partner

#### request example

```
{
    "name": "Nashville Tech Bootcamp",
    "profile": "We are the original tech bootcamp in Tennessee",
    "city": "Nashville",
    "state": "TN"
}
```

#### response example: 

```
{
  "id": "06c9812f-e75b-4f74-9d98-ae3582a0dda6",
  "name": "Nashville Tech Bootcamp",
  "profile": "We are the original tech bootcamp in Tennessee",
  "city": "Nashville",
  "state": "TN"
}
```