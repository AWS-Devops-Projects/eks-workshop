## AWS Workshops

A list of public repositories, content, and web from re:Invent 2019 Workshops. Many of the links are subject to be moved or completely removed at any point in time in the future.

```
## 8. container insights cloudwatch logs
cat cwagent-fluentd-quickstart.yaml | sed "s/{{cluster_name}}/${CLUSTER_NAME}/;s/{{region_name}}/${AWS_REGION}/" | kubectl apply -f -
```

* [x] https://github.com/aws-samples/amazon-eks-cdk-blue-green-cicd
* [x] https://github.com/aws-samples/amazon-eks-cicd-codebuild

* [ ] https://github.com/aws-samples/aws-serverless-ecommerce-platform
* [ ] https://aws.amazon.com/getting-started/hands-on/break-monolith-app-microservices-ecs-docker-ec2/
* [ ] https://github.com/aws-samples/aws-online-data-migration-workshop
* [ ] https://aws-dataengineering-day.workshop.aws/en
* [ ] https://github.com/aws-samples/aws-modern-application-workshop
* [ ] https://github.com/awslabs/realworld-serverless-application
* [ ] https://dev.to/ryands17/deploying-a-spa-using-aws-cdk-typescript-4ibf
* [ ] https://github.com/eladb/cdk-watchful
* [ ] https://github.com/cloudcomponents/cdk-components/tree/master/packages/cdk-codepipeline-slack
* [ ] https://sbstjn.com/deploy-react-cra-with-cdk-codepipeline-and-codebuild.html


| 	Session ID	 | 	Session Name	 | 	Repo/Site	 | 
| -------------- | --------------- | ------- |
|   SVS203	 | Build a serverless ride-sharing web application | https://webapp.serverlessworkshops.io/ |
|   SVS340	 | Serverless image processing workflows at scale with AWS Step Functions | https://image-processing.serverlessworkshops.io/ | 
|   AIM362		| Build, train & debug, and deploy & monitor with Amazon SageMaker | http://bit.ly/aim362-workshop |
|   GPSTEC406	 | AWS Alien Attack workshop | https://alienattack.workshop.aws/ |
|   ANT401	  | Build real-time analytics for a ride-sharing app | https://streaming-analytics.labgui.de/ |
|   API306 |  | https://event-driven-architecture.workshop.aws/ |
|   MOB304 | Implement auth and authorization flows in your iOS apps | https://amplify-ios-workshop.go-aws.com/ |
|   NET207 | Understand the basics of IPv6 networking on AWS | https://net207-ipv6networking.workshop.aws/ |
|   ARC314 |  Decoupled microservices: Building scalable applications | https://mainline.d1x1ku9g0a2648.amplifyapp.com/ | 

* [x] [Mautic Marketing Automation using ECS Fargate](http://mautic.aws.job4u.io/) 


* [ ] https://github.com/TysonWorks/cdk-examples/blob/master/serverless-eks/index.ts
* [ ] https://medium.com/tysonworks/serverless-kubernetes-with-amazon-eks-a2d8fb0f8333
* [ ] https://github.com/TysonWorks/cdk-examples/blob/master/eks-cluster/index.ts
* [ ] http://arun-gupta.github.io/hpa-app-metrics/
* [ ] https://github.com/TysonWorks/cdk-examples/blob/master/elasticsearch-cluster/index.ts
* [ ] https://github.com/aws-samples/amazon-eks-fluent-logging-examples




curl https://raw.githubusercontent.com/aws-samples/amazon-cloudwatch-container-insights/latest/k8s-deployment-manifest-templates/deployment-mode/daemonset/container-insights-monitoring/quickstart/cwagent-fluentd-quickstart.yaml | sed "s/{{cluster_name}}/Cluster9EE0221C-d5f60797ba6746bcacc25929fb88d5fe/;s/{{region_name}}/ap-southeast-1/" | kubectl apply -f -
curl https://raw.githubusercontent.com/aws-samples/amazon-cloudwatch-container-insights/latest/k8s-deployment-manifest-templates/deployment-mode/daemonset/container-insights-monitoring/quickstart/cwagent-fluentd-quickstart.yaml | sed "s/{{cluster_name}}/Cluster9EE0221C-d5f60797ba6746bcacc25929fb88d5fe/;s/{{region_name}}/ap-southeast-1/" | kubectl apply -f -

curl https://raw.githubusercontent.com/aws-samples/amazon-cloudwatch-container-insights/master/k8s-yaml-templates/quickstart/cwagent-fluentd-quickstart.yaml | sed "s/{{cluster_name}}/Cluster9EE0221C-d5f60797ba6746bcacc25929fb88d5fe/;s/{{region_name}}/ap-southeast-1/" | kubectl apply -f -

kubectl apply -f https://raw.githubusercontent.com/aws-samples/amazon-cloudwatch-container-insights/latest/k8s-deployment-manifest-templates/deployment-mode/daemonset/container-insights-monitoring/cloudwatch-namespace.yaml

kubectl apply -f https://raw.githubusercontent.com/aws-samples/amazon-cloudwatch-container-insights/latest/k8s-deployment-manifest-templates/deployment-mode/daemonset/container-insights-monitoring/cwagent/cwagent-serviceaccount.yaml

curl -O https://raw.githubusercontent.com/aws-samples/amazon-cloudwatch-container-insights/latest/k8s-deployment-manifest-templates/deployment-mode/daemonset/container-insights-monitoring/cwagent/cwagent-configmap.yaml

kubectl apply -f cwagent-configmap.yaml

https://console.aws.amazon.com/cloudwatch/home#cw:dashboard=Container;context=~(clusters~(~)~dimensions~(~)~performanceType~'ClusterName)

curl -O  https://raw.githubusercontent.com/aws-samples/amazon-cloudwatch-container-insights/latest/k8s-deployment-manifest-templates/deployment-mode/daemonset/container-insights-monitoring/cwagent/cwagent-daemonset.yaml
===
echo ${CLUSTER_NAME}  ${AWS_REGION}

curl https://raw.githubusercontent.com/aws-samples/amazon-cloudwatch-container-insights/latest/k8s-deployment-manifest-templates/deployment-mode/daemonset/container-insights-monitoring/quickstart/cwagent-fluentd-quickstart.yaml | sed "s/{{cluster_name}}/${CLUSTER_NAME}/;s/{{region_name}}/${AWS_REGION}/" | kubectl apply -f -


===
cluster-name=Cluster9EE0221C-d5f60797ba6746bcacc25929fb88d5fe
region=ap-southeast-1
curl https://raw.githubusercontent.com/aws-samples/amazon-cloudwatch-container-insights/master/k8s-yaml-templates/quickstart/cwagent-fluentd-quickstart.yaml | sed "s/{{cluster_name}}/$cluster_name/;s/{{region_name}}/$region/" | kubectl apply -f -

curl https://raw.githubusercontent.com/aws-samples/amazon-cloudwatch-container-insights/master/k8s-yaml-templates/quickstart/cwagent-fluentd-quickstart.yaml -o cwagent-fluentd-quickstart.yaml -silent

===


kubectl create configmap cluster-info \
      --from-literal=cluster.name=${CLUSTER_NAME} \
      --from-literal=logs.region=${AWS_REGION} -n amazon-cloudwatch


https://ap-southeast-1.console.aws.amazon.com/cloudwatch/home?region=ap-southeast-1#cw:dashboard=Container

curl https://raw.githubusercontent.com/aws-samples/amazon-cloudwatch-container-insights/prometheus-beta/k8s-deployment-manifest-templates/deployment-mode/service/cwagent-prometheus/prometheus-k8s.yaml | 
sed "s/{{cluster_name}}/${CLUSTER_NAME}/;s/{{region_name}}/${AWS_REGION}/" | kubectl apply -f -

curl https://raw.githubusercontent.com/aws-samples/amazon-cloudwatch-container-insights/master/k8s-yaml-templates/quickstart/cwagent-fluentd-quickstart.yaml | sed "s/{{cluster_name}}/${CLUSTER_NAME}/;s/{{region_name}}/${AWS_REGION}/" | kubectl apply -f -

https://us-east-2.console.aws.amazon.com/cloudwatch/home?region=us-east-2#cw:dashboard=Container;context=~(clusters~'eksworkshop-eksctl~dimensions~(~)~performanceType~'Service

    // IAM role for our EC2 worker nodes
    const workerRole = new iam.Role(this, 'EKSWorkerRole', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com')
    });

    const eksCluster = new eks.Cluster(this, 'Cluster', {
      vpc: vpc,
      kubectlEnabled: true,  // we want to be able to manage k8s resources using CDK
      defaultCapacity: 0  // we want to manage capacity our selves
    });

    const onDemandASG = new autoscaling.AutoScalingGroup(this, 'OnDemandASG', {
      vpc: vpc,
      role: workerRole,
      minCapacity: 1,
      maxCapacity: 10,
      instanceType: new ec2.InstanceType('t3.medium'),
      machineImage: new eks.EksOptimizedImage({
        kubernetesVersion: '1.14',
        nodeType: eks.NodeType.STANDARD  // without this, incorrect SSM parameter for AMI is resolved
      }),
      updateType: autoscaling.UpdateType.ROLLING_UPDATE
    });

    eksCluster.addAutoScalingGroup(onDemandASG, {});