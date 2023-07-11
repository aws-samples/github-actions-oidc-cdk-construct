#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { GithubActionsAwsAuthCdkStack } from "../lib/github-actions-aws-auth-cdk-stack";

const app = new cdk.App();

const appEnv = {
  region: app.node.tryGetContext("awsRegion")
    ? app.node.tryGetContext("awsRegion")
    : process.env.CDK_DEFAULT_REGION,
  account: process.env.CDK_DEFAULT_ACCOUNT,
};

new GithubActionsAwsAuthCdkStack(app, "GithubActionsAwsAuthCdkStack", {
  env: appEnv,
  repositoryConfig: [
    {
      owner: app.node.tryGetContext("repoOwner"),
      repo: app.node.tryGetContext("repoName"),
      filter: app.node.tryGetContext("repoBranch"),
    },
  ],
});
