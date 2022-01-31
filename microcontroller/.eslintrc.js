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
    'import/prefer-default-export': 0,
    // Typescript will check imports instead
    'import/extensions': 0,
    'import/no-unresolved': 0,
  },
};