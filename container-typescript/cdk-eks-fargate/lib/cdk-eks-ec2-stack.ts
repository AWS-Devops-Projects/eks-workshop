import * as cdk from '@aws-cdk/core';

import * as ec2 from '@aws-cdk/aws-ec2';
import * as iam from '@aws-cdk/aws-iam';
import * as eks from '@aws-cdk/aws-eks';
import * as autoscaling from '@aws-cdk/aws-autoscaling';

export class CdkEksEC2Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    
    // Step 1. Create a new VPC for our EKS Cluster
    // The default VPC will create a NAT Gateway for each AZs --> Cost
    const vpc = new ec2.Vpc(this, 'EKS-Cluster-VPC', {
      cidr: '10.20.0.0/16',
      natGateways: 1
    })
    
    // Step 2. EKS-Cluster Cluster

    // IAM role for our EC2 worker nodes
    const workerRole = new iam.Role(this, 'EKSWorkerRole', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com')
    });

    const eksCluster = new eks.Cluster(this, 'Cluster', {
      clusterName: "EKS-Cluster",
      vpc: vpc,
      kubectlEnabled: true,  // We want to be able to manage k8s resources using CDK
      defaultCapacity: 0     // We want to manage capacity ourself
    });

    const onDemandASG = new autoscaling.AutoScalingGroup(this, 'OnDemandASG', {
      vpc: vpc,
      role: workerRole,
      minCapacity: 1,
      maxCapacity: 3,
      instanceType: new ec2.InstanceType('t3.medium'),
      machineImage: new eks.EksOptimizedImage({
        kubernetesVersion: '1.15',
        nodeType: eks.NodeType.STANDARD  // without this, incorrect SSM parameter for AMI is resolved
      }),
      updateType: autoscaling.UpdateType.ROLLING_UPDATE
    });

    eksCluster.addAutoScalingGroup(onDemandASG, {});
    
  }
}
