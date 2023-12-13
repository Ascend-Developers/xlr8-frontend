module.exports = {
  parser: '@babel/eslint-parser',
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
  extends: ['react-app', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'prettier/prettier': 'error',
    // Other rules...
  },
  plugins: ['prettier'],
}
