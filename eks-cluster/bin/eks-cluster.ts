#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { EksClusterStack } from '../lib/eks-cluster-stack';

const app = new cdk.App();
new EksClusterStack(app, 'EksClusterStack');
