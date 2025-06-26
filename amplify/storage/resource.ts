import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'myStorageBucket',
  isDefault: true,
   access: (allow) => ({
    'systems/*': [
        allow.authenticated.to(['read', 'write', 'delete'])
    ]
   })
});
