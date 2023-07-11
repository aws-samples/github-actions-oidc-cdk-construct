# Github Actions AWS Auth CDK Stack

This AWS Cloud Developer Kit (CDK) stack provides the necessary credentials to enable OIDC Authentication integration for Github Actions access to an AWS account. It allows the user to integrate Github Actions workflows with an AWS account without having to save AWS Credentials in their Github Secrets.

## What it does

1. Deploys an AWS Identity and Access Management role with OIDC authorization scoped specifically for Github OIDC access.
2. Outputs the ARN of the role to be used in Github environment

## 🎒 Pre-requisites

The [aws-cli](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) must be installed -and- configured with an AWS account on the deployment machine (see <https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html> for instructions on how to do this on your preferred development platform).

This project requires [Node.js](http://nodejs.org/). To make sure you have it available on your machine, try running the following command.

```sh
node -v
```

For best experience we recommend installing CDK globally: `npm install -g aws-cdk`

## 🚀 Setup

### 0/ Use git to clone this repository to your local environment

```sh
git clone #insert-http-or-ssh-for-this-repository
```

### 1/ Set up your AWS environment

Configure your AWS credentials:
`aws configure`

For more on setting up your AWS Credentials please visit [setting up your aws credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)

### 2/ Prepare your CDK environment

1. Navigate to CDK Directory
2. Set up your emissions factor document (see Set up your emissions factor document below)
3. Copy `cdk.context.template.json` or remove .template
4. Enter your parameters in `cdk.context.json` (see Context Parameters below)

#### --Context Parameters--

Before deployment navigate to `cdk.context.json` and update the required context parameters.

- Required:`repoOwner` The owner of the Github repository. This can be found in the url of your Github repository
- Required:`repoName` The name of the repository
- Required:`repoBranch` The branch to allow for deployment (default is `/main`)

### 3/ Bootstrap CDK

At this point you should have already saved your AWS credentials to environmental variables using `aws configure` or a similar command. The bootstrap step sets up several dependencies for CDK that will allow you to create resources using the CDK command line interface. Please also note that you will need a generally permissive IAM role to bootstrap CDK. This can be done using an AWS managed developer role, but we strongly recommend consulting your security practices to ensure that you adhere to least privilege.

```sh
cdk bootstrap # if you are authenticated with aws configure
```

or

```sh
cdk bootstrap aws://ACCOUNT-NUMBER/REGION # if you are bootstrapping a different account
```

### 3/ Install dependencies, build, and synthesize the CDK app

Install dependencies

```sh
npm ci
```

Build your node application and environment

```sh
npm run build
```

Synthesize the CDK application

```sh
cdk synth
```

### 4/ Deploy the application

✅ Recommended: deploy for local development

```sh
cdk deploy --all
```

## 🛠 Usage

Now that your OIDC role is set up and running in your accounts follow the linked directions to integrate with an existing Github Actions Workflow.

[Configuring OpenID Connect in Amazon Web Services](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services)

...or follow the AWS Security Blog post below

[Use IAM roles to connect GitHub Actions to actions in AWS] (https://aws.amazon.com/blogs/security/use-iam-roles-to-connect-github-actions-to-actions-in-aws/)

## 💲 Cost and Licenses

You are responsible for the cost of the AWS services used while running this application. There is no additional cost for the kit.

The AWS CDK stacks for this kit include configuration parameters that you can customize. Some of these settings, such as instance type, affect the cost of deployment. For cost estimates, see the pricing pages for each AWS service you use. Prices are subject to change.

Tip: After you deploy the application, create AWS Cost and Usage Reports to track costs associated with the application. These reports deliver billing metrics to an S3 bucket in your account. They provide cost estimates based on usage throughout each month and aggregate the data at the end of the month. For more information, see What are AWS Cost and Usage Reports?

This sample doesn’t require any software license or AWS Marketplace subscription.

## 🔐 Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template
