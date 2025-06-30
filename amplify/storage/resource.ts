import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'systems-amplify-test',
  isDefault: true,
   access: (allow) => ({
    '*/*': [
        //allow.authenticated.to(['read', 'write', 'delete'])
        allow.groups(['systems']).to(['read', 'write', 'delete']),
    ]
   })
});
