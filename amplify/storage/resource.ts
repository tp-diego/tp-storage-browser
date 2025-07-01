import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'systems-amplify-test'/*,
  isDefault: false,
   access: (allow) => ({
    'systems/*': [
        //allow.authenticated.to(['read', 'write', 'delete'])
        allow.groups(['systems']).to(['read', 'write', 'delete']),
    ]
   })*/
});
