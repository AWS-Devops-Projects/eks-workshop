import * as cdk from '@aws-cdk/core';
import ec2 = require("@aws-cdk/aws-ec2");
import ecs = require("@aws-cdk/aws-ecs");
import ecs_patterns = require("@aws-cdk/aws-ecs-patterns");


export class SocialReaderStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const vpc = new ec2.Vpc(this, "TwitterFargateVPC", {
      maxAzs: 2 // Default is all AZs in region
    });

    const cluster = new ecs.Cluster(this, "TwitterFargateCluster", {
      vpc: vpc
    });

    // Create a load-balanced Fargate service and make it public
    new ecs_patterns.ApplicationLoadBalancedFargateService(this, "Twitter4uFargateService", {
      cluster: cluster, // Required
      cpu: 512, // Default is 256
      desiredCount: 2, // Default is 1
      // taskImageOptions: { image: ecs.ContainerImage.fromRegistry("amazon/amazon-ecs-sample") },
      taskImageOptions: { image: ecs.ContainerImage.fromRegistry("nnthanh101/twitter4u") },
      memoryLimitMiB: 1024, // Default is 512
      publicLoadBalancer: true // Default is false
    });

  }
}
