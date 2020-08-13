
# URL_Shortener CDK Python project

Use the `Python CDK` to quickly assemble your AWS infrastructure and show you how easy to configure your cloud resources, manage permissions, connect event sources and even build and publish your own constructs.


* [x] Create and source a Python virtualenv on MacOS and Linux, and install python dependencies:

```
python3 -m venv .env
source .env/bin/activate
pip install -r requirements.txt
```

* [ ] Install the latest version of the AWS CDK CLI:

```
# npm i -g aws-cdk --force
```

```shell
export AWS_ACCOUNT='701571471198'
export AWS_REGION='ap-southeast-1'
export AWS_VPC_ID='vpc-04f6bf98089c883b4'
export AWS_ZONE_NAME='aws.job4u.io'
export AWS_ZONE_ID='Z18LLN6ULFZKNH'
export AWS_ZONE_CERT='arn:aws:acm:ap-southeast-1:701571471198:certificate/12049ee9-d585-44b4-bd06-00190aa5cca7'
```


```
cdk bootstrap aws://701571471198/ap-southeast-1
cdk deploy '*'
```


> Generate a shortened URL

```
curl https://shortener.aws.job4u.io?targetUrl=https://aws.amazon.com/cdk/

## to access a shortened URL
curl -I https://shortener.aws.job4u.io/XXXXXXXX
```

1. Creating a CDK Application
2. Modeling DynamoDB
3. Creating a Lambda function
4. Lambda permission settings
5. Build API Gateway
6. DNS settings
7. Cleanup

### 1. Creating a CDK Application


> Install AWS CDK

```bash
npm install -g aws-cdk
cdk --version

# brew install tree
tree
```

> Creating a CDK application

```
mkdir url-shortener
cd url-shortener
cdk init --language python
```

> Install packages

```bash
## Manually create a virtualenv on MacOS and Linux:
python3 -m venv .env

## Activate your virtualenv.
source .env/bin/activate
## Windows
# % .env\Scripts\activate.bat

## Install the required dependencies.
pip install -r requirements.txt
```

> Synthesize a template from your app

```
cdk synth
```

> Bootstrapping an environment

```
cdk bootstrap
cdk deploy url-shortener
```

### 2. Modeling DynamoDB

* [x] Table Name: `mapping-table`
* [x] Partition Key: `id` (AttributeType.STRING)

### 3. Creating a Lambda function

> **Lambda permission settings**

### 4. Build API Gateway

### 5. DNS settings

### 6. Cleanup


### 7. Useful commands

 * `cdk ls`          list all stacks in the app
 * `cdk synth`       emits the synthesized CloudFormation template
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk docs`        open CDK documentation

### 8. References

* [x] [CDK Workshop](https://cdkworkshop.com)
* [x] [the Infrastructure is Code with the AWS CDK](https://youtu.be/ZWCvNFUN-sU)
* [x] [url-shortener](https://github.com/aws-samples/aws-cdk-examples/tree/master/python/url-shortener) 

Enjoy!
