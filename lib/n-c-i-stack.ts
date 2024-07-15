import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class NCIStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPC
    const vpc = new ec2.Vpc(this, 'AdTechVpc', {
      maxAzs: 2,
    });

    // Export the VPC ID for use in the API stack
    new cdk.CfnOutput(this, 'VpcId', {
      value: vpc.vpcId,
    });
  }
}
