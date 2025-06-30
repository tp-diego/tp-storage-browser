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
//import { storage } from './storage/resource';

const backend = defineBackend({
  auth,
//  storage,
});


const customBucketStack = backend.createStack("custom-bucket-stack");

// Import existing bucket
const customBucket = Bucket.fromBucketAttributes(customBucketStack, "MyCustomBucket", {
  bucketArn: "arn:aws:s3:::systems-amplify-test",
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
        // @ts-expect-error: Amplify backend type issue - https://github.com/aws-amplify/amplify-backend/issues/2569
        paths: {
          "systems/*": {
            groupsclients: ["get", "list", "write", "delete"],
          },
        },
      }
    ]
  },
});

/*
  Define an inline policy to attach to "admin" user group role
  This policy defines how authenticated users with 
  "admin" user group role can access your existing bucket
*/ 
const adminPolicy = new Policy(backend.stack, "customBucketAdminPolicy", {
  statements: [
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        "s3:GetObject",
        "s3:PutObject", 
        "s3:DeleteObject"
      ],
      resources: [ `${customBucket.bucketArn}/systems/*`],
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


// Add the policies to the "admin" user group role
backend.auth.resources.groups["clientes"].role.attachInlinePolicy(adminPolicy);