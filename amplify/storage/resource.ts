import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'systems-amplify-test',
  isDefault: true,
   access: (allow) => ({
    'systems/*': [
        allow.authenticated.to(['read', 'write', 'delete'])
    ]
   })
});
