#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkEksStack } from '../lib/cdk-eks-stack';
// import { CdkEksEC2Stack } from '../lib/cdk-eks-ec2-stack';

const app = new cdk.App();
new CdkEksStack(app, 'CdkEksStack');

// TODO .env
// new CdkEksStack(app, 'CdkEksStack', {
//     env: {
//         region: process.env.AWS_REGION,
//         account: process.env.AWS_ACCOUNT_ID
//     }
// });

// TODO EKS-Cluster
// new CdkEksEC2Stack(app, 'CDK-EKS-Cluster-Stack');
