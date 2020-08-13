#!/bin/bash

set -x

#Setup Env Vars
export REGION=$1
export NODE_ROLE_NAME=$2
export CLUSTER_NAME=$3

export ALB_POLICY_NAME=alb-ingress-controller
policyExists=$(aws iam list-policies | jq '.Policies[].PolicyName' | grep alb-ingress-controller | tr -d '["\r\n]')
if [[ "$policyExists" != "alb-ingress-controller" ]]; then
    echo "Policy does not exist, creating..."
    export ALB_POLICY_ARN=$(aws iam create-policy --region=$REGION --policy-name $ALB_POLICY_NAME --policy-document "https://raw.githubusercontent.com/kubernetes-sigs/aws-alb-ingress-controller/master/docs/examples/iam-policy.json" --query "Policy.Arn" | sed 's/"//g')
    aws iam attach-role-policy --region=$REGION --role-name=$NODE_ROLE_NAME --policy-arn=$ALB_POLICY_ARN
fi

#Create Ingress Controller
if [ ! -f alb-ingress-controller.yaml ]; then
    wget https://raw.githubusercontent.com/kubernetes-sigs/aws-alb-ingress-controller/v1.1.6/docs/examples/alb-ingress-controller.yaml
fi
sed -i "s/devCluster/$CLUSTER_NAME/g" alb-ingress-controller.yaml
sed -i "s/# - --cluster-name/- --cluster-name/g" alb-ingress-controller.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/aws-alb-ingress-controller/v1.1.6/docs/examples/rbac-role.yaml
kubectl apply -f alb-ingress-controller.yaml

#Check
kubectl get pods -n kube-system
#kubectl logs -n kube-system $(kubectl get po -n kube-system | egrep -o "alb-ingress[a-zA-Z0-9-]+")

#Attach IAM policy to Worker Node Role
if [ ! -f iam-policy.json ]; then
    curl -O https://raw.githubusercontent.com/kubernetes-sigs/aws-alb-ingress-controller/master/docs/examples/iam-policy.json
fi
aws iam put-role-policy --role-name $NODE_ROLE_NAME --policy-name elb-policy --policy-document file://iam-policy.json

#Instantiate Blue and Green PODS
kubectl apply -f flask-ALB-namespace.yaml
kubectl apply -f flaskALBBlue.yaml
kubectl apply -f flaskALBGreen.yaml

#Check
kubectl get deploy -n flask-alb
kubectl get svc -n flask-alb
kubectl get pods -n flask-alb

#Update Ingress Resource file and spawn ALB
sg=$(aws ec2 describe-security-groups --filters Name=tag:aws:cloudformation:stack-name,Values=CdkStackALBEksBg | jq '.SecurityGroups[0].GroupId' | tr -d '["]')
vpcid=$(aws ec2 describe-security-groups --filters Name=tag:aws:cloudformation:stack-name,Values=CdkStackALBEksBg | jq '.SecurityGroups[0].VpcId' | tr -d '["]')
subnets=$(aws ec2 describe-subnets --filters "Name=vpc-id,Values=$vpcid" "Name=tag:aws-cdk:subnet-name,Values=Public" | jq '.Subnets[0].SubnetId' | tr -d '["]')
subnets="$subnets, $(aws ec2 describe-subnets --filters "Name=vpc-id,Values=$vpcid" "Name=tag:aws-cdk:subnet-name,Values=Public" | jq '.Subnets[1].SubnetId' | tr -d '["]')"
subnets="$subnets, $(aws ec2 describe-subnets --filters "Name=vpc-id,Values=$vpcid" "Name=tag:aws-cdk:subnet-name,Values=Public" | jq '.Subnets[2].SubnetId' | tr -d '["]')"

sed -i "s/public-subnets/$subnets/g" flaskALBIngress_query.yaml
sed -i "s/public-subnets/$subnets/g" flaskALBIngress_query2.yaml
sed -i "s/sec-grp/$sg/g" flaskALBIngress_query.yaml
sed -i "s/sec-grp/$sg/g" flaskALBIngress_query2.yaml
kubectl apply -f flaskALBIngress_query.yaml
