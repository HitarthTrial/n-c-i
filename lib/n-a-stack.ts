import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class AdTechApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Import the VPC from the infrastructure stack
    const vpc = ec2.Vpc.fromLookup(this, 'ImportedVpc', {
      vpcId: cdk.Fn.importValue('VpcId'),
    });

    // Lambda function for handling API requests
    const apiLambda = new lambda.Function(this, 'ApiLambdaHandler', {
      runtime: lambda.Runtime.PYTHON_3_10,
      code: lambda.Code.fromAsset('lambda/adtechtool'),
      handler: 'api.handler',
      vpc: vpc,
    });

    // API Gateway to expose the Lambda function as a REST API
    const api = new apigateway.LambdaRestApi(this, 'API', {
      handler: apiLambda,
    });
  }
}
