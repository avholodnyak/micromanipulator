module.exports = {
  env: {
    node: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-undef': 0,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
      },
    ],
    // Typescript will check imports instead
    'import/extensions': 0,
    'import/no-unresolved': 0,
  },
  overrides: [
    {
      files: ['**/*.d.ts'],
      rules: {
        'no-unused-vars': 0,
      },
    },
  ],
};
