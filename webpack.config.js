const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
  entry: {
    index: path.resolve(__dirname, './src/js/index.js'),
    another_page: './src/js/another-page.js'
  },
  mode: 'none',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};