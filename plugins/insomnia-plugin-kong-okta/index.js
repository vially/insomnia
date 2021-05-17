const yaml = require('yaml');

module.exports.templateTags = [
  {
    displayName: 'okta config',
    name: 'oktaconfig',
    description: 'prompt user for okta information',
    disablePreview: args => args[4] && args[4].value === true,
    args: [
      {
        displayName: 'Config value A',
        type: 'string',
        validate: v => (v ? '' : 'Required'),
      },
      {
        displayName: 'Config value B',
        type: 'string',
      },
      {
        displayName: 'Config value C',
        type: 'string',
      },
    ],
    actions: [
      {
        name: 'Clear',
        icon: 'fa fa-trash',
        run: context => {
          console.log(`[prompt] Clear action`);
          return context.store.clear();
        },
      },
    ],
    async run(context, a, b, c) {
      const configObj = {
        config: {a,b,c}
      };

      return JSON.stringify(configObj);
    },
  },
];
