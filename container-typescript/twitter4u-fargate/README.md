# Welcome to SocialReader CDK TypeScript project!

This is a NodeJS TypeScript to crawling/hearing the filtered topics from Twitter/Facebook.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Initializing the AWS CDK

```
mkdir SocialReader && cd SocialReader
cdk init --language typescript
```

## Build and run the app

```
npm run build
cdk synth
```

## Add the Amazon EC2 & ECS Packages

```
npm install @aws-cdk/aws-ec2 @aws-cdk/aws-ecs @aws-cdk/aws-ecs-patterns
```

## Create a Fargate Service

```
npm run build
cdk deploy --profile default
# cdk deploy
# cdk deploy --profile production
```


> IAM Statement Changes

```
┌───┬────────────────────────────────────────┬────────┬────────────────────────────────────────┬────────────────────────────────────────┬───────────┐
│   │ Resource                               │ Effect │ Action                                 │ Principal                              │ Condition │
├───┼────────────────────────────────────────┼────────┼────────────────────────────────────────┼────────────────────────────────────────┼───────────┤
│ + │ ${Twitter4uFargateService/TaskDef/Exec │ Allow  │ sts:AssumeRole                         │ Service:ecs-tasks.amazonaws.com        │           │
│   │ utionRole.Arn}                         │        │                                        │                                        │           │
├───┼────────────────────────────────────────┼────────┼────────────────────────────────────────┼────────────────────────────────────────┼───────────┤
│ + │ ${Twitter4uFargateService/TaskDef/Task │ Allow  │ sts:AssumeRole                         │ Service:ecs-tasks.amazonaws.com        │           │
│   │ Role.Arn}                              │        │                                        │                                        │           │
├───┼────────────────────────────────────────┼────────┼────────────────────────────────────────┼────────────────────────────────────────┼───────────┤
│ + │ ${Twitter4uFargateService/TaskDef/web/ │ Allow  │ logs:CreateLogStream                   │ AWS:${Twitter4uFargateService/TaskDef/ │           │
│   │ LogGroup.Arn}                          │        │ logs:PutLogEvents                      │ ExecutionRole}                         │           │
└───┴────────────────────────────────────────┴────────┴────────────────────────────────────────┴────────────────────────────────────────┴───────────┘
```


> Security Group Changes

```
┌───┬──────────────────────────────────────────────────────────┬─────┬────────────┬──────────────────────────────────────────────────────────┐
│   │ Group                                                    │ Dir │ Protocol   │ Peer                                                     │
├───┼──────────────────────────────────────────────────────────┼─────┼────────────┼──────────────────────────────────────────────────────────┤
│ + │ ${Twitter4uFargateService/LB/SecurityGroup.GroupId}      │ In  │ TCP 80     │ Everyone (IPv4)                                          │
│ + │ ${Twitter4uFargateService/LB/SecurityGroup.GroupId}      │ Out │ TCP 80     │ ${Twitter4uFargateService/Service/SecurityGroup.GroupId} │
├───┼──────────────────────────────────────────────────────────┼─────┼────────────┼──────────────────────────────────────────────────────────┤
│ + │ ${Twitter4uFargateService/Service/SecurityGroup.GroupId} │ In  │ TCP 80     │ ${Twitter4uFargateService/LB/SecurityGroup.GroupId}      │
│ + │ ${Twitter4uFargateService/Service/SecurityGroup.GroupId} │ Out │ Everything │ Everyone (IPv4)                                          │
└───┴──────────────────────────────────────────────────────────┴─────┴────────────┴──────────────────────────────────────────────────────────┘
```

## Clean Up

```
cdk destroy
```

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

## TODO

```javascript
echo "var twitter_config = module.exports = {
twitter: {
    consumer_key: '`aws secretsmanager get-secret-value --secret-id AuthConsumerManagerSecret --query SecretString --output text --region ap-southeast-2`',
    consumer_secret: '`aws secretsmanager get-secret-value --secret-id AuthConsumerSecretManagerSecret --query SecretString --output text --region ap-southeast-2`',
    access_token: '`aws secretsmanager get-secret-value --secret-id AuthAccessTokenManagerSecret --query SecretString --output text --region ap-southeast-2`',
    access_token_secret: '`aws secretsmanager get-secret-value --secret-id AuthAccessTokenSecretManagerSecret --query SecretString --output text --region ap-southeast-2`'
  },
topics: ['VPC', 'EC2', 'RDS', 'S3', 'Covid'],
languages: ['en', 'vi'],
kinesis_delivery: 'AI-Driven-Social-Media-IngestionFirehoseStream'
}" > twitter_reader_config.js
```
