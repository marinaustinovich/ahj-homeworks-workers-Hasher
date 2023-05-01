const standardRestrictedGlobals = require('eslint-restricted-globals'); // eslint-disable-line import/no-extraneous-dependencies

const noRestrictedGlobals = ['error', 'isNaN', 'isFinite'].concat(standardRestrictedGlobals);
const noRestrictedGlobalsWorker = noRestrictedGlobals.filter((o) => o !== 'self');

module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    worker: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      files: ['*.worker.ts'],
      rules: {
        'no-restricted-globals': [
          'error',
          ...noRestrictedGlobalsWorker,
        ],
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-restricted-syntax': [
      'error',
      'LabeledStatement',
      'WithStatement',
    ],
    'no-restricted-globals': [
      'error',
      ...noRestrictedGlobals,
    ],
  },
};
