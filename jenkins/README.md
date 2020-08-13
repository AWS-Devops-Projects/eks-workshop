https://ap-southeast-1.console.aws.amazon.com/cloudformation/home?region=ap-southeast-1#/stacks/create/template

https://awsvn.s3-ap-southeast-1.amazonaws.com/Shared/cloudformation/jenkins-ecs-workshop2.json

https://us-east-2.console.aws.amazon.com/cloudformation/home?region=us-east-2#/stacks/quickcreate?templateUrl=https%3A%2F%2Fawsvn.s3-ap-southeast-1.amazonaws.com%2FShared%2Fcloudformation%2Fjenkins-ecs-workshop2.json&stackName=JenkinsStack&param_AllowedIPRange=0.0.0.0%2F0&param_DockerImage=nikunjv%2Fjenkins%3Av4&param_InstanceType=t2.medium&param_KeyName=&param_VPCIPRange=10.0.0.0%2F18

https://ap-southeast-1.console.aws.amazon.com/cloudformation/home?region=ap-southeast-1#/stacks/quickcreate?templateUrl=https%3A%2F%2Fawsvn.s3-ap-southeast-1.amazonaws.com%2FShared%2Fcloudformation%2Fjenkins-ecs-workshop2.json&stackName=JenkinsStack&param_AllowedIPRange=0.0.0.0%2F0&param_DockerImage=nikunjv%2Fjenkins%3Av4&param_InstanceType=t2.medium&param_KeyName=&param_VPCIPRange=10.0.0.0%2F18

aws elb describe-instance-health --load-balancer-name jenkins-elb