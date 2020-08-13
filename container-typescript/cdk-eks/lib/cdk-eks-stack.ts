#!/usr/bin/env node

import * as cdk from '@aws-cdk/core';

import * as dotenv from 'dotenv';
import * as iam from '@aws-cdk/aws-iam';
import * as eks from '@aws-cdk/aws-eks';
import * as ec2 from '@aws-cdk/aws-ec2';
// import * as autoscaling from '@aws-cdk/aws-autoscaling';

import * as ecr          from '@aws-cdk/aws-ecr';
// import * as codecommit   from '@aws-cdk/aws-codecommit';
// import * as codebuild    from '@aws-cdk/aws-codebuild';
// import * as targets      from '@aws-cdk/aws-events-targets';
// import * as codepipeline from '@aws-cdk/aws-codepipeline';
// import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';

export class CdkEksStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    dotenv.config();
    // console.log(`vpc_name is ${process.env.AWS_VPC_NAME}`);
    // console.log(`vpc_cidr is ${process.env.AWS_VPC_CIDR}`);


    /**
    * Step 1. Create a new VPC for our EKS Cluster
    */ 
    var vpc_name = process.env.AWS_VPC_NAME || "EKS-VPC";
    var vpc_cidr = process.env.AWS_VPC_CIDR || "10.10.0.0/16";
    
    // ONLY 1 NAT Gateway --> Cost Optimization trade-off
    const vpc = new ec2.Vpc(this, vpc_name, {
      cidr: vpc_cidr,
      natGateways: 1,
      subnetConfiguration: [
        {  cidrMask: 24, subnetType: ec2.SubnetType.PUBLIC,  name: "PublicDMZ"  },
        {  cidrMask: 24, subnetType: ec2.SubnetType.PRIVATE, name: "PrivateServices" }
        ],
      maxAzs: 2
    })


    /**
    * Step 2. Create a new EKS Cluster
    */  
    
    // IAM role for our EC2 worker nodes
    const clusterAdmin = new iam.Role(this, 'EKS-AdminRole', {
      assumedBy: new iam.AccountRootPrincipal()
    });

    var cluster_name = process.env.EKS_CLUSTER_NAME || "EKS-Cluster";
    // console.log(`cluster_name is ${process.env.EKS_CLUSTER_NAME}`);

    const cluster = new eks.Cluster(this, cluster_name, {
      clusterName: cluster_name,
      vpc,
      defaultCapacity: 2,
      mastersRole: clusterAdmin,
      outputClusterName: true,
    });


    /**
    * TODO 
    * 
    * Step 3: Code* CI/CD
    */

    var ecr_repository_name = process.env.ECR_REPOSITORY || "eks-cicd-ecr-repo";
    // console.log(`repository_name is ${process.env.ECR_REPOSITORY}`);
    const ecrRepo = new ecr.Repository(this, ecr_repository_name, {
      repositoryName: ecr_repository_name
    });

    // TODO AWS Code*
    // const repository = new codecommit.Repository(this, 'EKS-CodeCommitRepo', {
    //   repositoryName: `${this.stackName}-repo`
    // });

  }
}
