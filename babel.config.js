// .babelrc or babel.config.js
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          'constants/*': ['./src/constants/*'],
          'utils/*': ['./src/utils/*'],
          'containers/*': ['./src/containers/*'],
          'components/*': ['./components/*'],
          'store/*': ['./store/*'],
          'assets/*': ['./assets/*'],
        },
      },
    ],
  ],
}
