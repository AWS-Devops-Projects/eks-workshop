#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { SocialReaderStack } from '../lib/social_reader-stack';

const app = new cdk.App();
new SocialReaderStack(app, 'SocialReaderStack');
