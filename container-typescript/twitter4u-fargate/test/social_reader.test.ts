import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import SocialReader = require('../lib/social_reader-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new SocialReader.SocialReaderStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
