const awsExports = {
  Auth: {
    Cognito: {
      userPoolId: "eu-central-1_ArLgyUPsX",
      userPoolClientId: "7tbhlf3jbpsk5hks9bc1gkduvk",
      identityPoolId: "eu-central-1:f500e5d5-187e-427e-b06b-a17a41197bae",
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: "code",
      userAttributes: {
        email: {
          required: true,
        },
      },
      allowGuestAccess: false,
      passwordFormat: {
        minLength: 12,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
      },
    },
  },
  Storage: {
    S3: {
      bucket: "systems-amplify-test",
      region: "eu-central-1",
      // default bucket metadata should be duplicated below with any additional buckets
      buckets: [{
        "systems-amplify-test": {
        bucketName: "systems-amplify-test",
        region: "eu-central-1"
        }
      },
      {
        "systems-amplify-test": {
        bucketName: "systems-amplify-test",
        region: "eu-central-1"
        }
      }
    }]
  }
});

export default awsExports;
