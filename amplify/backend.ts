/*import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { storage } from './storage/resource';


/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
/*defineBackend({
  auth,
  storage
});
*/

import { defineBackend } from "@aws-amplify/backend";
import { Effect, Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { auth } from "./auth/resource";
/*
const backend = defineBackend({
  auth,
});

const customBucketStack = backend.createStack("custom-bucket-stack");

// Import existing bucket
const customBucket = Bucket.fromBucketAttributes(customBucketStack, "MyCustomBucket", {
  bucketArn: "arn:aws:s3:::systems-amplify-test",
  region: "eu-central-1"
});

backend.addOutput({
  storage: {
    aws_region: customBucket.env.region,
    bucket_name: customBucket.bucketName,
    buckets: [
      {
        aws_region: customBucket.env.region,
        bucket_name: customBucket.bucketName,
        name: customBucket.bucketName,
        paths: {
          "systems/*": {
            authenticated: ["get", "list"],
          },
        },
      }
    ]
  },
});
*/

const backend = defineBackend({
  auth,
});

const customBucketStack = backend.createStack("custom-bucket-stack");

const s3-systems-amplify-test = Bucket.fromBucketAttributes(customBucketStack, "systems-amplify-test", {
  bucketArn: "arn:aws:s3:::systems-amplify-test",
  bucketName: "systems-amplify-test",
  region: "eu-central-1",
});
const s3-systems-systems-billing-data = Bucket.fromBucketAttributes(customBucketStack, "systems-billing-data", {
  bucketArn: "arn:aws:s3:::systems-billing-data",
  bucketName: "systems-billing-data",
  region: "eu-central-1",
});

backend.addOutput("systems-amplify-test", s3-systems-amplify-test.bucketName);
backend.addOutput("systems-billing-data", s3-systems-billing-data.bucketName);

const groupName = "systems";

s3-systems-amplify-test.addToResourcePolicy(new iam.PolicyStatement({
  actions: ['s3:GetObject', 's3:PutObject'],
  resources: [s3-systems-amplify-test.arnForObjects('systems/*')],
  principals: [new iam.ArnPrincipal(`arn:aws:iam::${backend.account}:role/${groupName}`)],
}));

s3-systems-billing-data.addToResourcePolicy(new iam.PolicyStatement({
  actions: ['s3:GetObject', 's3:PutObject'],
  resources: [s3-systems-billing-data.arnForObjects('systems/*')],
  principals: [new iam.ArnPrincipal(`arn:aws:iam::${backend.account}:role/${groupName}`)],
}));
