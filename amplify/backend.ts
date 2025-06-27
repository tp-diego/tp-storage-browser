import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
//import { storage, secondaryStorage } from './storage/resource';
import { Effect, Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Bucket } from "aws-cdk-lib/aws-s3";

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth
//  storage, 
//  secondaryStorage
});

const customBucketStack = backend.createStack("custom-bucket-stack");

// Import existing bucket
const customBucket = Bucket.fromBucketAttributes(customBucketStack, "MyCustomBucket", {
  bucketArn: "arn:aws:s3:::systems-amplify-test",
  bucketName: "systems-amplify-test",
  region: "eu-central-1"
});

backend.addOutput({
  storage: {
    //aws_region: customBucket.env.region,
    //bucket_name: customBucket.bucketName,
    buckets: [
      {
        aws_region: customBucket.env.region,
        bucket_name: customBucket.bucketName,
        name: customBucket.bucketName,
        paths: {
          "systems/*": {
            guest: ["get", "list"],
            authenticated: ["get", "list", "write", "delete"],
          },
        },
      }
    ]
  },
});

// ... Unauthenticated/guest user policies and role attachments go here ...
/*
  Define an inline policy to attach to Amplify's auth role
  This policy defines how authenticated users can access your existing bucket
*/ 
const authPolicy = new Policy(backend.stack, "customBucketAuthPolicy", {
  statements: [
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        "s3:GetObject",
        "s3:PutObject", 
        "s3:DeleteObject"
      ],
      resources: [`${customBucket.bucketArn}/systems/*`,],
    }),
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["s3:ListBucket"],
      resources: [
        `${customBucket.bucketArn}`,
        `${customBucket.bucketArn}/*`
        ],
      conditions: {
        StringLike: {
          "s3:prefix": ["systems/*", "systems/"],
        },
      },
    }),
  ],
});

// Add the policies to the authenticated user role
backend.auth.resources.authenticatedUserIamRole.attachInlinePolicy(authPolicy);
