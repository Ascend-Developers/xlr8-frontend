module.exports = {
  extends: ['airbnb', 'prettier'],
  parserOptions: {
    ecmaVersion: 2021, // or the ECMAScript version you are using
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'prettier/prettier': 'error',
  },
  plugins: ['prettier'],
}
