// .babelrc or babel.config.js
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          constants: './constants',
          utils: './utils',
          containers: './containers',
          components: './components',
          assets: './assets',
        },
      },
    ],
  ],
}
