+++
title = "Build Stage"
date = 2019-11-01T15:26:09-07:00
weight = 30
pre = "<b>5.3.3. </b>"
+++

The **Build Stage** is where your Serverless application gets built and packaged by SAM. We are going to use AWS CodeBuild as the Build provider for our pipeline. It is worth mentioning that CodePipeline also supports other providers like Jenkins, TeamCity or CloudBees. 

### Why AWS Code Build?

AWS CodeBuild is a great option because you only pay for the time where your build is running, which makes it very cost effective compared to running a dedicated build server 24 hours a day when you really only build during office hours. It is also container-based which means that you can bring your own Docker container image where your build runs, or [use a managed image](https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-available.html) provided by CodeBuild.  

### Add the Build Stage

Let's go ahead and add a Build stage to `sls-api/pipeline/lib/pipeline-stack.ts`:

{{<highlight typescript "hl_lines=46-71">}}
import * as cdk from '@aws-cdk/core';

import s3 = require('@aws-cdk/aws-s3');
import codecommit = require('@aws-cdk/aws-codecommit');
import codepipeline = require('@aws-cdk/aws-codepipeline');
import codepipeline_actions = require('@aws-cdk/aws-codepipeline-actions');
import codebuild = require('@aws-cdk/aws-codebuild');

export class PipelineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    
    /** Step 1: */
    const artifactsBucket = new s3.Bucket(this, "ArtifactsBucket");
    
    // Import existing CodeCommit sls-api repository
    const codeRepo = codecommit.Repository.fromRepositoryName(
      this,
      'AppRepository', // Logical name within CloudFormation
      'sls-api' // Repository name
    );
    
    /** Step 2: */
    // Pipeline creation starts
    const pipeline = new codepipeline.Pipeline(this, 'Pipeline', {
      artifactBucket: artifactsBucket
    });
    
    // Declare source code as an artifact
    const sourceOutput = new codepipeline.Artifact();
    
    // Add source stage to pipeline
    pipeline.addStage({
      stageName: 'Source',
      actions: [
        new codepipeline_actions.CodeCommitSourceAction({
          actionName: 'CodeCommit_Source',
          repository: codeRepo,
          output: sourceOutput,
        }),
      ],
    });
    
    /** Step 3: */
    // Declare build output as artifacts
    const buildOutput = new codepipeline.Artifact();
    
    // Declare a new CodeBuild project
    const buildProject = new codebuild.PipelineProject(this, 'Build', {
      environment: { buildImage: codebuild.LinuxBuildImage.AMAZON_LINUX_2_2 },
      environmentVariables: {
        'PACKAGE_BUCKET': {
          value: artifactsBucket.bucketName
        }
      }
    });
    
    // Add the build stage to our pipeline
    pipeline.addStage({
      stageName: 'Build',
      actions: [
        new codepipeline_actions.CodeBuildAction({
          actionName: 'Build',
          project: buildProject,
          input: sourceOutput,
          outputs: [buildOutput],
        }),
      ],
    });

  }
}
{{</highlight>}}


### Deploy the pipeline

From your terminal, run the following commands to deploy the pipeline:

```
cd ~/environment/sls-api/pipeline
npm run build
cdk deploy
```

### Verify pipeline creation

Navigate to the [AWS CodePipeline Console](https://console.aws.amazon.com/codesuite/codepipeline/home) and click on your newly created pipeline! 

The Build step should have failed. **Don't worry! this is expected** because we haven't specified what commands to run during the build yet, so AWS CodeBuild doesn't know how to build our Serverless application.

![VerifyPipeline](/images/build-pipeline/pipeline-verify-fail.png)

Let's fix that.